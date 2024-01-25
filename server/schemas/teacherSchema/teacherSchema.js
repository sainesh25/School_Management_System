const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        message: 'Name is required',
        required: true,
    },
    email: {
        type: String,
        message: 'Email is required',
        required: true,
    },
    contact: {
        type: Number,
        message: 'Phone No is required',
        required: true,
    },
    qualification: {
        type: String,
        message: 'Designation is required',
        required: true,
    },
    subject: {
        type: String,
        message: 'Subject is required',
        required: true,
    },
    salary: {
        type: Number,
        message: 'Salary is required',
        required: true,
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model('Teacher', teacherSchema);