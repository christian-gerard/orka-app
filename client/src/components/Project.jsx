import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink, useParams, useNavigate, useLocation } from 'react-router-dom'
import Task from '../components/Task'
import Expense from '../components/Expense'
import { object, string, array, number, bool } from "yup";
import { useFormik, Formik, Form, Field } from 'formik'
import { toast } from 'react-hot-toast'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios'

function Project({id, name, deadline, description, project_type, project_budget}) {

    const { accessToken, tasks, projects, setProjects} = useContext(UserContext)
    const nav = useNavigate()
    const route = useParams()
    const path = useLocation()
    const [project, setProject] = useState(null)
    const [editProject, setEditProject] = useState(false)
    const token = accessToken

    const handleEditProject = () => {
        setEditProject(!editProject)
        formik.resetForm()
        formik.setValues(initialValues)
    }

    const handleDeleteProject = () => {
        axios.delete(`/api/projects/${route.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {
            if(resp.status == 204){
                toast.success("Project Deleted")
                nav('/projects')
            } else if(resp.status == 401){
                toast.error('Unauthorized')
            }
        })
        .catch(err => {
            console.error(err)
            throw err
        })


    }

    const projectSchema = object({
        name: string(),
        // .required('Please provide a project name'),
        description: string(),
        deadline: string(),
        // .required(),
        projectType: string(),
        // .required('Please provide the project type'),
        budget: number(),
        // .required('Please provide a project budget')
      });

    const initialValues = {
        name: project ? project.name : '',
        description: project ? project.description : '',
        deadline: project ? project.deadline : '',
        projectType: project ? project.projectType : '',
        budget: project ? project.budget : ''
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
            client: formData.client
        }

        // fetch(`/api/account/projects/${route.id}`, {
        //     method: "PATCH",
        //     body: JSON.stringify(requestData),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Token ${token}`
        //     },
        //     credentials: 'include',
        // })
        // .then(resp => {
        //     if(resp.ok){
        //         return resp.json().then(data => {

        //             setProject(data)
        //             handleEditProject()

        //         })
        //     }
        // })
        // .catch( err => console.log(err))



        }
    })


    useEffect(() => {

        if(route.id !== undefined && path.pathname.includes('projects')) {

            axios.get(`/api/projects/${route.id}`, {
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

        }



    }, [route.id])

    console.log(project)

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
                            <DeleteIcon style={{ width: '40px', height: '40px' }} className='hover:bg-white hover:text-black'/>
                        </NavLink>


                        <NavLink onClick={handleEditProject}>
                            <EditIcon style={{ width: '40px', height: '40px' }} className='hover:bg-white hover:text-black'/>
                        </NavLink>

                    </div>


                </div>

                { project ?


                    <div className=' h-[95%] w-full text-[0.8em] sm:text-lg'>

                        {/* Project Title and Deadline */}
                        <div className='h-[6%] flex flex-row justify-between items-end p-2 bg-black text-white'>

                            <p className='text-5xl flex items-center'>{project.name ? project.name : "name not known"}</p>


                        </div>

                        {/* Project Body */}
                        <div className='h-[94%] w-full'>
                            {/* Upper Half */}
                            <div className='h-[40%] flex flex-col sm:flex-row'>
                                {/* Left */}
                                <div className='w-[60%] h-full'>
                                    {/* Project Details */}
                                    <div className='h-[20%]'>
                                        {/* Project Client */}
                                        <div className=''>{project.client ? project.client : "Description Not Listed"}</div>

                                        {/* Project Type */}
                                        <div className=''>{project.project_type ? project.project_type : "Description Not Listed"}</div>

                                    </div>
                                    {/* Project Description */}
                                    <div className='h-[80%] border-t text-black'>
                                        {project.description ? project.description : "Description Not Listed"}
                                    </div>
                                </div>
                                {/* Right */}
                                <div className='w-[40%] h-full'>
                                    {/* Project Users */}
                                    <div className='sm:h-full w-full'>
                                        <div className='w-full h-[10%] bg-ocean flex items-center justify-between text-white border-l border-b border-black  p-1'>
                                            <p>Assigned Users</p>
                                            <div>
                                                <RemoveIcon className='hover:bg-white hover:text-ocean'/>
                                                <AddIcon className='hover:bg-white hover:text-ocean'/>
                                            </div>
                                        </div>
                                        <div className='h-full overflow-scroll scrollbar scrollbar-track-border-r scrollbar-thumb-ocean border-l border-black p-1 flex flex-col gap-1 p-2'>

                                        {project.users ?

                                            project.users.map(user =>
                                                <div key={user.id} className='flex flex-row border items-center justify-between'>


                                                    <div className='w-[50%] px-2 text-md sm:text-xl bold flex flex-nowrap flex-row'>
                                                        <p>{user.first_name} {user.last_name}</p>
                                                    </div>
                                                    <div className='w-[50%] px-2 bg-black text-white text-md sm:text-lg'>
                                                        <p>{user.email}</p>
                                                    </div>


                                                </div>
                                            )

                                            :

                                            <p className='text-xl w-full h-full flex justify-center items-center'>No Current Users</p>
                                        }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Bottom Half */}
                            <div className='h-[60%] flex flex-row'>
                                {/* Tasks */}
                                <div className=' h-full w-[60%]'>
                                <p className='w-full h-[10%] bg-ocean flex items-center border-y border-black text-white p-1'>Tasks</p>
                                    {
                                        project.tasks && project.tasks.length !== 0 ?

                                        project.tasks.map(task => <Task key={task.id} {...task} />)

                                        :

                                        <p className='text-md sm:text-xl w-full h-full flex justify-center items-center'>No Current Tasks</p>

                                    }
                                </div>
                                {/* Budgets */}
                                <div className='border-l h-full w-[40%]'>
                                <p className='w-full h-[10%] bg-ocean flex items-center text-white border-y border-black p-1'>Budgets</p>
                                    <div className='w-full h-[95%] flex flex-col items-center'>


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
                <div className='w-full h-[175px] p-2 border'>

                    {/* Project Box Header */}
                    <div className='flex flex-row justify-between h-[20%] border-b text-white bg-black p-1'>
                        <p className='text-[0.8em] sm:text-xl'>{name ? name.slice(0,30) : 'Untitled'}</p>
                        <p className='text-[0.8em] sm:text-lg'>{deadline ? deadline.slice(5,12) : 'No Deadline'}</p>
                    </div>

                    {/* Project Details */}
                    <div className='flex flex-col justify-between h-[80%]'>
                        <p className='scrollbar overflow-scroll text-[0.8em] sm:text-lg h-[75%]'>
                            {description ? description.slice(0,125) : "No Description Available"}
                        </p>
                        <p className='h-[25%] text-[0.8em] sm:text-lg'>
                            {project_type ? project_type : 'No Type'}
                        </p>
                    </div>

                </div>
            </NavLink>



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

                                    <label className='ml-2'> Deadline </label>
                                    <Field
                                        name='deadline'
                                        type='date'
                                        min="2024-01-01"
                                        max="2025-12-31"
                                        value={formik.values.deadline}
                                        onChange={formik.handleChange}
                                        placeholder='Deadline'
                                        className='border m-2 p-2'
                                    />

                                    {formik.errors.deadline && formik.touched.deadline && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.deadline.toUpperCase()}</div>
                                    )}
                                    <label className='ml-2'> Type </label>
                                    <Field
                                        name='projectType'
                                        as='select'
                                        value={formik.values.projectType}
                                        onChange={formik.handleChange}
                                        type='text'
                                        placeholder='Status'
                                        className='border m-2 p-2'
                                    >
                                        <option value=''>Select Type</option>
                                        <option value='Social Media'>Social Media</option>
                                        <option value='Commercial'>Commercial</option>

                                    </Field>

                                    {formik.errors.projectType && formik.touched.projectType && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.projectType}</div>
                                    )}

                                    <label className='ml-2'> Budget </label>
                                    <Field
                                        name='budget'
                                        type='number'
                                        value={formik.values.budget}
                                        onChange={formik.handleChange}
                                        placeholder='Budget'
                                        className='border m-2 p-2'
                                        min="1000"
                                        max="100000000"
                                    >

                                    </Field>

                                    {formik.errors.budget && formik.touched.budget && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.budget.toUpperCase()}</div>
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