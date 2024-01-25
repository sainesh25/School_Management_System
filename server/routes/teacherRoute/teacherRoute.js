const express = require('express');
const router = express.Router();
const multer = require('multer');

const Teacher = require('../../schemas/teacherSchema/teacherSchema');
const uploadFileMiddleware = require('../../middlewares/uploadFileMiddleware.js/uploadFileMiddleware');

// GET ALL TEACHERS INFO
router.get('/', async (req, res) => {
    try{
        const data = await Teacher.find();
        res.json({
            status: 1,
            message: 'All Teachers Fetched Successfully',
            data
        });
    }
    catch(err){
        res.json({
            status: 0,
            message: 'Error Fetching Teachers',
            data: null,
        });
    }
});

// GET SINGLE TEACHER INFO
router.get('/:teacherId', async (req, res) => {
    try{
        const data = await Teacher.findById(req.params.teacherId);
        if(data){
            res.json({
                status: 1,
                message: 'Teacher Fetched Successfully',
                data
            });
        }
        else{
            res.json({
                status: 0,
                message: 'Teacher Info Not Found',
            });
        }
    }
    catch(err){
        res.json({
            status: 0,
            message: 'Error Fetching Teacher',
            data: null,
        });
    }
});

// CREATE A TEACHER
router.post('/', uploadFileMiddleware.single('image') ,async (req, res) => {
    
    if(req.fileUploadError){
        res.json({
            status: 0,
            message: req.fileUploadError,
            data: null,
        });
        console.log(req.fileUploadError);
        return;
    }
   
    try{    
        const data = await Teacher.create({...req.body, image: req.file.originalname});
        res.json({
            status: 1,
            message: 'Teacher Created Successfully',
            data
        });
    }
    catch(err){
        console.log(err);
        res.json({
            status: 0,
            message: 'Error Creating Teacher',
            data: null,
        });
    }
});

// UPDATE TEACHER INFO
router.put('/:teacherId', async (req, res) => {
    try{
        const data = await Teacher.findByIdAndUpdate(req.params.teacherId, req.body, {new: true})
        if(data){
            res.json({
                status: 1,
                message: 'Teacher Info Updated Successfully',
                data
            });
        }
        else{
            res.json({
                status: 0,
                message: 'Teacher Info Not Found'
            });
        }
    }
    catch(err){
        console.log(err);
        res.json({
            status: 0,
            message: 'Error Updating Teacher',
            data: null,
        });
    }
});

// DELETE TEACHER INFO
router.delete('/:teacherId', async (req, res) => {
    try{
        const data = await Teacher.findByIdAndDelete(req.params.teacherId);
        if(data){
            res.json({
                status: 1,
                message: 'Teacher Deleted Successfully',
                data
            });
        }
        else{
            res.json({
                status: 0,
                message: 'Teacher Info Not Found',
            });
        }
    }
    catch(err){
        res.json({
            status: 0,
            message: 'Error Deleting Teacher',
            data: null,
        });
    }
});

module.exports = router;