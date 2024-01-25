import React from 'react'
import { useNavigate } from 'react-router'

export default function NotFound() {
    const navigate = useNavigate();
    return (

        <>
            <div className="jumbotron">
                <h1>404 Page Not Found</h1>
                <p>Go to Home Page</p>
                <button className="btn btn-primary" onClick={(e) => {
                    navigate('/');
                }}>Home Page</button>
            </div>
        </>
    )
}
