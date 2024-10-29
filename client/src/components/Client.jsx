import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik, Formik, Form, Field } from 'formik'
import { object, string, array, number, bool } from "yup";
import { toast } from 'react-hot-toast'
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Project from '../components/Project'
import Dropzone from 'react-dropzone'
import Contact from '../components/Contact'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios'

function Client({ id, name, client_img}) {
    const route = useParams()
    const nav = useNavigate()
    const {  accessToken, user } = useContext(UserContext)
    const [client, setClient] = useState(null)
    const [deleteClient, setDeleteClient] = useState(false)
    const [editClient, setEditClient] = useState(false)
    const [files, setFiles] = useState([''])

    const token = accessToken

    const handleEditClient = () => {
        setFiles([''])
        setEditClient(!editClient)
        formik.setValues(initialValues)
    }

    const handleDeleteClientPage = () => {
        setDeleteClient(!deleteClient)
    }

    const handleDeleteClient = () => {
        axios.delete(`/api/clients/${route.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => {
            if(resp.status === 204){
                toast.success('Client Deleted')
                nav('/clients')
            }
        })
    }


    const clientSchema = object({
        name: string(),
        description: string(),
        industry: string(),
        ein: string(),
        address_one: string(),
        address_two: string(),
        city: string(),
        state: string(),
        zip_code: string()
    });


    const initialValues = {
        name: client ? client.name : '',
        description: client ? client.description : '',
        industry: client ? client.industry : '',
        ein: client ? client.ein : '',
        address_one: client ? client.address_one : '',
        address_two: client ? client.address_two : '',
        city: client ? client.city : '',
        state: client ? client.state : '',
        zip_code: client ? client.zip_code : '',
        account: client ? client.account : null
    }

    const formik = useFormik({
        initialValues,
        validationSchema: clientSchema,
        onSubmit: (formData) => {

            const token = accessToken

            const fd = new FormData()

            if(files[0] !== '') {
                fd.set("client_img", files[0])
            }

            fd.set('account', user ? user.account.id : 1)

            for(let key in formData) { fd.set(key, formData[key])}


            axios.patch(`/api/clients/${route.id}/`, fd, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(resp => {
                if(resp.status == 200){

                    setClient(resp.data)
                    handleEditClient()
                    toast.success('Client Updated')
                }
            })



        }
    })

    useEffect(() => {


        if(route.id !== undefined){
            axios.get(`/api/clients/${route.id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp => {
                if(resp.status == 200){
                    setClient(resp.data)
                }
            })
        }


    },[route.id])

    return(
        <>

        {
            route.id ?

            <div className='border w-full h-full'>

                {/* Client Back + Edit + Delete */}
                <div className='w-full h-[5%] flex flex-row justify-between p-2 bg-black text-white items-center'>

                    <div>

                    <NavLink to='/clients'>
                        <ArrowBackIcon style={{ width: '40px', height: '40px' }} className='hover:bg-white hover:text-black'/>
                    </NavLink>


                    </div>

                    <div className='flex gap-2'>


                        <NavLink onClick={handleDeleteClientPage}>
                            <DeleteIcon style={{ width: '40px', height: '40px' }} className='hover:bg-white hover:text-black' />
                        </NavLink>


                        <NavLink onClick={handleEditClient}>
                            <EditIcon style={{ width: '40px', height: '40px' }} className='hover:bg-white hover:text-black'/>
                        </NavLink>

                    </div>


                </div>



                {
                    client ?

                        <div className='w-full h-[95%] flex flex-col'>
                            {/* Client Info + Img */}
                            <div className='flex flex-row items-end justify-between h-[10%] p-2 bg-black text-white'>

                                <div className='flex flex-row items-end gap-2'>
                                    <img
                                        src={client ? client.client_img : ' '  }
                                        className='rounded-[100%] bg-white border border-black size-[100px] sm:size-[80px] object-cover'
                                        alt='client'
                                    />
                                    <p className='text-5xl'>{client.name ? client.name : 'No Name'}</p>
                                </div>

                                <div>
                                    <p className='text-2xl'>{client? client.client_type : ''}</p>
                                </div>



                            </div>
                            {/* Client Contacts */}
                            <div className='scrollbar-thumb-ocean border-t h-[45%] w-full  scrollbar-thumb-ocean'>
                                <div className='h-[10%] flex flex-row gap-4 items-center bg-ocean text-white p-1'>
                                    <p>Contacts</p>
                                    <p className='bg-white text-black '></p>
                                </div>
                                <div className='h-[90%] w-full scrollbar overflow-y-scroll scrollbar-thumb-ocean p-4'>
                                <div className='flex flex-wrap gap-4'>
                                    {client.contacts.length !== 0 ?

                                        client.contacts.map(contact => <Contact key={contact.id} {...contact} />)

                                        :

                                        <p className='text-xl w-full h-[90%] flex justify-center items-center'>No Client Contacts</p>
                                    }
                                </div>

                                </div>
                            </div>
                            {/* Client Projects */}
                            <div className='w-full h-[45%] border-t '>
                                <div className='h-[10%] flex flex-row gap-4 items-center bg-ocean text-white p-1'>
                                    <p>Client Projects</p>
                                    <p className='bg-white text-black '></p>
                                </div>
                                <div className='w-full h-[90%] scrollbar overflow-y-scroll scrollbar-thumb-ocean'>
                                    <div className='flex flex-col flex-wrap gap-4 p-4'>

                                        {
                                            client.projects.length !== 0 ?

                                            client.projects
                                            .map(project => <Project key={project.id} {...project} />)

                                            :

                                            <p className='text-xl w-full h-[90%] flex justify-center items-center'>No Current Projects</p>


                                        }
                                    </div>

                                </div>
                            </div>
                        </div>

                    :

                    <div className='w-full h-full flex justify-center items-center'>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress size="125px" color='ocean' />
                        </Box>
                    </div>

                }
            </div>

            :

            <NavLink to={`/clients/${id}`} className='flex flex-col items-center justify-center size-[200px] sm:w-[175px] sm:h-[225px] lg:w-[250px] lg:h-[275px]'>
                {client_img ?
                    <img
                    src={client_img}
                    className='rounded-[100%] border size-[100px] sm:w-[150px] sm:h-[150px] object-cover'
                    alt='client'
                    />

                    :
                    <div className='rounded-[100%] border size-[100px] sm:w-[150px] sm:h-[150px] flex justify-center items-center'>
                        <img src='/orka.png' className='size-[100px] object-cover' />
                    </div>
                }
                <p className='text-md sm:text-2xl truncate'>{name ? name : 'UNNAMED'}</p>
                {/* <p className='text-md sm:text-lg'>{projects ? projects.filter(project => project.id === id).length : '0'} Active Projects</p> */}
            </NavLink>

        }

{
                editClient ?

                <Formik
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                    >
                        <Form
                        className=' fixed inset-0 flex flex-col justify-center items-center transition-colors backdrop-blur '
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                        >
                            <div className='bg-white  border h-[700px] w-[350px] lg:h-[80%] lg:w-[40%] '>
                                <div className='h-[5%] w-full flex items-center mb-2'>
                                    <CloseIcon  style={{width: '40px', height: '40px'}} onClick={handleEditClient} />
                                    <label className='ml-2 mt-1 text-2xl'> Edit Client </label>
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
                                                                    className='rounded-[100%] h-[125px] w-[125px] object-cover border'
                                                                    src={files[0].preview}
                                                                    alt='client'
                                                                />

                                                            :
                                                                <div className='rounded-[100%] h-[125px] w-[125px] bg-ocean flex items-center text-white'>
                                                                    <UploadFileIcon style={{width:'35px', height:'35px'}} />
                                                                    <div className='flex flex-col justify-center text-xs'>
                                                                        <p className='text-sm'>Update Img</p>
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


                            </div>

                            <button type='submit' className='bg-black w-[350px] lg:w-[40%] mt-3 text-white h-[50px] hover:text-ocean'> Update Client </button>


                        </Form>

                </Formik>

                :

                <>
                </>
            }

            {/* Delete Client  Modal */}
        {
            deleteClient &&

            <div className=' fixed inset-0 flex flex-col justify-center items-center transition-colors backdrop-blur-sm '>
                <div className='bg-white size-[50%] border text-2xl flex flex-col justify-center gap-4'>
                    <div>

                        <p className='text-center text-2xl'> Are you sure you want to delete the client {client && client.name}?</p>
                        <p className='text-center text-lg'>**All related projects and contacts will also be deleted</p>

                    </div>

                    <div className='flex flex-row justify-center items-center gap-6'>
                        <div className='bg-ocean hover:bg-black text-white px-4 py-2' onClick={handleDeleteClientPage}>
                            NO
                        </div>

                        <div className='bg-blocked hover:bg-black text-white px-4 py-2' onClick={handleDeleteClient}>
                            YES
                        </div>
                    </div>

                </div>
            </div>


        }



        </>

    )
}

export default Client