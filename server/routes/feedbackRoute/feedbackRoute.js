const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');

const Feedback = require('../../schemas/feedbackSchema/feedbackSchema');

router.post('/', async (req, res) => {
    const data = await Feedback.create(req.body)
    try{
        res.json({
            status: 1,
            message: 'Feedback Sent Successfully',
            data
        });
    }
    catch(err){
        res.json({
            status: 0,
            message: 'Error sending feedback',
            data: null
        });
        console.log(err);
    }
});

router.get('/', async (req, res) => {
    const data = await Feedback.find();

    try{
        res.json({
            status: 1,
            message: 'Feedback received Successfully',
            data
        });
    }
    catch(err){
        res.json({
            status: 0,
            message: 'Error receiving feedback',
            data: null
        });
        console.log(err);
    }
});

router.delete('/:feedbackId', async(req, res) => {
    try{
        const data = await Feedback.findByIdAndDelete(req.params.feedbackId, req.body);
        res.json({
            status: 1,
            message: 'Feedback Deleted Successfully',
            data
        });
    }
    catch(err){
        console.log(err);
        res.json({
            status: 0,
            message: 'Error Deleting feedback',
            data: null,
        });
    }
});

module.exports = router;




