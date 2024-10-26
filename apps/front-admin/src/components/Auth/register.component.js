import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BaseErrorSpan from "../Span/ErrorSpan";
import { register } from "../../services/auth.services";

function SignupComponent() {    
  
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [nameErr, setNameErr] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('')

  const navigate = useNavigate()

  const validateName = React.useCallback((str_name) => {
    if (!str_name) {
      setNameErr('Please fill out this field')
      return false
    }
    setNameErr('')
    return true
  }, [])
  
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
    if (str_password.length < 3 || str_password.length > 12) {
      setPasswordErr('Password length should be between 3 and 12')
      return false
    }
    setPasswordErr('')
    return true
  }, [])
  const validateConfirmPassword = React.useCallback((str_password) => {
    if (!str_password) {
      setConfirmPasswordErr('Please fill out this field')
      return false
    }
    if (str_password.toLowerCase() !== password.toLowerCase()) {
      setConfirmPasswordErr('Not match with password')
      return false
    }
    setConfirmPasswordErr('')
    return true
  }, [password])

  const formValidation = React.useCallback(() => {
    let isValid = true
    isValid = validateName(name) && isValid
    isValid = validateEmail(email)
    isValid = validatePassword(password) && isValid
    isValid = validateConfirmPassword(confirmPassword) && isValid

    return isValid
  }, [confirmPassword, email, name, password, validateConfirmPassword, validateEmail, validateName, validatePassword])

  const onChangeName = React.useCallback((e) => {
    if (!e) return;
    e.preventDefault()
    const str_name = e.target.value
    setName(str_name)
    validateName(str_name)
  }, [validateName])

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

  const onChangeConfirmPassword = React.useCallback((e) => {
    if (!e) return;
    e.preventDefault()
    const str_password = e.target.value
    setConfirmPassword(str_password)
    validateConfirmPassword(str_password)
  }, [validateConfirmPassword])

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (formValidation()) {
      // register user to db
      register(name, email, password).then(res => {
        toast.success('Successfully registered!')
        navigate("/login")
      }).catch(err => {
        console.error(err)
        if (err.response.data && err.response.data.msg)  {
          toast.error(err.response.data.msg)
        }
      })
    }
  }

  return (
    <div className="flex justify-content-center align-items-center signup vh-100">
        <div className="bg-white p-3 rounded w-full sm:w-4/5 md:w-1/3 lg:w-1/4">
        <h2><center>Sign Up</center></h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Name</strong>
                    </label>
                    <input 
                      type="text" 
                      placeholder='Enter Name' 
                      autoComplete='off' 
                      name='email' 
                      className='form-control rounded-0'
                      onChange={onChangeName}
                    />
                    <BaseErrorSpan errorMessage={nameErr} />
                </div>
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
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Confirm Password</strong>
                    </label>
                    <input 
                      type="password" 
                      placeholder='Confirm Password' 
                      name='confirm_password' 
                      className='form-control rounded-0' 
                      onChange={onChangeConfirmPassword}
                    />
                    <BaseErrorSpan errorMessage={confirmPasswordErr} />
                </div>
                <button type="submit" className="!bg-[#CC402A] btn w-100 rounded-0">
                    Sign Up
                </button>
                </form>
                <p className="mt-3">Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            
        </div>
    </div>
  );
}

export default SignupComponent;