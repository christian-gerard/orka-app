import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink, useParams, useNavigate, useLocation } from 'react-router-dom'
import Task from '../components/Task'
import Expense from '../components/Expense'
import { object, string, array, number, bool } from "yup";
import { useFormik, Formik, Form, Field } from 'formik'
import { toast } from 'react-hot-toast'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import User from '../components/User'
import axios from 'axios'

function Project({id, name, deadline, description, project_type, project_budget}) {

    const { accessToken, accountTasks, renderTasks, projects, setProjects, API_URL} = useContext(UserContext)
    const nav = useNavigate()
    const route = useParams()
    const path = useLocation()
    const [project, setProject] = useState(null)
    const [clients, setClients] = useState(null)
    const [users, setUsers] = useState(null)
    const [editProject, setEditProject] = useState(false)
    const [deleteProject, setDeleteProject] = useState(false)
    const [editProjectUsers, setEditProjectUsers] = useState(false)
    const [isAddUser, setIsAddUser] = useState(null)
    const token = accessToken

    const executeDeleteProject = () => {

        axios.delete(`${API_URL}/api/projects/${route.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {
            if(resp.status == 204){
                toast.success("Project Deleted")
                nav('/projects')
                handleDeleteProject()

            } else if(resp.status == 401){
                toast.error('Unauthorized')
            }
        })
        .catch(err => {
            console.error(err)
            throw err
        })

    }

    const renderClients = () => {

        const token = accessToken
        let clientData = null


        axios.get(`${API_URL}/api/clients/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {

            if(resp.status == 200){
                clientData = resp.data
                if(clientData && clientData.length !== 0) {
                    setClients(
                        clientData
                        .map(client => <option value={client.id}>{client.name}</option> )
                    )
                }
            } else if (resp.status == 401){
                toast.error('Unauthorized')
            }
        })
    }

    const renderUsers = () => {
        const token = accessToken
        let userData = null


        axios.get(`${API_URL}/api/user/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {

            if(resp.status == 200){
                userData = resp.data
                if(userData && userData.length !== 0) {
                    setUsers(userData)
                }
            } else if (resp.status == 401){
                toast.error('Unauthorized')
            }
        })

    }

    const handleProjectUsers = () => {
        const projectUsers = project.users.map(user => user.id)
        userFormik.setFieldValue('users', projectUsers)
        setEditProjectUsers(!editProjectUsers)
    }

    const handleEditProject = () => {
        setEditProject(!editProject)
        formik.resetForm()
        formik.setValues(initialValues)
    }

    const handleDeleteProject = () => {

        setDeleteProject(!deleteProject)




    }

    const today = new Date().toISOString().split('T')[0];

    const projectSchema = object({
        name: string()
        .required('Please provide a name'),
        description: string(),
        deadline: string()
        .required("Please provide a deadline")
        .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            "Date must be in the format YYYY-MM-DD"
        )
        .test(
            'is-today-or-later',
            "The deadline cannot be before today",
            (value) => {
                // Only validate if value is in the correct format
                if (!value) return false;
                return value >= today;
            }
        ),
        projectType: string()
        .required('Please provide the project type'),
        projectBudget: string()
        .required("Please provide the project's budget")
        .matches(
            /^\d+(\.\d{1,2})?$/,
            "Please enter a valid budget with up to two decimal places (e.g., 12345.67)"
        ),
    });

    const initialValues = {
        name: project && project.name,
        description: project && project.description,
        deadline: project && project.deadline,
        projectType: project && project.project_type,
        projectBudget: project && project.project_budget,
        client: project && project.client,
        tasks: {},
        users: {}
    }

    const userInit = {
        users: []
    }


    const formik = useFormik({
        initialValues,
        validationSchema: projectSchema,
        onSubmit: (formData) => {

        const requestData = {
            name: formData.name,
            description: formData.description,
            deadline: formData.deadline,
            budget:formData.budget,
            project_type: formData.projectType,
            project_budget: formData.projectBudget,
            client: formData.client
        }

        axios.patch(`${API_URL}/api/projects/${route.id}/`, requestData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then( resp => {
            if(resp.status == 200){
                setProject(resp.data)
                handleEditProject()
                toast.success("Project Updated")
            } else if(resp.status == 401) {
                toast.error('Not Authorized: Please login again')
            } else {
                toast.error('ERROR: Please Try Again')
            }
        })
        .catch(err => {
            console.error(err)
            toast.error('Error: Something Occured during Update')
        })



        }
    })

    const userFormik = useFormik({
        initialValues: userInit,
        onSubmit: (formData) => {

        console.log(project)

        const requestData = {
            user: formData.users
        }


            axios.post(`${API_URL}/api/projects/${route.id}/update-users/`, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then( resp => {
                if(resp.status == 200){
                    console.log(resp.data)
                    setProject({ ...project, users: [...resp.data]})
                    handleProjectUsers()
                    toast.success("Users Updated")
                } else if(resp.status == 401) {
                    toast.error('Not Authorized: Please login again')
                } else {
                    toast.error('ERROR: Please Try Again')
                }
            })
            .catch(err => {
                console.error(err)
                toast.error('Error: Something Occured during Update')
            })




        }
    })


    useEffect(() => {

        if(route.id !== undefined && path.pathname.includes('projects')) {

            axios.get(`${API_URL}/api/projects/${route.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp => {
                if(resp.status == 200){
                    setProject(resp.data)
                } else if(resp.status == 401){
                    toast.error('Unauthorized')
                }
            })
            .catch(err => {
                console.error(err)
                throw err
            })

            renderUsers()


        }
        renderTasks()


    }, [route.id])




    return(
        <>

        {
            route.id && path.pathname.includes('projects') ?

            <div className='h-full w-full border'>

                {/* Project Back + Edit + Delete */}
                <div className='h-[5%] flex flex-row justify-between p-2 bg-black text-white items-center'>

                    <div>

                    <NavLink to='/projects'>
                        <ArrowBackIcon style={{ width: '40px', height: '40px' }} className='hover:bg-white hover:text-black'/>
                    </NavLink>


                    </div>

                    <div className='flex gap-2'>


                        <NavLink onClick={handleDeleteProject}>
                            <DeleteIcon style={{ width: '40px', height: '40px' }} className='hover:bg-white hover:text-black' onClick={handleDeleteProject}/>
                        </NavLink>


                        <NavLink onClick={handleEditProject}>
                            <EditIcon style={{ width: '40px', height: '40px' }} className='hover:bg-white hover:text-black'/>
                        </NavLink>

                    </div>


                </div>

                { project ?


                    <div className=' h-[95%] w-full text-[0.8em] sm:text-lg'>

                        {/* Project Title and Type */}
                        <div className='h-[6%] flex flex-row justify-between items-end p-2 bg-black text-white'>

                            <p className='text-5xl flex items-center'>{project.name ? project.name : "name not known"}</p>
                            <p className='text-2xl flex items-center'>{project.project_type ? project.project_type : "name not known"}</p>

                        </div>

                        {/* Project Body */}
                        <div className='h-[94%] w-full'>
                            {/* Upper Half */}
                            <div className='h-[40%] flex flex-col sm:flex-row'>
                                {/* Left */}
                                <div className='w-[50%] h-full'>
                                    {/* Project Details */}
                                    <div className='h-[20%] flex flex-row gap-4 px-4'>
                                        {/* Project Client */}
                                        <NavLink to={`/clients/${project.client.id}`} className='w-[50%] hover:bg-ocean flex items-center gap-2 p-1 text-3xl'>
                                            {project.client.client_img &&
                                                <img
                                                src={project.client.client_img}
                                                className='rounded-[100%] bg-white border border-black size-[60px] object-cover'
                                                alt='client'
                                                />
                                            }
                                            {project.client ? project.client.name: "Description Not Listed"}
                                        </NavLink>

                                        {/* Project Deadline*/}
                                        <div className='w-[50%] flex justify-end items-center text-3xl'>{project.deadline ? project.deadline.slice(5,10) : "Description Not Listed"}</div>

                                    </div>
                                    {/* Project Description */}
                                    <div className='h-[80%] border-t text-black p-2'>
                                        {project.description ? project.description : "Description Not Listed"}
                                    </div>
                                </div>
                                {/* Right */}
                                <div className='w-[50%] h-full'>
                                    {/* Project Users */}
                                    <div className='sm:h-full w-full'>
                                        <div className='flex flex-row items-center justify-between w-full h-[10%] bg-ocean text-white '>
                                            <div className=' flex flex-row gap-4 items-center text-white p-1'>
                                                <p>Assigned Users</p>
                                                <p className='bg-white text-black '>{project.users.length !== 0 ? project.users.length : ""}</p>
                                            </div>
                                            <div className='hover:bg-white hover:text-ocean text-base' onClick={handleProjectUsers}>

                                                    {editProjectUsers ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />} <EditIcon />

                                            </div>
                                        </div>

                                        <div className='relative h-[90%] w-full overflow-y-scroll scrollbar scrollbar-track-border-r scrollbar-thumb-ocean border-l border-black p-1 flex flex-col gap-1 p-2'>

                                            {project.users ?

                                                project.users.sort((a, b) => a.first_name.localeCompare(b.first_name)).map(user => <User key={user.id} {...user} />)

                                                :

                                                <p className='text-xl w-full h-full flex justify-center items-center'>No Current Users</p>
                                            }

                                            {
                                                editProjectUsers ?

                                                <Formik
                                                    onSubmit={userFormik.handleSubmit}
                                                    initialValues={initialValues}
                                                >
                                                    <Form
                                                    className='absolute h-[90%] inset-0 flex flex-col justify-center items-center transition-colors backdrop-blur-sm '
                                                    onSubmit={userFormik.handleSubmit}
                                                    initialValues={userInit}
                                                    >
                                                        <div className='size-[80%] bg-white border p-2 flex flex-col gap-2'>
                                                            {/* Title + Buttons */}
                                                            <div className='h-[10%] flex flex-row justify-between items-center'>
                                                                <div>
                                                                    <p>Add/Remove Users</p>
                                                                </div>

                                                                <div className='flex flex-row bg-black text-white hover:bg-ocean hover:text-black' onClick={userFormik.handleSubmit}>
                                                                    <p>Update</p>
                                                                </div>

                                                            </div>

                                                            {/* User List */}
                                                            <div className='h-[90%] flex flex-col'>

                                                                <Field
                                                                    name='users'
                                                                    as='select'
                                                                    multiple
                                                                    value={userFormik.values.users}
                                                                    onChange={(e) => {
                                                                        const selectedUserId = parseInt(e.target.value); // Get the selected user ID
                                                                        const currentUsers = userFormik.values.users;

                                                                        // Toggle the selected user ID in the users array
                                                                        if (currentUsers.includes(selectedUserId)) {
                                                                            // If already selected, remove it
                                                                            userFormik.setFieldValue(
                                                                                'users',
                                                                                currentUsers.filter((id) => id !== selectedUserId)
                                                                            );
                                                                        } else {
                                                                            // If not selected, add it
                                                                            userFormik.setFieldValue('users', [...currentUsers, selectedUserId]);
                                                                        }
                                                                    }}
                                                                    onBlur={userFormik.handleBlur}
                                                                    className='border h-full'
                                                                >
                                                                    {
                                                                        users && users.sort((a, b) => a.first_name.localeCompare(b.first_name)).map(user => <option value={user.id}>{user.first_name} {user.last_name}</option>)

                                                                    }

                                                                </Field>

                                                            </div>


                                                        </div>

                                                    </Form>

                                                </Formik>

                                                :

                                                <>
                                                </>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Bottom Half */}
                            <div className='h-[60%] flex flex-row'>
                                {/* Tasks */}
                                <div className=' h-full w-full'>
                                <div className='w-full h-[10%] bg-ocean flex gap-4 items-center text-white border-y border-black p-1'>
                                    <p>Tasks</p>
                                </div>
                                <div className='h-full flex flex-col gap-2 p-2 overflow-y-scroll'>

                                    {
                                        accountTasks && accountTasks.length !== 0 ?

                                        accountTasks
                                        // .filter(task => task.project_name === name)
                                        .map(task => <Task key={task.id} {...task} />)

                                        :

                                        <p className='text-md sm:text-xl w-full h-full flex justify-center items-center'>No Current Tasks</p>

                                    }


                                </div>

                                </div>
                            </div>
                        </div>

                    </div>



                    :

                    // Project  Loading
                    <div className='w-full h-full flex justify-center items-center'>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress size="125px" color='ocean' />
                        </Box>
                    </div>

                }



            </div>

            :

            // Project Card
            <NavLink to={`/projects/${id}`} className='' >
                <div className='h-[150px] p-2 border'>

                    {/* Project Box Header */}
                    <div className='text-2xl flex flex-row justify-between items-center h-[50%] border-b text-white bg-black p-2'>
                        <p className='text-[0.8em] sm:text-xl'>{name ? name : 'Untitled'}</p>
                        <p className='text-[0.8em] sm:text-lg'>{deadline ? deadline.slice(5,12) : 'No Deadline'}</p>
                    </div>

                    {/* Project Details */}
                    <div className='flex flex-col justify-between h-[50%]'>

                        <div className='flex flex-row justify-between'>
                            <p className='text-[0.8em] sm:text-lg'>
                                {project_type ? project_type : 'No Type'}
                            </p>
                            <p className='text-[0.8em] sm:text-lg'>
                                ${project_budget ? project_budget : 'No Budget'}
                            </p>

                        </div>
                    </div>

                </div>
            </NavLink>



        }

        {/* Delete Projct  Modal */}
        {
            deleteProject &&

            <div className=' fixed inset-0 flex flex-col justify-center items-center transition-colors backdrop-blur-sm '>
                <div className='bg-white size-[50%] border text-2xl flex flex-col justify-center gap-4'>
                    <div>

                        <p className='text-center text-2xl'> Are you sure you want to delete the project {project && project.name}?</p>
                        <p className='text-center text-lg'>**All related tasks, budgets, and expenses will also be deleted</p>

                    </div>

                    <div className='flex flex-row justify-center items-center gap-6'>
                        <div className='bg-ocean hover:bg-black text-white px-4 py-2' onClick={handleDeleteProject}>
                            NO
                        </div>

                        <div className='bg-blocked hover:bg-black text-white px-4 py-2' onClick={executeDeleteProject}>
                            YES
                        </div>
                    </div>

                </div>
            </div>


        }

        {/* Edit Project Modal */}

            {
                editProject ?

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
                            <CloseIcon  style={{width: '40px', height: '40px'}} onClick={handleEditProject} />
                            <label className='ml-2 mt-1 text-2xl'> Edit Project </label>

                        </div>

                        <div className='h-[95%] w-full flex flex-col lg:gap-2 overflow-scroll scrollbar scrollbar-thumb-ocean'>
                            <label className='ml-2'> Name </label>
                            <Field
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='text'
                                placeholder='Name'
                                className='border m-2 p-2'
                            />

                            {formik.errors.name && formik.touched.name && (
                                <div className="text-sm text-red ml-2"> **{formik.errors.name}</div>
                            )}



                            <label className='ml-2'> Deadline </label>
                            <Field
                                name='deadline'
                                type='date'
                                min="2024-01-01"
                                max="2025-12-31"
                                value={formik.values.deadline}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='Deadline'
                                className='border m-2 p-2'
                            />

                            {formik.errors.deadline && formik.touched.deadline && (
                                <div className="text-sm text-red ml-2"> **{formik.errors.deadline.toUpperCase()}</div>
                            )}

                            <label className='ml-2'> Budget </label>
                            <div className='flex flex-row items-center'>
                                <p className='text-xl w-[5%] text-right'>$</p>

                                <Field
                                    name='projectBudget'
                                    value={formik.values.projectBudget}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    onKeyDown={(e) => {
                                        // Allow only numbers, period, backspace, and delete keys
                                        if (
                                            !(
                                                (e.key >= '0' && e.key <= '9') || // Numbers
                                                e.key === '.' || // Decimal point
                                                e.key === 'Backspace' || // Backspace
                                                e.key === 'Delete' || // Delete
                                                e.key === 'ArrowLeft' || // Left arrow key
                                                e.key === 'ArrowRight' // Right arrow key
                                            )
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                    type='text'
                                    placeholder='0.00'
                                    className='border m-2 p-2 w-[90%]'
                                />
                            </div>

                            {formik.errors.projectBudget && formik.touched.projectBudget && (
                                <div className="text-sm text-red ml-2"> **{formik.errors.projectBudget}</div>
                            )}


                            <label className='ml-2'> Type </label>
                            <Field
                                name='projectType'
                                as='select'
                                value={formik.values.projectType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='text'
                                placeholder='Status'
                                className='border m-2 p-2'
                            >
                                <option value=''>Select Type</option>
                                <option value='Social Media'>Social Media</option>
                                <option value='ReBrand'>ReBrand</option>
                                <option value='Consulting'>Consulting</option>
                                <option value='Video'>Video</option>

                            </Field>


                            {formik.errors.budget && formik.touched.budget && (
                                <div className="text-sm text-red ml-2"> **{formik.errors.budget.toUpperCase()}</div>
                            )}

                            <label className='ml-2'> Client </label>
                            <Field
                                name='client'
                                as='select'
                                value={formik.values.client}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='border m-2 p-2'
                            >
                                <option value=''>Select Client</option>
                                {
                                    clients
                                }

                            </Field>

                            {formik.errors.budget && formik.touched.budget && (
                                <div className="text-sm text-red ml-2"> **{formik.errors.budget.toUpperCase()}</div>
                            )}

                            <label className='ml-2'> Description </label>
                            <Field
                                name='description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                as='textarea'
                                placeholder='Description'
                                className='border m-2 p-2 min-h-[100px] lg:h-[200px]'
                            />

                            {formik.errors.description && formik.touched.description && (
                                <div className="text-sm text-red ml-2"> **{formik.errors.description.toUpperCase()}</div>
                            )}

                        </div>


                    </div>

                    <button type='submit' className='bg-black w-[350px] lg:w-[40%] mt-3 text-white h-[50px] hover:text-ocean'> Update Project </button>


                </Form>

                </Formik>

                :

                    <>
                    </>

            }
        </>
    )
}

export default Project