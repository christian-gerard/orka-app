import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'
import Project from '../components/Project'
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Formik, Form, Field } from 'formik'
import { object, string, array, number, bool } from "yup";
import axios from 'axios'


const API_URL = import.meta.env.VITE_API_URL

function Projects() {
    const { accessToken } = useContext(UserContext)
    const [newProject, setNewProject] = useState(false)
    const [projects, setProjects] = useState(null)
    const token = accessToken

    const renderProjects = () => {

        const token = accessToken
        let projectData = null


        axios.get(`${API_URL}/api/projects/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {

            if(resp.status == 200){
                projectData = resp.data
                if(projectData && projectData.length !== 0) {
                    setProjects(
                        projectData
                        .map(proj => <Project key={proj.id} {...proj} />)
                    )
                } else {
                    setProjects(<p className='text-3xl w-full h-full text- flex justify-center items-center'>No Current Projects</p>)
                }
            } else if (resp.status == 401){
                toast.error('Unauthorized')
            }
        })
    }

    const handleNewProject = () => {
        setNewProject(!newProject)
        formik.resetForm()
    }

    const projectSchema = object({
        name: string()
        .required('Please provide a name'),
        description: string(),
        deadline: string()
        .required("Please provide a deadline"),
        projectType: string()
        .required('Please provide the project type')
      });

    const initialValues = {
        name: '',
        description: '',
        deadline: '',
        projectType: '',
        client: null
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


        axios.post(`${API_URL}/api/projects/`, requestData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => {
            if(resp.status == 201){
                setProjects([resp.data, ...projects])
                handleNewProject()
                toast.success('New Project Added')
            } else {
                toast.error('Error while saving project')
            }
        })
        .catch( err => console.log(err))

        }
    })

    useEffect(() => {
        renderProjects()
    }, [])

    return (

        <div className='h-full w-full'>

            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex justify-between items-bottom'>
                <p className=''>Projects</p>
                <div className='border bg-black m-1 flex items-center' onClick={handleNewProject}>
                    <p className='text-lg text-white'>+ New Project</p>
                </div>
            </div>



            {/* Projects */}
            <div className='h-[95%] w-full flex flex-col border scrollbar scrollbar-thumb-ocean overflow-scroll'>
                {
                    projects
                }
            </div>

            {
                newProject ?

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
                                    <CloseIcon  style={{width: '40px', height: '40px'}} onClick={handleNewProject} />
                                    <label className='ml-2 mt-1 text-2xl'> New Project </label>

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
                                    <label className='ml-2'> Project Type </label>
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
                                        {/* {
                                            clients ?

                                            clients.map(client => <option value={client.id}>{client.name}</option>)
                                            :
                                            <></>

                                        } */}

                                    </Field>

                                    {formik.errors.budget && formik.touched.budget && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.budget.toUpperCase()}</div>
                                    )}
                                </div>


                            </div>

                            <button type='submit' className='bg-black w-[350px] lg:w-[40%] mt-3 text-white h-[50px] hover:text-ocean'> Create Project </button>


                        </Form>

                    </Formik>

                :

                <>
                </>

            }


        </div>
    )
}
export default Projects