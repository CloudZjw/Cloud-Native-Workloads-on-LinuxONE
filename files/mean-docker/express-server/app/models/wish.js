var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('Wish', {
    wish_id: {
        type: Number,
        default: ''
    },

    description: {
        type: String,
        default: ''
    },

    publish_date: {
    	type: Date,
    	default: Date.now()
    },

    ddl: {
    	type: Date,
    	default: ''
    },

    bonus: {
    	type: Number,
    	default: ''
    }


});
