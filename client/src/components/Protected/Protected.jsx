import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
export default function Protected(props) {

    const isLoggedIn = useSelector((state) => {
        return state.authentication.isLoggedIn;
    }); 

    const navigate = useNavigate();
    useEffect((e) => {
        const token = localStorage.getItem('token');
        if(!token || !isLoggedIn){
            navigate('/login');
        }
    }, [])
    const ComponentToRender = props.component;

    return (
        <>
            <ComponentToRender/>
        </>
    )
}
