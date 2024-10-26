
const Faq = require('../models/faq')
const Util = require('./util')

exports.addFaq = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {

		const data = req.body;

		if (!data) {
			const error = new Error('No Content');
			error.httpStatusCode = 400
			return next(error)
		}

		const param = {title: data.title, content: data.content};

		const newFaq = await Faq.create(param)

		console.log(newFaq)

		res.status(200).send(newFaq)

	} catch (e) {
		console.error(e);
		next(Util.handleError(res, e));
	}
}

exports.getFaqs = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");
	try {
		const {limit} = req.query;
		const total = await Faq.find();
		if(limit) {
			const data = await Faq.find().limit(limit);
			res.status(200).send({data:data, total:total.length})
		} else {
			res.status(200).send({data:total, total: total.length})
		}
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}

exports.getFaq = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {
		const {_id} = req.params

	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}

// TODO: updateFaq
exports.updateFaq = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {
		const data = req.body;

		const back = await Faq.findOne({_id:data._id})

		if (!back) {
			const error = new Error('No Data');
			error.httpStatusCode = 400
			return next(error)
		}

		const param = {title: data.title, content: data.content};

		let result = await Faq.findOneAndUpdate({ _id:data._id }, param, { new: true });

		res.status(200).send(result)
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}


exports.deleteFaq = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {
		const {_id} = req.params
		const back = await Faq.findOne({_id})

		if (!back) {
			const error = new Error('No Data');
			error.httpStatusCode = 400
			return next(error)
		}

		const result = await Faq.findOneAndRemove({_id}); 

		res.status(200).send({message:'Deleted successfully'})
		
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}