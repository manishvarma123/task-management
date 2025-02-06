import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { resetUser } from '../redux/slices/userSlice.js';
import Cookies from 'js-cookie';

const Protected = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    
    if (!user) {
      dispatch(resetUser());
      dispatch({ type: 'LOGOUT_USER' });
    }
  }, [user, dispatch]);



  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
