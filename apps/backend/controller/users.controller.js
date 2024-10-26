
const User = require('../models/user')
const Util = require('./util')

exports.getUsers = async (req, res, next) => {
	try {

		const users = await User.find({})

		// console.log(users)

		res.status(200).send({totals: users.length, data: users})

	} catch (e) {
		console.error(e);
		next(Util.handleError(res, e));
	}
}

exports.updateUsers = async (req, res, next) => {
	try {
		const {steam_id} = req.body
		const data = req.body
		if (!steam_id) {
			const error = new Error('Invalid parameter');
			error.httpStatusCode = 400
			return next(error)
		}
		delete data.steam_id
		const updatedUser = await User.findOneAndUpdate({steam_id}, data)
		res.status(200).send(updatedUser)
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e))
	}
}