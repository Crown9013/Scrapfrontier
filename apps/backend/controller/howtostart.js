
const Howtostart = require('../models/howtostart')
const Util = require('./util')

exports.addHowtostart = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {

		const data = req.body;

		if (!data) {
			const error = new Error('No Content');
			error.httpStatusCode = 400
			return next(error)
		}

		const param = {title: data.title, content: data.content};

		const newHowtostart = await Howtostart.create(param)

		console.log(newHowtostart)

		res.status(200).send(newHowtostart)

	} catch (e) {
		console.error(e);
		next(Util.handleError(res, e));
	}
}

exports.getHowtostarts = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");
	try {
		const {limit} = req.query;
		const total = await Howtostart.find();
		if(limit) {
			const data = await Howtostart.find().limit(limit);
			res.status(200).send({data:data, total:total.length})
		} else {
			res.status(200).send({data:total, total: total.length})
		}
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}

exports.getHowtostart = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {
		const {_id} = req.params

	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}

// TODO: updateHowtostart
exports.updateHowtostart = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {
		const data = req.body;

		const back = await Howtostart.findOne({_id:data._id})

		if (!back) {
			const error = new Error('No Data');
			error.httpStatusCode = 400
			return next(error)
		}

		const param = {title: data.title, content: data.content};

		let result = await Howtostart.findOneAndUpdate({ _id:data._id }, param, { new: true });

		res.status(200).send(result)
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}


exports.deleteHowtostart = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {
		const {_id} = req.params
		const back = await Howtostart.findOne({_id})

		if (!back) {
			const error = new Error('No Data');
			error.httpStatusCode = 400
			return next(error)
		}

		const result = await Howtostart.findOneAndRemove({_id}); 

		res.status(200).send({message:'Deleted successfully'})
		
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}