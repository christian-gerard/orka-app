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
import Project from '../components/Project'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

function Client({ id, name}) {
    const route = useParams()
    const nav = useNavigate()
    const {  accessToken } = useContext(UserContext)
    const [client, setClient] = useState(null)
    const [editClient, setEditClient] = useState(false)

    const token = accessToken

    const handleEditClient = () => {
        setEditClient(!editClient)
        formik.setValues(initialValues)
    }

    const handleDeleteClient = () => {
        axios.delete(`${API_URL}/api/clients/${route.id}`, {
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
        account: client ? client.account : null,
    }

    const formik = useFormik({
        initialValues,
        validationSchema: clientSchema,
        onSubmit: (formData) => {


            axios.patch(`${API_URL}/api/clients/${route.id}`, formData, {
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

            axios.get(`/api/clients/${route.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(resp => {
                if(resp.status == 200){
                    setClient(resp.data)
                }
            })


        }


    },[route.id])

    console.log(client)

    return(
        <>

        {
            route.id ?

            <div className='border w-full h-full'>

                <div className='h-[5%] flex flex-row justify-between'>

                <div>

                    <NavLink to='/clients'>
                        <ArrowBackIcon style={{ width: '45px', height: '45px' }}/>
                    </NavLink>

                </div>

                <div className='flex gap-2'>


                    <NavLink onClick={handleDeleteClient}>
                        <DeleteIcon style={{ width: '45px', height: '45px' }}/>
                    </NavLink>


                    <NavLink onClick={handleEditClient}>
                        <EditIcon style={{ width: '45px', height: '45px' }}/>
                    </NavLink>

                </div>


                </div>

                {
                    client ?

                        <div className='w-full h-[95%] flex flex-col'>

                            <div className='flex flex-row justify-between h-[10%]'>

                                <p className='text-4xl'>{client.name ? client.name : 'No Name'}</p>

                                <p className='text-2xl'>{client.industry ? client.industry : 'Industry Not Listed'}</p>

                            </div>

                            <div className=' scrollbar-thumb-ocean border-t h-[45%] w-full  scrollbar-thumb-ocean'>
                                <div className=' flex flex-row gap-4 items-center bg-ocean text-white p-1'>
                                    <p>Contacts</p>
                                    <p className='bg-white text-black '></p>
                                </div>
                                {client.contacts ?

                                    client.contacts.map(contact =>
                                        <div className='flex flex-row border'>
                                            <div className='px-2'>
                                                <p>{contact ? contact.first_name: "NONE"}</p>
                                            </div>

                                            <div className='px-2'>

                                            </div>

                                        </div>
                                    )

                                    :

                                    <div className='w-full h-[95%] flex flex-col items-center'>



                                    </div>

                                }
                            </div>

                            <div className='w-full h-[45%] border-t scrollbar overflow-y-scroll scrollbar-thumb-ocean'>
                                <div className=' flex flex-row gap-4 items-center bg-ocean text-white p-1'>
                                    <p>Client Projects</p>
                                    <p className='bg-white text-black '></p>
                                </div>
                                {
                                    client.projects ?

                                    client.projects
                                    .filter(project => project.client === client.id)
                                    .map(project => <Project key={project.id} {...project} />)

                                    :

                                    <p className='text-xl w-full flex justify-center items-center'>No Projects</p>


                                }
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

            <NavLink to={`/clients/${id}`} className='flex flex-col items-center justify-center size-[200px] sm:w-[175px] sm:h-[225px] lg:w-[250px] lg:h-[275px] '>
                <div className='rounded-[100%] border size-[100px] sm:w-[150px] sm:h-[150px] bg-ocean'>
                </div>
                <p className='text-md sm:text-2xl'>{name ? name : 'UNNAMED'}</p>
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
                                    <label className='ml-2'> Industry </label>
                                    <Field
                                        name='industry'
                                        type='text'
                                        value={formik.values.industry}
                                        onChange={formik.handleChange}
                                        placeholder='industry'
                                        className='border m-2 p-2'
                                    />
                                    {formik.errors.industry && formik.touched.industry && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.industry.toUpperCase()}</div>
                                    )}
                                    <label className='ml-2'> EIN </label>
                                    <Field
                                        name='ein'
                                        type='text'
                                        value={formik.values.ein}
                                        onChange={formik.handleChange}
                                        placeholder='ein'
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
                                        placeholder='address'
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
                                        placeholder='city'
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
                                        placeholder='zip_code'
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



        </>

    )
}

export default Client