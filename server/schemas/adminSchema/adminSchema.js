const { default: mongoose } = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        message: 'Name is required',
    },
    email: {
        type: String,
        required: true,
        message: 'Email is required',
    },
    password: {
        type: String,
        required: true,
        message: 'Password is required',
    }
});

module.exports = mongoose.model('Admin', adminSchema);

