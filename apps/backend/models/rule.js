var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ruleSchema = new Schema({
	title: { type: String, required: true, unique: true },
	content: { type: String, required: true },
}, {
	//Built-in timestamping with custom naming
	timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

//Create model using above schema
var Rule = mongoose.model('Rule', ruleSchema);
module.exports = Rule;