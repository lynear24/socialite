const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
	{
		username: {
			type: String,
		},
		password: {
			type: String,
		},
		isLoggedIn: {
			type: Boolean,
		},
	},
	{
		collection: "users",
	}
);

module.exports = mongoose.model("User", User);
