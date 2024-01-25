import React, { useState } from 'react'
import {useNavigate} from 'react-router'
import eyeClosed from '../Login/eye-closed-svgrepo-com.svg';
import eyeOpened from '../Login/eye-svgrepo-com.svg';

import './Register.css';

export default function Register() {
    const navigate = useNavigate();
    
    const [user, updateUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordCheckerMessage: '',
        validationErrorMessage: '',
        passwordCheckerMessageColor: '',
        passwordVisible: 'password',
        passwordVisibleImage: eyeClosed,
    });

    const handleChange = (e) => {  
        updateUser({
            ...user,
            [e.target.name] : e.target.value,
        });
    }

    const passwordChecker = (e) => {
        if(user.password.length <= 4){
            updateUser({
                ...user,
                passwordCheckerMessage: 'Weak Password',
                password: e.target.value,
                passwordCheckerMessageColor: 'red',
            })
        }  
        else if(user.password.length >= 5 && user.password.length <= 10){
            updateUser({
                ...user,
                passwordCheckerMessage: 'Partially strong Password',
                password: e.target.value,
                passwordCheckerMessageColor: '#dda601',
            });
        }
        else if(user.password.length >= 11 && user.password.length <= 30){
            updateUser({
                ...user,
                passwordCheckerMessage: 'Strong Password',
                password: e.target.value,
                passwordCheckerMessageColor: 'green',
            })
        }    
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        
        let nameRegex = /^([A-Z]{1})([a-z]{1,30})$/;
        let emailRegex = /^([a-z0-9.]{1,30})([@]{1})([a-z]{2,10})([.]{1})([a-z]{2,8})$/;
        let passwordRegex = /^([a-zA-Z0-9!@#$%^&*_-`~<>?'";:{}|.]{5,30})$/;    
        
        let nameVal = user.name;
        let emailVal = user.email;
        let passwordVal = user.password;
        
        let isNameValid = nameRegex.test(nameVal.trim());
        let isEmailValid = emailRegex.test(emailVal.trim());
        let isPasswordValid = passwordRegex.test(passwordVal.trim());

        if(isNameValid && isEmailValid && isPasswordValid){
            navigate('/login');
            
        }
        else{
            if(!isNameValid){
                updateUser({
                    ...user,
                    validationErrorMessage: 'Please Enter name correctly',
                });
            }
            else{
                updateUser({
                    ...user,
                    validationErrorMessage: '',
                });
                if(!isEmailValid){
                    updateUser({
                        ...user,
                        validationErrorMessage: 'Invalid Email Id',
                    });
                }
                else{
                    if(!isPasswordValid){
                        updateUser({
                            ...user,
                            validationErrorMessage: 'Please Enter appropriate password',
                        });
                    }
                }
            }   
        }
    }

    const passwordEye = (e) => {
        if(user.passwordVisibleImage == eyeClosed){
            updateUser({
                ...user, 
                passwordVisible: 'text',
                passwordVisibleImage: eyeOpened,
            });
            console.log('opened');
        }
        else if(user.passwordVisibleImage == eyeOpened){
            updateUser({
                ...user, 
                passwordVisible: 'password',
                passwordVisibleImage: eyeClosed,
            });
            console.log('closed');
        }
    }

    return (
        <>
        <div className="main-bg">

            <div className='jumbotron container  col-md-6 col-sm-8 col-xs-10'>
                <h2 className='text-center'>Register</h2>
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input value={user.name} onChange={handleChange} type="text" className="" id="name" name='name' placeholder="Enter your Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address: </label>
                        <input value={user.email} onChange={handleChange} type="email" className="" id="email" name='email' placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <div className='password-in d-flex '>
                        <input value={user.password} onInput={passwordChecker} type={user.passwordVisible} name='password' className="" id="password" placeholder="Password"/>
                        <button className='password-eye text-center' onClick={passwordEye}><img src={user.passwordVisibleImage}/></button>
                        </div>
                        <p style={{color: `${user.passwordCheckerMessageColor}`}}>{user.passwordCheckerMessage}</p>
                    </div>
                    <button type="submit" className="btn btn-primary col-md-12">Submit</button>

                    <p className='already-acc-present-txt m-2 mt-3' style={{display: 'inline-block'}}>Already have a account?</p>
                    <a href="" className='' onClick={(e) => {
                        navigate('/login');
                    }}>Login</a>
                </form>
                {
                    (user.validationErrorMessage == '') ? 
                    null:
                    <div className="alert alert-danger mt-2" role="alert">{user.validationErrorMessage}</div>
                }

            </div>
            </div>

        </>
    )
}
