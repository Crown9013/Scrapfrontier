import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BaseErrorSpan from "../Span/ErrorSpan";
import { login } from "../../services/auth.services";

function LoginComponent() {    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const navigate = useNavigate()

    const validateEmail = React.useCallback((str_email) => {
        const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        
        if (!str_email) {
          setEmailErr('Please fill out this field')
          return false
        }
        if (!str_email.match(isValidEmail)) {
          setEmailErr('Invalid email format')
          return false
        }
        setEmailErr('')
        return true
    }, [])
    
    const validatePassword = React.useCallback((str_password) => {
        if (!str_password) {
          setPasswordErr('Please fill out this field')
          return false
        }
        setPasswordErr('')
        return true
    }, [])

    const onChangeEmail = React.useCallback((e) => {
        if (!e) return;
        e.preventDefault()
        const str_email = e.target.value
        setEmail(str_email)
        validateEmail(str_email)
      }, [validateEmail])
    
    const onChangePassword = React.useCallback((e) => {
        if (!e) return;
        e.preventDefault()
        const str_password = e.target.value
        setPassword(str_password)
        validatePassword(str_password)
    }, [validatePassword])

    const formValidation = React.useCallback(() => {
        let isValid = true
        isValid = validateEmail(email) && isValid
        isValid = validatePassword(password) && isValid
        
        return isValid
    }, [email, password, validateEmail, validatePassword])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formValidation()) {
            // register user to db
            login(email, password).then(res => {
                const data = res.data
                if (res.status === 200 && res.data) {
                    toast.success('Successfully logged in!')
                    if (data.data.accessToken) {
                        window.localStorage.setItem('user', JSON.stringify(data.data))
                    }
                    navigate('/featured')
                } else {
                    if (res.msg) toast.error(res.msg)
                }
            }).catch(err => {
                console.error(err)
                if (err && err.response && err.response.data && err.response.data.msg)  {
                    toast.error(err.response.data.msg)
                }
            })
          }
    }


  return (
    <div className="d-flex justify-content-center align-items-center signin vh-100">
        <div className="bg-white p-3 rounded w-full sm:w-4/5 md:w-1/3 lg:w-1/4">
            <h2><center>Login</center></h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input 
                        type="text" 
                        placeholder='Enter Email' 
                        autoComplete='off' 
                        name='email' 
                        className='form-control rounded-0' 
                        onChange={onChangeEmail}
                    />
                    <BaseErrorSpan errorMessage={emailErr} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Password</strong>
                    </label>
                    <input 
                        type="password" 
                        placeholder='Enter Password' 
                        name='password' 
                        className='form-control rounded-0' 
                        onChange={onChangePassword}
                    />
                    <BaseErrorSpan errorMessage={passwordErr} />
                </div>
                <button type="submit" className="btn !bg-[#CC402A] w-100 rounded-0">
                    Login
                </button>
            </form>
            <p className="mt-3">Don't have an account?</p>
            <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                Sign Up
            </Link>
            
        </div>
    </div>
  );
}

export default LoginComponent;