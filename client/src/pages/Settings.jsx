import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { useFormik, Formik, Form, Field } from 'formik'
import { object, string, array, number, bool } from "yup";
import { toast } from 'react-hot-toast'
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Client from '../components/Client'
import Dropzone from 'react-dropzone'
import axios from 'axios'




function Settings() {
    const {API_URL, user, accessToken} = useContext(UserContext)
    const [files, setFiles] = useState([''])

    const  userSchema = object({
        first_name: string(),
        last_name: string(),
        email: string(),

    });



    const initialValues = {
        email: user ? user.email : '',
        first_name: user ? user.first_name : '',
        last_name: user ? user.last_name : ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: userSchema,
        onSubmit: (formData) => {

            const token = accessToken

            const fd = new FormData()

            if(files[0] !== '') {
                fd.set("profile_img", files[0])
            }

            for(let key in formData) { fd.set(key, formData[key])}

            axios.patch(`${API_URL}/api/user/${user.id}/`,fd, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp => {
                if(resp.status == 200){s

                    toast.success('User Updated')
                } else {
                    toast.error('Error Occured During Update')
                }
            })
            .catch(err => console.log(err))




        }
    })

    return (
        <div className='h-full w-full overflow-scroll scrollbar scrollbar-thumb-ocean overflow-scroll'>
            <p className='text-4xl'>Settings</p>
            <div className='my-8 w-full'>



            </div>

            <div className='my-8 w-full'>
                <p className='text-2xl'>User</p>

                <Formik
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                    >
                        <Form
                        className=' flex flex-col justify-center items-center w-full '
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                        >



                                <div className='h-[95%] w-full flex flex-col lg:gap-2 overflow-scroll scrollbar scrollbar-thumb-ocean'>

                                    <div className='flex flex-row gap-2'>


                                        <div className='w-[60%] flex flex-col justify-end'>
                                            <label className='ml-2'> First Name </label>
                                            <Field
                                                name='first_name'
                                                value={formik.values.first_name}
                                                onChange={formik.handleChange}
                                                type='text'
                                                placeholder='First Name'
                                                className='border m-2 p-2'
                                            />
                                            {formik.errors.first_name && formik.touched.first_name && (
                                                <div className="text-sm text-red ml-2"> **{formik.errors.first_name}</div>
                                            )}

                                        </div>

                                        <div className='w-[60%] flex flex-col justify-end'>
                                            <label className='ml-2'> Last Name </label>
                                            <Field
                                                name='last_name'
                                                value={formik.values.last_name}
                                                onChange={formik.handleChange}
                                                type='text'
                                                placeholder='Last Name'
                                                className='border m-2 p-2'
                                            />
                                            {formik.errors.last_name && formik.touched.last_name && (
                                                <div className="text-sm text-red ml-2"> **{formik.errors.last_name}</div>
                                            )}
                                        </div>

                                    </div>

                                    <div className='flex flex-row gap-2'>
                                        <div className='w-[20%] flex justify-center items-center'>
                                            <Dropzone onDrop={acceptedFiles => {
                                                setFiles(acceptedFiles.map(file => Object.assign(file, {
                                                preview: URL.createObjectURL(file)
                                                })));}
                                            }>
                                                {({getRootProps, getInputProps}) => (
                                                    <div {...getRootProps()} >
                                                    <input {...getInputProps()} />
                                                    <p className='p-2' >
                                                        {
                                                            files[0] ?
                                                            <img
                                                                className='rounded-[100%] h-[125px] w-[125px] object-cover'
                                                                src={files[0].preview}
                                                                alt='client'
                                                            />
                                                            :
                                                                <div className='rounded-[100%] h-[125px] w-[125px] bg-ocean flex items-center text-white'>
                                                                    <UploadFileIcon style={{width:'35px', height:'35px'}} />
                                                                    <div className='flex flex-col justify-center text-xs'>
                                                                        <p className='text-sm'>Img Upload</p>
                                                                        <p className='italic'>Drag or Click</p>
                                                                    </div>
                                                                </div>




                                                        }

                                                    </p>
                                                    </div>

                                                )}
                                            </Dropzone>

                                        </div>

                                        <div className='w-[80%] flex flex-col justify-end'>
                                                <label className='ml-2'> Email </label>
                                                <Field
                                                    name='email'
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    type='text'
                                                    placeholder='Email'
                                                    className='border m-2 p-2'
                                                />
                                                {formik.errors.email && formik.touched.email && (
                                                    <div className="text-sm text-red ml-2"> **{formik.errors.email}</div>
                                                )}
                                        </div>


                                    </div>

                                </div>



                            <button type='submit' className='bg-black mt-3 text-white w-full h-[50px] hover:text-ocean'> Update User </button>


                        </Form>

                </Formik>






            </div>


        </div>
    )
}

export default Settings