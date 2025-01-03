import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import Cookies from 'js-cookie';
import { resetUser } from '../redux/slices/userSlice.js';

const Protected = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      dispatch(resetUser());
      dispatch({ type: 'LOGOUT_USER' });
    }
  }, [token, dispatch]);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
