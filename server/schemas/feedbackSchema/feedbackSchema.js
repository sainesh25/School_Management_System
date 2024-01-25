const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        message: 'Email is required for feedback',
    },
    feedbackMessage: {
        type: String,
        required: true,
        message: 'Feedback should not be empty',
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);

