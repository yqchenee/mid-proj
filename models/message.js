const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required.']
	},
	date : Date,
	money : Number,
	body : String
	 // [ {date , money , body , } ]
		
	/*money: {
		type:　Number,
		required: [true , 'money field is required.']
	},
	body: {
		type: String,
		required: [true, 'Body field is required.']
	}*/
})

// Creating a table within database with the defined schema
const Message = mongoose.model('message', MessageSchema)

// Exporting table for querying and mutating
module.exports = Message
