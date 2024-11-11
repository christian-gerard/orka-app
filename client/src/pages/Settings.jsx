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

    const clientSchema = object({
        name: string()
        .required(),
        description: string(),
        client_type: string(),
        ein: string(),
        address_one: string(),
        address_two: string(),
        city: string(),
        state: string(),
        zip_code: string(),
    });

    const initialValues = {
        name: '',
        description: '',
        client_type: '',
        address_one: '',
        address_two: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        ein: ''
    }


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: clientSchema,
        onSubmit: (formData) => {




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
                        className=' flex flex-col justify-center items-center '
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                        >
                            {/* <div className='bg-white  border h-[700px] w-[350px] lg:h-[80%] lg:w-[40%] '>
                                <div className='h-[5%] w-full flex items-center mb-2'>
                                    <CloseIcon  style={{width: '40px', height: '40px'}} onClick={handleNewClient} />
                                    <label className='ml-2 mt-1 text-2xl'> New Client </label>
                                </div>

                                <div className='h-[95%] w-full flex flex-col lg:gap-2 overflow-scroll scrollbar scrollbar-thumb-ocean'>
                                    <div className='flex flex-row gap-2'>
                                        <div className='w-[40%] flex justify-center items-center'>
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
                                        <div className='w-[60%] flex flex-col justify-end'>
                                            <label className='ml-2'> Name </label>
                                            <Field
                                                name='name'
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                type='text'
                                                placeholder='Name'
                                                className='border m-2 p-2'
                                            />
                                            {formik.errors.name && formik.touched.name && (
                                                <div className="text-sm text-red ml-2"> **{formik.errors.name}</div>
                                            )}

                                        </div>


                                    </div>
                                    <label className='ml-2'> Description </label>
                                    <Field
                                        name='description'
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        as='textarea'
                                        placeholder='Description'
                                        className='border m-2 p-2 min-h-[100px] lg:h-[200px]'
                                    />
                                    {formik.errors.description && formik.touched.description && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.description.toUpperCase()}</div>
                                    )}
                                    <label className='ml-2'> Client Type</label>
                                    <Field
                                        name='client_type'
                                        type='text'
                                        value={formik.values.client_type}
                                        onChange={formik.handleChange}
                                        placeholder='Client Type'
                                        className='border m-2 p-2'
                                    />
                                    {formik.errors.client_type && formik.touched.client_type && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.client_type}</div>
                                    )}
                                    <label className='ml-2'> EIN </label>
                                    <Field
                                        name='ein'
                                        type='text'
                                        value={formik.values.ein}
                                        onChange={formik.handleChange}
                                        placeholder='Ein'
                                        className='border m-2 p-2'
                                    />

                                    {formik.errors.ein && formik.touched.ein && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.ein.toUpperCase()}</div>
                                    )}
                                    <label className='ml-2'> Address </label>
                                    <Field
                                        name='address_one'
                                        type='text'
                                        value={formik.values.address_one}
                                        onChange={formik.handleChange}
                                        placeholder='Address'
                                        className='border m-2 p-2'
                                    />

                                    {formik.errors.address_one && formik.touched.address_one && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.address_one.toUpperCase()}</div>
                                    )}
                                    <label className='ml-2'> Address (line 2) </label>
                                    <Field
                                        name='address_two'
                                        type='text'
                                        value={formik.values.address_two}
                                        onChange={formik.handleChange}
                                        placeholder='Secondary Address Line'
                                        className='border m-2 p-2'
                                    />

                                    {formik.errors.address_two && formik.touched.address_two && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.address_two.toUpperCase()}</div>
                                    )}
                                    <label className='ml-2'> City </label>
                                    <Field
                                        name='city'
                                        type='text'
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        placeholder='City'
                                        className='border m-2 p-2'
                                    />
                                    {formik.errors.city && formik.touched.city && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.city.toUpperCase()}</div>
                                    )}
                                    <label className='ml-2'> Zip Code </label>
                                    <Field
                                        name='zip_code'
                                        type='text'
                                        value={formik.values.zip_code}
                                        onChange={formik.handleChange}
                                        placeholder='Zip Code'
                                        className='border m-2 p-2'
                                    />

                                    {formik.errors.zip_code && formik.touched.zip_code && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.zip_code.toUpperCase()}</div>
                                    )}
                                    <label className='ml-2'> State </label>
                                    <Field
                                        name='state'
                                        type='text'
                                        value={formik.values.state}
                                        onChange={formik.handleChange}
                                        placeholder='State'
                                        className='border m-2 p-2'
                                    />

                                    {formik.errors.state && formik.touched.state && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.zip_code.toUpperCase()}</div>
                                    )}

                                </div>


                            </div> */}

                            <button type='submit' className='bg-black w-[350px] lg:w-[40%] mt-3 text-white h-[50px] hover:text-ocean'> Update User </button>


                        </Form>

                </Formik>






            </div>


        </div>
    )
}

export default Settings