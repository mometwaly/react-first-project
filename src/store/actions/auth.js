import * as actionsTypes from './actionTypes'
import axios from 'axios'

export const authStart = ()=>{
    return {
        type: actionsTypes.AUTH_START
    }
}

export const authSuccess = (token,userId)=>{
     return {
        type : actionsTypes.AUTH_SUCCESS,
        idToken : token,
        userId : userId
    }
}

export const authFail = (error)=>{
    return {
        type : actionsTypes.AUTH_FAIL,
        error : error
    }
}

export const auth = (email,password,isSignUp)=>{
    const authData={
        email : email,
        password : password,
        returnSecureToken : true
    }
    let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYMhBmlTsZq0Se5Zdw3JQhcvdcNVIz_CM';
    if (!isSignUp){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYMhBmlTsZq0Se5Zdw3JQhcvdcNVIz_CM'
    }
    return dispatch => {
        dispatch(authStart())
        axios.post(url,authData)
        .then(response=>{
            const  expirtionDate = new Date(new Date().getTime()+ response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationData',expirtionDate);
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuccess(response.data.idToken,response.data.localId))
        })
        .catch(error=>{
            console.log(error.message)
            dispatch(authFail(error.response.data.error.message))
        })
    }
}
export const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationData');
    localStorage.removeItem('userId');
    return {
        type : actionsTypes.LOGOUT
    }
}
export const checkAuthStatus = ()=>{
    const token=localStorage.getItem('token')
    if(!token){
      return dispatch => {
          dispatch(logout())
      }  
    }else{
        console.log('hii')
        const userId = localStorage.getItem('userId')
        
        return dispatch => {
            dispatch(authSuccess(token,userId))
        }
    }
}

