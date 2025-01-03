import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { Navigate} from 'react-router'
import Cookies from 'js-cookie'
import { store } from '../redux/store.js'
import { resetUser } from '../redux/slices/userSlice.js'

const Protected = ({children}) => {

  const {user} = useSelector((state)=> state.user)
  const token = Cookies.get("token");
  if(!token){
    store.dispatch({type: "LOGOUT_USER"});
    store.dispatch(resetUser());
  }
  if(!user) return <Navigate to={'/login'} replace />

  return children
}

export default Protected