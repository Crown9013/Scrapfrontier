var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var faqSchema = new Schema({
	title: { type: String, required: true, unique: true },
	content: { type: String, required: true },
}, {
	//Built-in timestamping with custom naming
	timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

//Create model using above schema
var Faq = mongoose.model('Faq', faqSchema);
module.exports = Faq;