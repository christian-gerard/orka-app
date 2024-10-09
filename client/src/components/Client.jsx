import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik, Formik, Form, Field } from 'formik'
import { object, string, array, number, bool } from "yup";
import CloseIcon from '@mui/icons-material/Close';
import Project from '../components/Project'

function Client({ id, name}) {
    const route = useParams()
    const { clients, setClients, token, projects } = useContext(UserContext)
    const [currentClient, setCurrentClient] = useState(null)
    const [editClient, setEditClient] = useState(false)

    const handleEditClient = () => {
        setEditClient(!editClient)
        formik.setValues(initialValues)
    }

    const handleDeleteClient = () => {
        fetch(`/api/account/clients/${route.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            credentials: 'include',
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
        name: currentClient ? currentClient.name : '',
        description: currentClient ? currentClient.description : '',
        industry: currentClient ? currentClient.industry : '',
        ein: currentClient ? currentClient.ein : '',
        address_one: currentClient ? currentClient.address_one : '',
        address_two: currentClient ? currentClient.address_two : '',
        city: currentClient ? currentClient.city : '',
        state: currentClient ? currentClient.state : '',
        zip_code: currentClient ? currentClient.zip_code : '',
        account: 1
    }

    const formik = useFormik({
        initialValues,
        validationSchema: clientSchema,
        onSubmit: (formData) => {


            fetch('/api/account/clients/', {
                method: "PATCH",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                credentials: 'include',
            })
            .then(resp => {
                if(resp.ok){

                    handleEditClient()



                }
            })



        }
    })

    useEffect(() => {

        if(route.id !== undefined){

            fetch(`/api/account/clients/${route.id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                credentials: 'include',
            })
            .then(resp => {
                if(resp.ok){
                    return resp.json().then( data => {
                        setCurrentClient(data)
                    })
                }
            })


        }


    },[route.id])

    console.log(currentClient)

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
                    currentClient ?

                        <div className='w-full h-[95%] px-6 flex flex-col'>

                            <div className='flex flex-row justify-between h-[10%]'>

                                <p className='text-4xl'>{currentClient.name ? currentClient.name : 'No Name'}</p>

                                <p className='text-2xl'>{currentClient.type ? currentClient.type : 'No Type'}</p>

                            </div>

                            <div className='w-full h-[15%] border'>
                                <h1>Current Projects</h1>
                                {
                                    projects ?

                                    // projects.map(project => <Project key={project.id} {...project} />)
                                    <></>

                                    :

                                    <p>No Projects</p>


                                }
                            </div>



                            <div className='overflow-scroll scrollbar scrollbar-thumb-ocean h-[15%] overflow-scroll scrollbar scrollbar-thumb-ocean border'>
                                <p>Assigned Users</p>
                                {currentClient.users ?

                                    currentClient.users.map(user =>
                                        <div className='flex flex-row border'>
                                            <div className='px-2'>
                                                <p>{user.first_name} {user.last_name}</p>
                                            </div>

                                            <div className='px-2'>
                                                <p>{user.email}</p>
                                            </div>

                                        </div>
                                    )

                                    :

                                    "no current users"

                                }
                            </div>

                            <div className='overflow-scroll scrollbar scrollbar-thumb-ocean h-[60%] w-full overflow-scroll scrollbar scrollbar-thumb-ocean border'>
                                <p>Contacts</p>
                                {currentClient.contacts ?

                                    currentClient.contacts.map(contact =>
                                        <div className='flex flex-row border'>
                                            <div className='px-2'>
                                                <p>{contact ? contact.first_name: "NONE"}</p>
                                            </div>

                                            <div className='px-2'>

                                            </div>

                                        </div>
                                    )

                                    :

                                    "no current contacts"

                                }
                            </div>

                        </div>

                    :

                    <div>
                        <h1>Loading</h1>
                    </div>

                }
            </div>

            :

            <NavLink to={`/clients/${id}`} className='flex flex-col items-center justify-center w-[175px] h-[225px] lg:w-[250px] lg:h-[275px] '>
                <div className='rounded-[100%] border w-[150px] h-[150px] bg-ocean'>
                </div>
                <p className='text-2xl'>{name ? name : 'UNNAMED'}</p>
                <p className='text-lg'>{projects ? projects.filter(project => project.id === id).length : '0'} Active Projects</p>
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