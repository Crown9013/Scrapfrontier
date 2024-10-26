const Rules = require('../models/rule')
const Util = require('./util')

exports.addRule = async (req, res, next) => {
    res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

    try {

        const data = req.body;

        if (!data) {
            const error = new Error('No Content');
            error.httpStatusCode = 400
            return next(error)
        }

        const param = { title: data.title, content: data.content };

        const newRule = await Rules.create(param)

        console.log(newRule)

        res.status(200).send(newRule)

    } catch (e) {
        console.error(e);
        next(Util.handleError(res, e));
    }
}

exports.getRules = async (req, res, next) => {
    res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");
    try {
        const { limit } = req.query;
        const total = await Rules.find();
        if (limit) {
            const data = await Rules.find().limit(limit);
            res.status(200).send({ data: data, total: total.length })
        } else {
            res.status(200).send({ data: total, total: total.length })
        }
    } catch (e) {
        console.error(e)
        next(Util.handleError(res, e));
    }
}

exports.getRule = async (req, res, next) => {
    res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

    try {
        const { _id } = req.params

    } catch (e) {
        console.error(e)
        next(Util.handleError(res, e));
    }
}

// TODO: updateRule
exports.updateRule = async (req, res, next) => {
    res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

    try {
        const data = req.body;

        const back = await Rules.findOne({ _id: data._id })

        if (!back) {
            const error = new Error('No Data');
            error.httpStatusCode = 400
            return next(error)
        }

        const param = { title: data.title, content: data.content };

        let result = await Rules.findOneAndUpdate({ _id: data._id }, param, { new: true });

        res.status(200).send(result)
    } catch (e) {
        console.error(e)
        next(Util.handleError(res, e));
    }
}


exports.deleteRule = async (req, res, next) => {
    res.set("Content-Security-Policy", "default-src 'self', form-action 'self',script-src 'self'");

    try {
        const { _id } = req.params
        const back = await Rules.findOne({ _id })

        if (!back) {
            const error = new Error('No Data');
            error.httpStatusCode = 400
            return next(error)
        }

        const result = await Rules.findOneAndRemove({ _id });

        res.status(200).send({ message: 'Deleted successfully' })

    } catch (e) {
        console.error(e)
        next(Util.handleError(res, e));
    }
}