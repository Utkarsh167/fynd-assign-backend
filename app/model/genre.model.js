const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var genre = new Schema(
    {
        // 1. movieAdded, 2. movieUpdated, 3. movieRemoved
       
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['present', 'custom'],
            required: true
        },
        addedBy:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User' 
        }
    },
    {
        timestamps: true
    },
)

/// Export the models
module.exports = mongoose.model('Genre', genre);