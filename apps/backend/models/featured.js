var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var featuredSchema = new Schema({
	title: { type: String, required: true, unique: true },
	content: { type: String, required: true },
	image: String,
}, {
	//Built-in timestamping with custom naming
	timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

//Create model using above schema
var Featured = mongoose.model('Featured', featuredSchema);
module.exports = Featured;