const express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session'),
	SteamStrategy = require('passport-steam').Strategy,
	authRoutes = require('./routes/auth'),
	appRoutes = require('./routes/app'),
	apiRoutes = require('./routes/api'),
	adminRoutes = require('./routes/admin'),
	User = require('./models/user'),
	Util = require('./controller/util')

const {json, urlencoded} = require('body-parser');
const fs = require('fs')

require('dotenv').config()
var cors = require('cors')

const { addDefaultUser } = require('./db/initialize');

const db = require("./db");
const adminAuthMiddleware = require('./middlewares/auth.middleware');

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once('open', async () => {
	console.log('Connected to MongoDB');

	// try {
	// 	// Add default user data
	// 	await addDefaultUser();
	// } catch (error) {
	// 	console.error('Error initializing database:', error);
	// }
});


//Determine data to be stored in session
passport.serializeUser(function (user, done) {
	//save JSON data to session
	done(null, user._json);
});

//Match session data with DB data and parse
passport.deserializeUser(function (obj, done) {
	//Search DB for user with session's steam ID
	console.log("------ steam obj ------", obj)
	User.findOne({ steam_id: obj.steamid },
		(err, user) => {
			//Fetched object is attached to request object (req.user)
			done(err, user);
		});
});

//Specify Passport authentication strategy (Steam)
passport.use(new SteamStrategy({
	returnURL: `${process.env.BACKEND_BASE_URL}/auth/steam/return`,
	realm: process.env.BACKEND_BASE_URL,
	apiKey: process.env.STEAM_API_KEY
}, function (identifier, profile, done) {
	//Check if user exists in DB
	console.log("----- identifier --------", identifier)
	console.log("----- profile --------", profile)
	User.findOne({ steam_id: profile.id }, async function (err, user) {
		if (!user) {
			//User does not exist, define new user
			var newUser = User({
				steam_id: profile.id,
				steam_name: profile.displayName,
				steam_avatar: profile.photos[2].value
			});
			//Save new user to DB
			newUser.save(function (err) {
				if (err) {
					console.log('Error : ', err)
					throw err;
				}
				console.log('New user ' + profile.displayName + '[' + profile.id + '] created');
			});
		} else {
			// Update user with
			var updateUser = {
				steam_name: profile.displayName,
				steam_avatar: profile.photos[2].value
			};
			await User.findOneAndUpdate({steam_id: profile.id}, updateUser)
		}
	});
	profile.identifier = identifier;
	return done(null, profile);
}));

var app = express();
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.use(json());
app.use(urlencoded({extended: true}));

var corsOptions = function(req, res, next){ 
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
}

// app.use(corsOptions)

//Initialise session
app.use(session({
	secret: 's3cr3tStr1nG',
	saveUninitialized: false,
	resave: true
}));

//Authentication middleware
app.use(passport.initialize());
app.use(passport.session());

//Point to static asset directory
app.use(express.static('public'));

app.use('/uploads', express.static('uploads'))
app.get('/images/:imageName', (req, res) => {
	try {
		const imageName = req.params.imageName
		if (Util.checkExistFile(`uploads/${imageName}`)) {
			const readStream = fs.createReadStream(`uploads/${imageName}`)
			readStream.pipe(res)
		} else {
			const readStream = fs.createReadStream(`uploads/default`)
			readStream.pipe(res)
		}
	} catch (e) {
		const readStream = fs.createReadStream(`uploads/default`)
		readStream.pipe(res)
	}
	
})

//Define routes
app.use('/', appRoutes);
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api/admin', adminAuthMiddleware,adminRoutes);

//Start server
app.listen(process.env.PORT, function () {
	console.log('Listening on port ' + process.env.PORT);
});