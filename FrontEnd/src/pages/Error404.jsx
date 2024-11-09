import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Error404 = () => {

    const navigate = useNavigate();
    useEffect(() => {
        navigate('/login');
    },[]);



  return (
    <div>Error404</div>
  )
}

export default Error404