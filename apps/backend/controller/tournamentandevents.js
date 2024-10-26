
const TournamentAndEvents = require('../models/tournamentandevents')
const Util = require('./util')

exports.addTournamentAndEvents = async (req, res, next) => {
	try {
		const image = req.file;

		// if (!image) {
		// 	const error = new Error('No File');
		// 	error.httpStatusCode = 400
		// 	return next(error)
		// }

		const data = req.body;

		if (!data) {
			const error = new Error('No Content');
			error.httpStatusCode = 400
			return next(error)
		}

		let param = {name: data.name, date: data.date, time: data.time, capacity: data.capacity, description: data.description};
		if (image) param.image = image.filename
			
		const newData = await TournamentAndEvents.create(param)

		res.status(200).send(newData)

	} catch (err) {
		console.error(err);
		if (err.code === 11000) {
	        res.status(409).send(err)
	    } else {
	        res.status(500).send(err);
	    }
	}
}

exports.getTournamentAndEvents = async (req, res, next) => {
	const {limit} = req.query;

	try {
		const total = await TournamentAndEvents.find();
		if(limit) {
			const data = await TournamentAndEvents.find().limit(limit);
			res.status(200).send({data:data, total:total.length})
		} else {
			res.status(200).send({data:total, total: total.length})
		}
	} catch (e) {
		console.error(e)
		if (e.code === 11000) {
	        res.status(409).send(e)
	    } else {
	        res.status(500).send(e);
	    }
	}
}


exports.getTournamentAndEvent = async (req, res, next) => {
	try {
		const {_id} = req.params

	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}

exports.updateTournamentAndEvent = async (req, res, next) => {
	try {
		const image = req.file;

		const data = req.body;

		if (!data) {
			const error = new Error('No Content');
			error.httpStatusCode = 400
			return next(error)
		}

		const back = await TournamentAndEvents.findOne({_id:data._id})

		if (!back) {
			const error = new Error('No Data');
			error.httpStatusCode = 400
			return next(error)
		}

		if (image) {
			// Removing old image
			await Util.removeFile(back.image)
		}

		let param = {name: data.name, date: data.date, time: data.time, capacity: data.capacity, description: data.description};
		if (image) param.image = image.filename

		let result = await TournamentAndEvents.findOneAndUpdate({ _id:data._id }, param, { new: true });

		res.status(200).send(result)
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}


exports.deleteTournamentAndEvent = async (req, res, next) => {

	try {
		const {_id} = req.params
		const back = await TournamentAndEvents.findOne({_id})

		if (!back) {
			const error = new Error('No Data');
			error.httpStatusCode = 400
			return next(error)
		}

		if (await Util.removeFile(back.image) ) {
			const result = await TournamentAndEvents.findOneAndRemove({_id}); 

			res.status(200).send({message:'Deleted successfully'})
		}
		else {
			res.status(404).send({message: 'Failed deleting'})
		}

		
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}