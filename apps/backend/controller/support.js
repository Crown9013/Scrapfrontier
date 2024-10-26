
const Support = require('../models/support')
const Util = require('./util')

exports.addSupport = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {

		const data = req.body;

		if (!data) {
			const error = new Error('No Content');
			error.httpStatusCode = 400
			return next(error)
		}

		const param = {title: data.title, content: data.content};

		const newSupport = await Support.create(param)

		console.log(newSupport)

		res.status(200).send(newSupport)

	} catch (e) {
		console.error(e);
		next(Util.handleError(res, e));
	}
}

exports.getSupports = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");
	try {
		const {limit} = req.query;
		const total = await Support.find();
		if(limit) {
			const data = await Support.find().limit(limit);
			res.status(200).send({data:data, total:total.length})
		} else {
			res.status(200).send({data:total, total: total.length})
		}
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}

exports.getSupport = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {
		const {_id} = req.params

	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}

// TODO: updateSupport
exports.updateSupport = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {
		const data = req.body;

		const back = await Support.findOne({_id:data._id})

		if (!back) {
			const error = new Error('No Data');
			error.httpStatusCode = 400
			return next(error)
		}

		const param = {title: data.title, content: data.content};

		let result = await Support.findOneAndUpdate({ _id:data._id }, param, { new: true });

		res.status(200).send(result)
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}


exports.deleteSupport = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {
		const {_id} = req.params
		const back = await Support.findOne({_id})

		if (!back) {
			const error = new Error('No Data');
			error.httpStatusCode = 400
			return next(error)
		}

		const result = await Support.findOneAndRemove({_id}); 

		res.status(200).send({message:'Deleted successfully'})
		
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}