
import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { useFormik } from "formik";
import * as Yup from 'yup'
import { object, string} from 'yup'
import toast from 'react-hot-toast'
import Cookie from 'js-cookie'

function Auth() {

  const { user, setUser, token, setToken} = useContext(UserContext)
  const [newUser, setNewUser] = useState(false)

  const handleNewUser = () => setNewUser(!newUser)

  const signUpSchema = object({
    firstName: string()
    .required("First Name is Required"),
    lastName: string()
    .required("Last Name is Required"),
    email: string()
    .email("Must provide a valid address")
    .matches("\.(com|edu)$", 'Please include a valid domain')
    .required("Email is Required"),
    password: string()
    .min(8,"Password must be at least 8 characters")
    .matches('[0-9]', "Must include a number")
    .matches('[!@#$%^&*(),.?":{}|<>]', 'must include special character')
    .required("Please provide a password"),
    passwordConf: string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required("Please confirm your passsword")
  })

  const loginSchema = object({
    loginEmail: string()
    .required("Email is Required"),
    loginPassword: string()
    .required("Required")
  })

  const formik = useFormik({
      initialValues: newUser ?
      {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      }
      :
      {
        loginEmail: '',
        loginPassword: ''
      },
      validationSchema: newUser ? signUpSchema : loginSchema,
      onSubmit: newUser ?

      formData =>

      {
        const userData = {
          email:formData.email,
          password:formData.password,
          first_name:formData.firstName,
          last_name:formData.lastName
        }

        // fetch(`/api/user/create/`,{
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(userData),
        // })
        // .then(resp => {
        //   if(resp.ok){
        //     return resp.json().then(data => {
        //       setNewUser(false)
        //       toast.success(`Account created for ${data.firstName}`)

        //     })}
        // })
        // .then(() => {

        // })
        // .catch(err => {
        //   toast.error('Unable to Login')
        // })


      }

      :

      formData =>

      {

        const loginData = {
          email: formData.loginEmail,
          password: formData.loginPassword
        }

        fetch(`/api/user/login/`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        })
        .then(resp => {
          if(resp.ok){
            return resp.json().then(data => {

              Cookie.set('refreshToken', data.refresh, { expires: 7, secure: true });
              toast.success('Login Successful')
            })}
          else {
            toast.error("Invalid Login")
          }
        })
        .then(() => {

        })
        .catch(err => {
          toast.error('Unable to Login')
        })
      },
  });

    return (
      <>
      {
        newUser ?
        // Account Creation
        <div className='bg-black text-white py-12 px-8 flex flex-col items-center'>
          <h1 className='text-5xl p-2 tracking-[0.8em] reddit-mono justify-center pl-[0.8em] '> ORKA </h1>
          <h2 className='text-2xl tracking-[0.2em]'>Sign Up</h2>
          <form onSubmit={formik.handleSubmit} className='flex flex-col p-2 w-full'>
              <div className='flex flex-col mr-2'>
                  <label htmlFor="firstName" className='text-lg'>First Name</label>
                  <input id="firstName"
                      name="firstName"
                      type="firstName"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      className='text-black my-2 p-1 text-lg'
                      placeholder='First Name'/>
                  {formik.errors.firstName && formik.touched.firstName && (
                  <div className="error-message show text-red">
                    {formik.errors.firstName}
                  </div>
                  )}

                  <label htmlFor="lastName" className='text-lg'>Last Name</label>
                  <input id="lastName"
                      name="lastName"
                      type="lastName"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      className='text-black my-2 p-1 text-lg'
                      placeholder='Last Name'/>
                  {formik.errors.lastName && formik.touched.lastName && (
                  <div className="error-message show text-red">
                    {formik.errors.lastName}
                  </div>
                  )}
                  <label htmlFor="username" className='text-lg'>Email</label>
                  <input id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className='text-black my-2 p-1 text-lg'
                    placeholder='Email'/>
                  {formik.errors.email && formik.touched.email && (
                  <div className="error-message show text-red">
                    {formik.errors.email}
                  </div>
                  )}
                  <label htmlFor="password" className='text-lg'>Password</label>
                  <input id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className='text-black my-2 p-1 text-lg'
                    placeholder='Password'/>
                  {formik.errors.password && formik.touched.password && (
                  <div className="error-message show text-red">
                    {formik.errors.password}
                  </div>
                  )}
                  <input id="passwordConf"
                    name="passwordConf"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.passwordConf}
                    className='text-black my-2 p-1 text-lg'
                    placeholder='Confirm Password'/>
                  {formik.errors.passwordConf && formik.touched.passwordConf && (
                  <div className="error-message show text-red">
                    {formik.errors.passwordConf}
                  </div>
                  )}

              </div>

            <button type="submit" className='mt-6 bg-white text-xl w-full text-black'>Create New Account</button>
          </form>
          <button type='button' className='mt-2 border border-white p-1 text-sm w-full underline' onClick={handleNewUser}>Switch to Log In</button>
        </div>
        :
        // Login
        <div className='bg-black text-white py-12 px-8 flex flex-col'>
            <h1 className='text-5xl p-2 tracking-[0.8em] reddit-mono  w-full flex justify-center pl-[0.8em]'> ORKA </h1>
            <form onSubmit={formik.handleSubmit} className='flex flex-col p-2'>
                <label htmlFor="loginEmail" className='text-xl'>Email</label>
                <input
                    id="loginEmail"
                    name="loginEmail"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.loginEmail}
                    className='text-black my-2 p-1 text-lg'
                    placeholder='email'
                />
                {formik.errors.loginEmail && formik.touched.loginEmail && (
                  <div className="error-message show text-red">
                    {formik.errors.loginEmail}
                  </div>
                  )}
                <label htmlFor="loginPassword" className='text-xl'>Password</label>
                <input
                    id="loginPassword"
                    name="loginPassword"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.loginPassword}
                    className='text-black my-2 p-1 text-lg'
                    placeholder='password'
                />
                {formik.errors.loginPassword && formik.touched.loginPassword&& (
                  <div className="error-message show text-red">
                    {formik.errors.loginPassword}
                  </div>
                )}
                <button type="submit" className='mt-4 bg-white text-black'>Log In</button>
            </form>
        </div>
      }
      </>
    );
}

export default Auth
