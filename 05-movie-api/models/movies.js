const mongoose = require('mongoose');




const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        lowercase: true,
        uppercase: true,
        enum: {
            values: ["action",
            "adventure",
            "animation",
            "comedy",
            "crime",
            "drama",
            "family",
            "fantasy",
            "horror",
            "musical",
            "mystery",
            "romance",
            "science fiction",
            "thriller",
            "war",
            "western",
            "biography",
            "documentary",
            "fantasy",
            "history",
            "sport",],
            message: '{VALUE} is not supported',
        }
    },
    release_date: {
        type: Date,
        default: Date.now()
    },
    director: {
        type: String,
        required: true
    },
    actor: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 4.0
    },
    duration: {
        type: Number,
        defualt: 1.30
    },
    language: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    box_office: {
        type: String,
        default: 'Dollar'
    }
});


module.exports = mongoose.model('Movies', moviesSchema);