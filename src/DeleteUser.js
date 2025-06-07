import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export const DeleteUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        handleDeleteUser();
    }, []);
    const handleDeleteUser = () => {
        const query = new URLSearchParams(location.search);
        fetch(`${apiUrl}/delete?${query}`, {
            method: 'DELETE',
            headers: {
              'Content-Type':'application/json'  
            }
        }).then((res)=>console.log(res))
        navigate('/');
    }
    return null;
    
}

