const express = require('express'),
	router = express.Router(),
	multer = require('multer');

const Faq = require('../controller/faq')
const Rules = require('../controller/rules')
const Support = require('../controller/support');
const Featured = require('../controller/featured');
const Howtostart = require('../controller/howtostart')
const TournamentAndEvents = require('../controller/tournamentandevents');
const AdminController = require('../controller/admins.controller')


const storage = multer.diskStorage({
	destination: (req, file, callBack) => {
			callBack(null, 'uploads')
	},
	filename: (req, file, callBack) => {
			callBack(null, `${file.originalname}`)
	}
})

let upload = multer({ dest: 'uploads/' })

// admin
router.route('/feature')
	.post(upload.single('file'), Featured.addFeature)
	.put(upload.single('file'), Featured.updateFeature)
	.get(Featured.getFeatures)
router.route('/feature/:_id')
	.delete(Featured.deleteFeature)

router.route('/tournament_and_events')
	.post(upload.single('file'), TournamentAndEvents.addTournamentAndEvents)
	.put(upload.single('file'), TournamentAndEvents.updateTournamentAndEvent)
	.get(TournamentAndEvents.getTournamentAndEvents)
router.route('/tournament_and_events/:_id')
	.delete(TournamentAndEvents.deleteTournamentAndEvent)

router.route('/faq')
	.post(Faq.addFaq)
	.put(Faq.updateFaq)
	.get(Faq.getFaqs)
router.route('/faq/:_id')
	.delete(Faq.deleteFaq)

router.route('/rules')
	.post(Rules.addRule)
	.put(Rules.updateRule)
	.get(Rules.getRules)
router.route('/rules/:_id')
	.delete(Rules.deleteRule)

router.route('/howtostart')
	.post(Howtostart.addHowtostart)
	.put(Howtostart.updateHowtostart)
	.get(Howtostart.getHowtostarts)
router.route('/howtostart/:_id')
	.delete(Howtostart.deleteHowtostart)

router.route('/support')
	.post(Support.addSupport)
	.put(Support.updateSupport)
	.get(Support.getSupports)
router.route('/support/:_id')
	.delete(Support.deleteSupport)

router.post('/register', AdminController.register)

router.post('/login', AdminController.login)

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()) return next();
	res.redirect('/');
}

module.exports = router;