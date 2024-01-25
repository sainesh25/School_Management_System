import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router'
import { addErrorMessage, addSuccessMessage, userLoggedIn } from '../../store/slices/authSlice/authSlice';
import { useDispatch, useSelector} from 'react-redux';
import eyeClosed from './eye-closed-svgrepo-com.svg';
import eyeOpened from './eye-svgrepo-com.svg';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => {
        return state.authentication.isLoggedIn;
    });

    const [user, updateUser] = useState({
        email: '',
        password: '',
        validationErrorMessage: '',
        passwordVisible: 'password',
        passwordVisibleImage: eyeClosed,
        loadingText: 'Login',
    });

  

    const handleChange = (e) => {  
        updateUser({
            ...user,
            [e.target.name] : e.target.value,
        });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        
        let emailRegex = /^([a-z0-9.]{1,30})([@]{1})([a-z]{2,10})([.]{1})([a-z]{2,8})$/;
        let passwordRegex = /^([a-zA-Z0-9! @#$%^&*_-`~<>?'";:{}|.]{5,30})$/;
        
        let emailVal = user.email;
        let passwordVal = user.password;

        let isEmailValid = emailRegex.test(emailVal.trim());
        let isPasswordValid = passwordRegex.test(passwordVal);


        // validation 
        if(isEmailValid && isPasswordValid){

            

            try{
                const response = await fetch('http://localhost:5000/api/v1/auth/login', {
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(user)
                });

                const data = await response.json();
                
                if(data.status === 0){
                    updateUser({
                        ...user,
                        validationErrorMessage: 'Wrong Credentials',
                        loadingText: 'Login',
                    });
                    
                    dispatch(addErrorMessage(data.message));
                    console.log(data.message);
                }
                else{
                    console.log(data.message);

                    dispatch(addSuccessMessage(data.message));
                    const token = data.data.token;
                    dispatch(userLoggedIn());
                    localStorage.setItem('token', token);
                    updateUser({
                        ...user,
                        validationErrorMessage: '',
                        loadingText: 'Login Success Please Wait...',
                    });        
                    setTimeout(() => {
                        navigate('/view');
                    }, 5000);
                }
            }
            catch(err){
                console.log(err);
            }     
        }
        else{
            updateUser({
                ...user,
                validationErrorMessage: 'Invalid Credentials',
                loadingText: 'Login',
            });
        } 
    }

    const passwordEye = (e) => {
        if(user.passwordVisibleImage == eyeClosed){
            updateUser({
                ...user, 
                passwordVisible: 'text',
                passwordVisibleImage: eyeOpened,
            });
        }
        else{
            updateUser({
                ...user, 
                passwordVisible: 'password',
                passwordVisibleImage: eyeClosed,
            });
        }
    }

    return (
        <>
            <div className="main-bg">
                <div className='jumbotron container col-md-6 col-sm-8 col-xs-10 mt-4 shadow rounded'>
                    <h2 className='text-center'>Admin Login</h2>
                    <form onSubmit={onSubmitForm}>
                        <div className="form-group">
                            <label htmlFor="email">Email address: </label>
                            <input value={user.email} onChange={handleChange} type="email" name='email' className="" id="email" placeholder="Enter email"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <div className='password-in d-flex '>
                            <input value={user.password} onChange={handleChange} type={user.passwordVisible} name='password' className="" id="password" placeholder="Password"/>
                            <button type='button' className='password-eye text-center' onClick={passwordEye}><img src={user.passwordVisibleImage}/></button>
                            </div>         
                        </div>
                        <button type="submit" className="btn btn-primary col-md-12" disabled={user.loadingText == 'Login Success Please Wait...'} >{user.loadingText}</button>
                        <p className='already-acc-present-txt m-2 mt-3' style={{display: 'inline-block'}}>Don't have a account?</p>
                        <a href="" className='' onClick={(e) => {
                            navigate('/register');
                        }}>Register</a>
                    </form>
                    
                    {
                        (user.validationErrorMessage === '')  ? 
                        null:
                        <div className="alert alert-danger mt-2" role="alert">{user.validationErrorMessage}</div>
                    }  
  
                </div>
            </div>  
        </>
    )
}
