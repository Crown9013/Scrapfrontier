var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tournamentAndEventsSchema = new Schema({
	name: { type: String, required: true },
	date: { type: String, required: true },
	time: { type: String, required: true},
	capacity: {type: Number, defaults: 0},
	participants: {type: Number, defaults: 0},
	description: String,
	image: String,
}, {
	//Built-in timestamping with custom naming
	timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

//Create model using above schema
var TournamentAndEvents = mongoose.model('TournamentAndEvents', tournamentAndEventsSchema);
module.exports = TournamentAndEvents;