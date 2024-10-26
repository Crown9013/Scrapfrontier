var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var supportSchema = new Schema({
	title: { type: String, required: true, unique: true },
	content: { type: String, required: true },
}, {
	//Built-in timestamping with custom naming
	timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

//Create model using above schema
var Support = mongoose.model('Support', supportSchema);
module.exports = Support;