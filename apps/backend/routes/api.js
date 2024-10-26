const express = require('express'),
	router = express.Router(),
	SteamCommunity = require('steamcommunity'),
	User = require('../models/user'),
	community = new SteamCommunity(),
	multer = require('multer');

const Faq = require('../controller/faq')
const Rules = require('../controller/rules')
const Support = require('../controller/support');
const Featured = require('../controller/featured');
const Howtostart = require('../controller/howtostart')
const TournamentAndEvents = require('../controller/tournamentandevents');
const UserController = require('../controller/users.controller');

router.route('/inventory/').get(ensureAuthenticated, function(req, res){
	//GET route (get inventory of logged in user)
	console.log("[API] Getting Inventory " + req.user.steam_id);
	community.getUserInventoryContents(req.user.steam_id, 440, 2, true, (err, inv) => {
		if(err) throw err;
		console.log("getUserInventoryContents:", inv)
		res.status(200).json(inv);
	});
});

router.route('/inventory/:steam_id').get(ensureAuthenticated, function(req, res){
	//GET route (get inventory with user ID)
	console.log("[API] Getting Inventory " + req.params.steam_id);
	community.getUserInventoryContents(req.params.steam_id, 440, 2, true, (err, inv) => {
		if(err) throw err;
		console.log("getUserInventoryContents:", inv)
		res.status(200).json(inv);
	});
});

router.route('/user/').get(ensureAuthenticated, function(req, res){
	console.log("[API] Getting User " + req.user.steam_id);
	//GET route (get logged in user)
	User.findOne({steam_id: req.user.steam_id}, function(err, user) {
		if(err) throw err;
		if(user) {
			//User exists, get data
			res.json(user);
		}
		else {
			//User does not exist, 404 not found
			res.status(404).send('Invalid user');
		}
	});
});


router.route('/players')
	.get(UserController.getUsers)
	.put(UserController.updateUsers)

router.route('/user/:steam_id').get(ensureAuthenticated, function(req, res){
	console.log("[API] Getting User " + req.params.steam_id);
	//GET route (get user with ID)
	User.findOne({steam_id: req.params.steam_id}, function(err, user) {
		if(err) throw err;
		if(user) {
			//User exists, get data
			res.json(user);
		}
		else {
			//User does not exist, 404 not found
			res.status(404).send('Invalid user');
		}
	});
});

router.route('/auth/loginstatus').get(function(req, res) {
	console.log('[API] Checking a user\'s auth status');
	if(req.isAuthenticated()) return res.json(req.user);
	return res.send(false);
});

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()) return next();
	res.redirect('/');
}

router.route('/feature').get(Featured.getFeatures)

router.route('/tournament_and_events').get(TournamentAndEvents.getTournamentAndEvents)

router.route('/faq').get(Faq.getFaqs)

router.route('/rules').get(Rules.getRules)

router.route('/howtostart').get(Howtostart.getHowtostarts)

router.route('/support').get(Support.getSupports)

module.exports = router;