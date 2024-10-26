
const Featured = require('../models/featured')
const Util = require('./util')

exports.addFeature = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {
		const image = req.file;

		if (!image) {
			const error = new Error('No File');
			error.httpStatusCode = 400
			return next(error)
		}

		const data = req.body;

		if (!data) {
			const error = new Error('No Content');
			error.httpStatusCode = 400
			return next(error)
		}

		const param = {title: data.title, content: data.content, image: image.filename};

		const newFeatured = await Featured.create(param)

		// console.log(newFeatured)

		res.status(200).send(newFeatured)

	} catch (e) {
		console.error(e);
		next(Util.handleError(res, e));
	}
}

exports.getFeatures = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");
	try {
		const {limit} = req.query;
		const total = await Featured.find();
		if(limit) {
			const data = await Featured.find().limit(limit);
			res.status(200).send({data:data, total:total.length})
		} else {
			res.status(200).send({data:total, total: total.length})
		}
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}

exports.getFeature = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {
		const {_id} = req.params

	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}

// TODO: updateFeature
exports.updateFeature = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {
		const image = req.file;

		const data = req.body;

		if (!data) {
			const error = new Error('No Content');
			error.httpStatusCode = 400
			return next(error)
		}

		const back = await Featured.findOne({_id:data._id})

		if (!back) {
			const error = new Error('No Data');
			error.httpStatusCode = 400
			return next(error)
		}

		if (image) {
			// Removing old image
			await Util.removeFile(back.image)
		}

		const param = image ? {title: data.title, content: data.content, image: image.filename} : {title: data.title, content: data.content};

		let result = await Featured.findOneAndUpdate({ _id:data._id }, param, { new: true });

		res.status(200).send(result)
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e));
	}
}


exports.deleteFeature = async (req, res, next) => {
	res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

	try {
		const {_id} = req.params
		const back = await Featured.findOne({_id})

		if (!back) {
			const error = new Error('No Data');
			error.httpStatusCode = 400
			return next(error)
		}

		if (await Util.removeFile(back.image) ) {
			const result = await Featured.findOneAndRemove({_id}); 

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