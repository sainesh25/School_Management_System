import { Link } from 'react-router-dom'
import React from 'react';
import { useSelector } from 'react-redux';
import { userLoggedOut } from '../../store/slices/authSlice/authSlice';
import { useDispatch } from 'react-redux';
import './Navbar.css';

export default function Navbar() {

    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => {
        return state.authentication.isLoggedIn;
    }); 
    
    const logOutFunc = async() => {
        dispatch(userLoggedOut());
        localStorage.removeItem('token');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark nav-color">
                <Link className='navbar-brand icon-head heading-link' to='/'>School Management System</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {
                            (isLoggedIn) ?
                            <>   
                                <li className="nav-item">
                                    <Link to='add' className='nav-link'>Add Teacher</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='view' className='nav-link'>View Teacher</Link>
                                </li>
                                
                                <li className="nav-item">
                                    <Link to='viewMessages' className='nav-link'>View Feedbacks</Link>
                                </li>
                                
                                <li className="nav-item">
                                    <Link to='' onClick={logOutFunc} className='btn btn-danger nav-link' style={{color: 'white'}}>Logout</Link>
                                </li>
                            </>
                        :
                            <>
                                <li className="nav-item active">
                                    <Link to='/' className='nav-link'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='login' className='nav-link'>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='register' className='nav-link'>Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='contact' className='nav-link'>Contact Us</Link>
                                </li>
                            </>
                        }

                    </ul>
                </div>
            </nav>
        </>
    );
}

