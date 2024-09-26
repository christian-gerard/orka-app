
import { useState } from 'react'
import { useFormik } from "formik";

import toast from 'react-hot-toast'

function Auth() {

  const [newUser, setNewUser] = useState(false)
  const [token, setToken] = useState('')

  const handleNewUser = () => setNewUser(!newUser)

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
        username: '',
        password: ''
      },
      onSubmit: newUser ?

      formData =>

      {
        formData['username'] = formData['email']

        fetch('user/token/',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        .then(resp => {
          if(resp.ok){
            return resp.json().then(data => {
              setToken(data)
              console.log(token)
              toast.success('Login Successful')

            })}
        })
        .then(() => {

        })
        .catch(err => {
          toast.error('Unable to Login')
        })


      }

      :

      formData =>

      {

        fetch('/auth/login/',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        .then(resp => {
          if(resp.ok){
            return resp.json().then(data => {
              login(data)
              nav('/dashboard')
              toast.success('Login Successful')

            })}
          else if(resp.status === 404) {
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
        <div className='bg-black text-white py-12 px-8 flex flex-col items-center '>
          <h1 className='text-5xl p-2 tracking-[0.8em] reddit-mono justify-center pl-[0.8em] '> ORKA </h1>
          <h2 className='text-2xl tracking-[0.2em]'>Sign Up</h2>
          <form onSubmit={formik.handleSubmit} className='flex flex-col p-2'>
            <div className='flex flex-row'>
              <div className='flex flex-col mr-2'>
                <div className='flex flex-col'>
                  <label htmlFor="first_name" className='text-lg'>First Name</label>
                  <input id="first_name"
                      name="first_name"
                      type="first_name"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      className='text-black my-2 p-1 text-lg'
                      placeholder='First Name'/>

                  <label htmlFor="first_name" className='text-lg'>Last Name</label>
                  <input id="last_name"
                      name="last_name"
                      type="last_name"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      className='text-black my-2 p-1 text-lg'
                      placeholder='Last Name'/>
                  <label htmlFor="username" className='text-lg'>Email</label>
                  <input id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className='text-black my-2 p-1 text-lg'
                    placeholder='Email'/>
                </div>
                <label htmlFor="password" className='text-lg'>Password</label>
                <input id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className='text-black my-2 p-1 text-lg'
                  placeholder='password'/>
                <input id="password"
                  name="passwordConfirmation"
                  type="Password"
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirmation}
                  className='text-black my-2 p-1 text-lg'
                  placeholder='Confirm Password'/>
              </div>


            </div>
            <button type="submit" className='mt-4 bg-white text-black'>Create Account</button>
          </form>
          <button type='button' className='mt-2 border border-white p-1 text-md w-full underline' onClick={handleNewUser}>Log In</button>
        </div>
        :
        // Login
        <div className='bg-black text-white py-12 px-8 flex flex-col'>
            <h1 className='text-5xl p-2 tracking-[0.8em] reddit-mono  w-full flex justify-center pl-[0.8em]'> ORKA </h1>
            <form onSubmit={formik.handleSubmit} className='flex flex-col p-2'>
                <label htmlFor="username" className='text-xl'>Email</label>
                <input
                    id="username"
                    name="username"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className='text-black my-2 p-1 text-lg'
                    placeholder='email'
                />
                <label htmlFor="password" className='text-xl'>Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className='text-black my-2 p-1 text-lg'
                    placeholder='password'
                />
                <button type="submit" className='mt-4 bg-white text-black'>Log In</button>
                <button type='button' className='mt-2 border border-white p-1 text-md w-full underline' onClick={handleNewUser}>Create New User</button>
            </form>
        </div>
      }
      </>
    );
}

export default Auth