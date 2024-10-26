var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	steam_id: { type: String, required: true, unique: true },
	steam_name: { type: String, required: true },
	steam_avatar: String,
	wallet_address: { type: String, default: '0x0' },
	nft_tier: { type: Number, default: -1},
	points: String,
	rank: String,
	buylist: [String]
}, {
	//Built-in timestamping with custom naming
	timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

//Create model using above schema
var User = mongoose.model('User', userSchema);
module.exports = User;