// const { default: mongoose } = require("mongoose");

const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
const Admin = require('../../schemas/adminSchema/adminSchema');


// api/v1/admin
// GET ALL ADMIN INFO 
router.get('/', async (req, res) => {
    try{
        const data = await Admin.find();
        res.json({
            status: 1,
            message: 'All Admins Fetched Successfully',
            data: data,
        });
    }
    catch(err){
        console.log(err);
        res.json({
            status: 0,
            message: 'Error fetching admins',
            data: null,
        });
    }
});

// CREATE ADMIN
router.post('/', async (req, res) => {
    try{
        const data = await Admin.create(req.body);
        res.json({
            status: 1,
            message: 'Admin created successfully',
            data,
        });
    }
    catch(err){
        console.log(err);
        res.json({
            status: 0,
            message: 'Error Creating admin',
            data: null,
        });
    }
});

// GET SINGLE ADMIN INFO
router.get('/:adminId', async (req, res) => {
    try{
        const data = await Admin.findById(req.params.adminId);
        if(data){
            res.json({
                status: 1,
                message: 'Admin Fetched Successfully',
                data
            });
        }
        else{
            res.json({
                status: 0,
                message: 'Admin Not Found',
            });
        }
    }
    catch(err){
        console.log(err);
        res.json({
            status: 0,
            message: 'Error fetching admin',
            data: null
        });
    }

});

// UPDATE ADMIN
router.put('/:adminId', async(req, res) => {
    try{
        const data = await Admin.findByIdAndUpdate(req.params.adminId ,req.body ,{new: true});
        if(data){
            res.json({
                status: 1,
                message: 'Admin Credentials Updated',
                data,
            });
        }
        else{
            res.json({
                status: 0,
                message: 'Admin Not Found',
                data: null,
            })
        }
    }
    catch(err){
        console.log(err);
        res.json({
            status: 0,
            message: 'Error Updating Admin',
            data: null,
        })
    }
});

// DELETE ADMIN
router.delete('/:adminId', async (req, res) => {
    const data = await Admin.findByIdAndDelete(req.params.adminId);
    try{
        if(data){
            res.json({
                status: 1,
                message: 'Admin Deleted Successfully',
                data
            });
        }
        else{
            res.json({
                status: 0,
                message: 'Admin Not Found'
            });
        }
    }
    catch(err){
        res.json({
            status: 0,
            message: 'Error Deleting Admin',
            data: null,
        });
    }
});

module.exports = router;

