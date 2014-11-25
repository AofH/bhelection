var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* schema
*/

var ElectionSchema = new Schema({
	date: Date,
	type: String,
	parliment: Number,
	province: String,
	riding: String,
	lastname: String,
	firstname: String,
	gender: String,
	occupation: String,
	party: String,
	votes: Number,
	percentage: Number,
	elected: Number,
	createdOn:{type: Date, default: Date.now}
});

ElectionSchema.methods = {
	saveElection: function(callback){
		this.save(callback);
	},
};

ElectionSchema.statics = {

	/**
	 * List Elections
	 */
	list: function (options, callback){
		var criteria = options.criteria || {}

		this.find(criteria)
			.exec(callback);
	},

	groupBy:function(options, callback){
		var groupFunctions = options.groupFunctions || [];
		this.aggregate(groupFunctions,callback);
	}



}

mongoose.model('Election', ElectionSchema);