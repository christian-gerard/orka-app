import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'
import Project from '../components/Project'
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Formik, Form, Field } from 'formik'
import { object, string, array, number, bool } from "yup";
import axios from 'axios'

function Projects() {
    const { accessToken } = useContext(UserContext)
    const [newProject, setNewProject] = useState(false)
    const [projects, setProjects] = useState([])
    const [clients, setClients] = useState([])
    const token = accessToken

    const renderProjects = () => {

        const token = accessToken
        let projectData = null


        axios.get('/api/projects/', {
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

    const renderClients = () => {

        const token = accessToken
        let clientData = null


        axios.get('/api/clients/', {
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
                        .map(client => <option value={client}>{client.name}</option> )
                    )
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
        name: '',
        description: '',
        deadline: '',
        projectType: '',
        projectBudget: '',
        client: null,
        tasks: {},
        users: {}
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
            client: formData.client,
            tasks: [],
            users: []
        }


        axios.post('/api/projects/', requestData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => {
            if(resp.status == 201){
                setProjects([<Project key={resp.data.id} {...resp.data} />, ...projects])
                handleNewProject()
                toast.success('New Project Added')
            } else if (resp.status == 401) {
                toast.error('Token Invalid, please refresh')
            }
            else {
                toast.error('Error while saving project')
            }
        })
        .catch( err => console.log(err))

        }
    })

    useEffect(() => {

        if(projects.length === 0) {
            renderClients()
            renderProjects()
        }

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
            <div className='h-[95%] w-full flex flex-col border scrollbar scrollbar-thumb-ocean overflow-scroll p-2'>
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