const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const router = express.Router();
// -----------------------------------------
const Admin = require('../../schemas/adminSchema/adminSchema')

const SECRET_KEY = process.env.SECRET_KEY;

router.post('/register', async (req, res) => {
    try{
        let {name, email, password} = req.body
        const data = await Admin.findOne({email: email});
        if(data != null){
            res.json({
                status: 0,
                message: 'Admin Already Exists',
                data
            });
            return;
        }
        else{
            const salt = await bcrypt.genSalt(16);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const admin = await Admin.create({
                name,
                email,
                password: hashedPassword,
            });

            if(admin) {
                res.json({
                    status: 1,
                    message: 'Registered Successfully',
                    data: admin,
                });
            }
        }
    }
    catch(err){
        console.log(err);
        res.json({
            status: 0,
            message: 'Error',
            data: null,
        });
    }
});

router.post('/login', async (req, res) => {
    try{
        let {email, password} = req.body;
        const data = await Admin.findOne({email});
        
        if(data){
            // email is correct
            let comparedPassword = await bcrypt.compare(password, data.password);
            if(comparedPassword){
                // email correct 
                // password correct
                // then provide token for identify
                const token = jsonwebtoken.sign({email}, SECRET_KEY); // sign () creates a token from combination of the secretkey and email
                res.json({
                    status: 1,
                    message: 'Login Successfull',
                    data: {
                        email,
                        token,
                    }
                });
            }
            else{
                res.json({
                    status: 0,
                    message: 'Invalid Password',
                });
            }   
        }
        else{
            res.json({
                status: 0,
                message: 'Invalid Email',
            });
        }
    }
    catch(err){
        res.json({
            status: 0,
            message: 'Error Logging In'
        })
    }
});

module.exports = router;