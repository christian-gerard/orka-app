import Project from '../components/Project'
import { NavLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { UserContext } from '../context/UserContext'
import { useFormik, Formik, Form, Field } from 'formik'
import { object, string, array, number } from "yup";
import DatePicker from 'react-date-picker'
import AddBoxIcon from '@mui/icons-material/AddBox';
import DetailsIcon from '@mui/icons-material/Details';
import CloseIcon from '@mui/icons-material/Close';


function Projects() {
    const { user, updateUser, projects } = useContext(UserContext)
    const [newProject, setNewProject] = useState(false)
    const [date, dateChange] = useState(null)

    const projectSchema = object({
        name: string()
        .required(),
        type: string()
        .required(),
        status: string()
        .required(),
        deadline: string()
        .required(),
        client: number()
        .required(),
        budget: number()
        .required()
    });

    const initialValues = {
        name: '', 
        type: '',
        deadline: '', 
        status: '', 
        client: '',
        budget: 0,
    }

    const formik = useFormik({
        initialValues,
        validationSchema: projectSchema,
        onSubmit: (formData) => {

            fetch('http://127.0.0.1:5555/project/', {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${user.token}`
                }
            })
            .then(resp => {
                if(resp.ok){

                    return resp.json().then(data => {
                        const updatedUser = {
                            ...user,
                            user: {
                                ...user.user,
                                account_details: {
                                    ...user.user.account_details,
                                    clients: user.user.account_details.clients.map(client => {
                                        if(client.id === data.client) {
                                            return {
                                                ...client,
                                                projects: [...client.projects, data]
                                            };
                                        }
                                        return client;
                                    })
                                }
                            }
                        };

                        updateUser(updatedUser)

                        handleNewProject()
                        toast.success("Project Added")

                    })



                }
            })
    
        },
    });

    const handleNewProject = () => {
        setNewProject(!newProject)
    }

    const clients = user.user.account_details.clients.map(client => {
        return <option value={client.id}>{client.name}</option>
    })

    return (
 
        <div className='flex flex-col w-full h-full overflow-hidden'>

            {/* Page Header */}
            <div className='flex flex-row items-center justify-between mb-2 h-[5%]'>
                <div className='flex flex-row items-center'>
                    <DetailsIcon fontSize='small' />
                    <p className='text-lg ml-2'>Projects</p>
                </div>

                <div>
                    <AddBoxIcon fontSize='medium' onClick={handleNewProject}/>
                </div>
            </div>

            {/* Projects */}
            <div className='border border-[0.2px] h-[95%] overflow-y-scroll'>

               {projects.length !== 0 ?

                projects.map(project => {
                    return <Project id={project.id} {...project} />
                })
               
            
                :
                
                <div className='h-full w-full flex justify-center items-center'>

                    <h1 className='text-3xl italic mx-2'> No Current Projects </h1>

                </div>
                
                }



            </div>

            {
                newProject ?

                <div className='fixed inset-0 flex flex-col justify-center items-center transition-colors backdrop-blur'>

                    <Formik
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                    >
                        <Form 
                            className='bg-white border flex flex-col'
                            onSubmit={formik.handleSubmit}
                            initialValues={initialValues}>
                            <CloseIcon onClick={handleNewProject} />
                            <label className='p-2 text-4xl'>
                                New Project
                            </label>

                            <label className='ml-2'>
                                Project Name
                            </label>

                            <Field 
                            name='name' 
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            type='text'
                            placeholder='Project Name'
                            className='border m-2 p-1'/>

                            {formik.errors.name && formik.touched.name && (
                                <div className="text-sm text-ocean ml-2"> **{formik.errors.name.toUpperCase()}</div>
                            )}

                            <label className='ml-2'>
                                Type
                            </label>

                            <Field 
                            name='type' 
                            type='text'
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            as='select'
                            placeholder='Type'
                            className='border m-2 p-1'>
                                <option>Select Type</option>
                                <option value='Ad Campaign'>Ad Campaign</option>
                                <option>Social Media</option>
                                <option>Billboard</option>

                            </Field>
                            {formik.errors.type && formik.touched.type && (
                                <div className="text-sm text-ocean ml-2"> **{formik.errors.type.toUpperCase()}</div>
                            )}
                            <label className='ml-2'>
                                Status
                            </label>

                            <Field 
                            name='status' 
                            as='select'
                            placeholder='Status'
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            className='border m-2 p-1'>
                                <option>Select Status</option>
                                <option value='Planning'>Planning</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </Field>
                            {formik.errors.status && formik.touched.status && (
                                <div className="text-sm text-ocean ml-2"> **{formik.errors.status.toUpperCase()}</div>
                            )}

                            <label className='ml-2'>
                                Deadline
                            </label>

                            <Field 
                            name='deadline' 
                            type='date'
                            min='2024-01-01'
                            max='2024-12-31'
                            value={formik.values.deadline}
                            onChange={formik.handleChange}
                            placeholder='YYYY-MM-DD'
                            className='border m-2 p-1'>

                            </Field>

                            {formik.errors.deadline && formik.touched.deadline && (
                                <div className="text-sm text-ocean ml-2"> **{formik.errors.deadline.toUpperCase()}</div>
                            )}


                            <label className='ml-2'>
                                Budget
                            </label>
                            <Field 
                            step="1000.00"
                            type='number'
                            name='budget' 
                            value={formik.values.budget}
                            onChange={formik.handleChange}
                            placeholder='Budget'
                            className='border m-2 p-1'>
                                
                                
                            </Field>
                            {formik.errors.budget && formik.touched.budget && (
                                <div className="text-sm text-ocean ml-2"> **{formik.errors.budget.toUpperCase()}</div>
                            )}

                            <label className='ml-2'>
                                Client
                            </label>
                            <Field 
                            name='client' 
                            as='select'
                            value={formik.values.client}
                            onChange={formik.handleChange}
                            placeholder='Client'
                            className='border m-2 p-1'>
                                <option value=''>Select Client</option>
                                {
                                    clients
                                }
                                
                            </Field>
                            {formik.errors.client && formik.touched.client && (
                                <div className="text-sm text-ocean ml-2"> **{formik.errors.client.toUpperCase()}</div>
                            )}

                            <button type='submit'>Submit +</button>
                        </Form>

                    </Formik>

                </div>

                :
                
                <>
                </>
            }
        </div>
    )
}

export default Projects