import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { autoBatchEnhancer } from '@reduxjs/toolkit';
import AuthContext from '@/context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  let {tokens} = useContext(AuthContext)
  let authenticated = Boolean(tokens)
  return authenticated ? <Component {...rest} /> : <Navigate to="/login" replace />
    
    
};

export default PrivateRoute;