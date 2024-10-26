
const Admin = require('../models/admin')
const Util = require('./util')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req, res, next) => {
	try {
		const {name, email, password} = req.body
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)
		const newAdmin = await Admin.create({name, email, password: hashedPassword})
		console.log(newAdmin)
		res.status(200).send({data: newAdmin})
	} catch (e) {
		console.error(e);
		next(Util.handleError(res, e));
	}
}

exports.login = async (req, res, next) => {
	const SECRET_KEY = process.env.SECRET_KEY
	try {
		const {email, password} = req.body;
		const admin = await Admin.findOne({email: email})
		console.log(admin)
		if (admin) {
			const match = await bcrypt.compare(password, admin.password)
			console.log(match)
			if (match) {
				const token = await jwt.sign({username: admin.username, email: admin.email}, SECRET_KEY, {expiresIn: '1h'})
				if (token) {
					return res.status(200).send({status: 'success', data: {accessToken: token, username: admin.username}})
				} else {
					return res.status(401).send({status: 'failed', msg: 'Unauthorized'})
				}
			}
			else {
				return res.status(400).send({status: 'failed', msg: 'Password is incorrect'})
			}
		}
		else {
			return res.status(400).send({status: 'failed', msg: 'Unregistred admin'})
		}
	} catch (e) {
		console.error(e)
		next(Util.handleError(res, e))
	}
}
