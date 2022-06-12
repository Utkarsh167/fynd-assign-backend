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
movie.index({director: 1,'99popularity': -1,name: -1}, {unique: true});
movie.index({name: "text",director: "text"});

module.exports = mongoose.model('Movie', movie);
mongoose.model('Movie', movie).createIndexes();
