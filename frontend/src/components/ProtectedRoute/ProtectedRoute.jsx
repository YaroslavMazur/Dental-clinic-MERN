import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import {selectIsLoading, selectIsAuth } from '../../redux/slices/authSlice';

const ProtectedRoute = ({ children , ...rest }) => {
  const isAuth = useSelector(selectIsAuth);
  const isLoading = useSelector(selectIsLoading);

  console.log("FETCH AUT");

  if(!isLoading && isAuth){
    return children;
  }
  else{
    window.alert("Please login");
    return <Navigate to="/login" />
  }
};

export default ProtectedRoute;