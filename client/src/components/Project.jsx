import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import Task from '../components/Task'
import Expense from '../components/Expense'
import { object, string, array, number, bool } from "yup";
import { useFormik, Formik, Form, Field } from 'formik'
import { toast } from 'react-hot-toast'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

function Project({id, name, deadline, description, project_type}) {

    const { token, tasks, projects, setProjects} = useContext(UserContext)
    const nav = useNavigate()
    const route = useParams()
    const [currentProject, setCurrentProject] = useState(null)
    const [editProject, setEditProject] = useState(false)

    const handleEditProject = () => {
        setEditProject(!editProject)
        formik.resetForm()
        formik.setValues(initialValues)
    }

    const handleDeleteProject = () => {


        fetch(`/api/account/projects/${route.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            credentials: 'include',
        })
        .then(resp => {
            if(resp.status === 204){
                // const updatedProj = projects.filter(proj => proj.id !== id)
                // setProjects(updatedProj)
                toast.success('Project Deleted')
                nav('/projects')
            } else {
                toast.error("Unable to Delete Project")
            }
        })
        // .catch( err => console.log(err))


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
        name: currentProject ? currentProject.name : '',
        description: currentProject ? currentProject.description : '',
        deadline: currentProject ? currentProject.deadline : '',
        projectType: currentProject ? currentProject.projectType : '',
        budget: currentProject ? currentProject.budget : ''
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

        fetch(`/api/account/projects/${route.id}`, {
            method: "PATCH",
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            credentials: 'include',
        })
        .then(resp => {
            if(resp.ok){
                return resp.json().then(data => {

                    setCurrentProject(data)
                    handleEditProject()

                })
            }
        })
        .catch( err => console.log(err))



        }
    })


    useEffect(() => {

        if(route.id !== undefined){

            fetch(`/api/account/projects/${route.id}`, {
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
                        setCurrentProject(data)
                    })
                } else {
                    toast.error('Unable to Refresh')
                }
            })
            .catch( err => console.log(err))

        }



    }, [route.id])

    console.log(currentProject.tasks.length)


    return(
        <>

        {
            route.id ?

            <div className='h-full w-full border'>

                <div className='h-[5%] flex flex-row justify-between'>

                    <div>

                    <NavLink to='/projects'>
                        <ArrowBackIcon style={{ width: '45px', height: '45px' }}/>
                    </NavLink>


                    </div>

                    <div className='flex gap-2'>


                        <NavLink onClick={handleDeleteProject}>
                            <DeleteIcon style={{ width: '45px', height: '45px' }}/>
                        </NavLink>


                        <NavLink onClick={handleEditProject}>
                            <EditIcon style={{ width: '45px', height: '45px' }}/>
                        </NavLink>

                    </div>


                </div>

                { currentProject ?


                    <div className=' h-[95%] w-full '>

                        <div className='h-[10%] flex flex-row justify-between px-6'>

                            <p className='text-5xl flex items-center'>{currentProject.name ? currentProject.name : "name not known"}</p>
                            <p className='text-3xl flex items-center'>{currentProject.deadline ? currentProject.deadline.slice(5,12): "No Deadline"}</p>

                        </div>

                        <div className='bg-white h-[90%] w-full px-6'>

                            <div className='overflow-scroll scrollbar scrollbar-thumb-ocean h-[5%]'>
                                {currentProject.project_type ? currentProject.project_type : "Description Not Listed"}
                            </div>

                            <div className='overflow-scroll scrollbar scrollbar-thumb-ocean h-[10%]'>
                                {currentProject.description ? currentProject.description : "Description Not Listed"}
                            </div>

                            <div className='overflow-scroll scrollbar scrollbar-thumb-ocean h-[25%] overflow-scroll scrollbar scrollbar-thumb-ocean border'>
                                <p>Assigned Users</p>
                                {currentProject.users ?

                                    currentProject.users.map(user =>
                                        <div key={user.id} className='flex flex-row border items-center justify-between'>
                                            <div className='px-2 text-xl bold'>
                                                <p>{user.first_name} {user.last_name}</p>
                                            </div>

                                            <div className='px-2 underline bg-ocean text-white text-lg'>
                                                <p>{user.email}</p>
                                            </div>

                                        </div>
                                    )

                                    :

                                    <p className='text-xl w-full h-full flex justify-center items-center'>No Current Users</p>

                                }
                            </div>

                            <div className='border h-[60%] flex flex-row'>

                                <div className='border h-full w-[60%]'>
                                    <h1>Tasks</h1>
                                    {
                                        currentProject.tasks.length !== 0 ?

                                        currentProject.tasks.map(task => <Task key={task.id} {...task} />)

                                        :

                                        <p className='text-xl w-full h-full flex justify-center items-center'>No Current Tasks</p>

                                    }
                                </div>

                                <div className='border h-full w-[40%]'>
                                    <h1 className='w-full h-[5%]'>Budget</h1>
                                    <div className='w-full h-[95%] flex flex-col items-center'>

                                        <p className='text-xl w-full h-full flex justify-center items-center'>No Current Expenses</p>

                                    </div>
                                </div>

                            </div>




                        </div>

                    </div>



                    :

                    <p>LOADING</p>

                }



            </div>

            :

            <NavLink to={`/projects/${id}`}>
                <div className='w-full h-[150px] p-2 border'>

                    {/* Project Box Header */}
                    <div className='flex flex-row justify-between h-[20%] border-b'>
                        <p className='text-[0.8em] sm:text-xl'>{name ? name.slice(0,20) : 'Untitled'}</p>
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
                                        step='1000'
                                        min="100"
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