import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import Project from '../components/Project'
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Formik, Form, Field } from 'formik'
import { object, string, array, number, bool } from "yup";

function Projects() {
    const { projects, setProjects } = useContext(UserContext)
    const [newProject, setNewProject] = useState(false)

    const handleNewProject = () => {
        setNewProject(!newProject)
        formik.resetForm()
    }

    const projectSchema = object({
        name: string()
        .required('Please provide a project name'),
        description: string(),
        deadline: string()
        .required(),
        projectType: string()
        .required('Please provide the project type'),
        budget: number()
      });

    const initialValues = {
        name: '',
        description: '',
        deadline: '',
        projectType: '',
        budget: 1000,
    }

    const formik = useFormik({
        initialValues,
        validationSchema: projectSchema,
        onSubmit: (formData) => {
            console.log(formData)


            // fetch('/api/project/', {
            //     method: "POST",
            //     body: JSON.stringify(formData),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // })
            // .then(resp => {
            //     if(resp.ok){

            //         return resp.json().then(data => {
            //             setProjects(data)

            //         })



            //     }
            // })



        }
    })

    useEffect(() => {

        fetch('/api/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' ,
            },
            credentials: 'include',
        })
        .then( resp => {
            if(resp.ok){
                return resp.json().then(data => {
                    setProjects(data)
                })
            }
        }

        )
    }, [])

    return (
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex justify-between items-center'>
                <p className=''>Projects</p>
                <div className='border bg-black' onClick={handleNewProject}>
                    <p className='text-lg text-white p-1'>+ New Project</p>
                </div>
            </div>



            {/* Projects */}
            <div className='h-[95%] w-full flex flex-col gap-4 border scrollbar scrollbar-thumb-ocean overflow-scroll'>
                {
                    projects !== null ?

                    projects.map(proj => <Project key={proj.id} {...proj} />)

                    :

                    <div className='w-full h-full text-4xl flex justify-center items-center'>
                        <h1>No Projects Available...</h1>
                    </div>
                }
            </div>

            {
                newProject ?

                <div className='fixed inset-0 flex flex-col justify-center items-center transition-colors backdrop-blur'>
                    <div className='bg-white border h-[700px] w-[350px] lg:h-[80%] lg:w-[40%]'>
                        <CloseIcon  style={{width: '40px', height: '40px'}} onClick={handleNewProject} />
                        <Formik
                            onSubmit={formik.handleSubmit}
                            initialValues={initialValues}
                        >
                            <Form
                            className=' flex flex-col lg:gap-2'
                            onSubmit={formik.handleSubmit}
                            initialValues={initialValues}
                            >
                                <label className='ml-2 mt-1 text-2xl'> New Project </label>

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
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.name}</div>
                                )}

                                <label className='ml-2'> Description </label>
                                <Field
                                    name='description'
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    as='textarea'
                                    placeholder='Description'
                                    className='border m-2 p-2 lg:h-[200px]'
                                />

                                {formik.errors.description && formik.touched.description && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.description.toUpperCase()}</div>
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
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.deadline.toUpperCase()}</div>
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
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.projectType}</div>
                                )}

                                <label className='ml-2'> Budget </label>
                                <Field
                                    name='budget'
                                    type='number'
                                    value={formik.values.budget}
                                    onChange={formik.handleChange}
                                    placeholder='Type'
                                    className='border m-2 p-2'
                                    step='1000'
                                    min="100"
                                    max="100000000"
                                >

                                </Field>

                                {formik.errors.budget && formik.touched.budget && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.budget.toUpperCase()}</div>
                                )}


                                <button type='submit' className='border bg-black text-white h-[50px]'> Create Project </button>


                            </Form>

                        </Formik>
                    </div>
                </div>

                :

                <>
                </>
            }


        </div>
    )
}
export default Projects