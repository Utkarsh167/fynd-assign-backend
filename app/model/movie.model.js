const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

var movie = new Schema(
    {
        // 1. movieAdded, 2. movieUpdated, 3. movieRemoved
        "99popularity": {
            type: Number,
            required: true,
        },
        director: {
            type: String,
            required: true,
        },
        genre: [
            {
                type: String,
                required: true
            }
        ],
        imdb_score: {
            type: Number,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    },
)

/// Export the models
module.exports = mongoose.model('Movie', movie);