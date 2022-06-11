const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var activityLog = new Schema(
    {
        // 1. movieAdded, 2. movieUpdated, 3. movieRemoved
        activity: {
            type: String,
            required: true,
        },
        activityType: {
            type: String,
            required: true,
        },
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Movie'
        },
        from:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    {
        timestamps: true
    },
)

/// Export the models
module.exports = mongoose.model('ActivityLog', activityLog);