import { useState, useContext } from 'react'
import Project from '../components/Project'
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Formik, Form, Field } from 'formik'
import { object, string, array, number, bool } from "yup";

function Projects() {
    const [newProject, setNewProject] = useState(false)

    const handleNewProject = () => setNewProject(!newProject)

    const projectSchema = object({
        description: string(),
        deadline: string(),
        status: string(),
        note: string(),
        type: string(),
        project: string()


      });

    const initialValues = {
        description: '',
        deadline: '',
        status: '',
        note: '',
        type: '',
        project: null
    }

    const formik = useFormik({
        initialValues,
        validationSchema: projectSchema,
        onSubmit: (formData) => {


            fetch('/api/project/', {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(resp => {
                if(resp.ok){

                    return resp.json().then(data => {


                    })



                }
            })



        }
    })

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
            <div className='h-[95%] w-full border scrollbar scrollbar-thumb-ocean overflow-scroll'>
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
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
                            className=' flex flex-col'
                            onSubmit={formik.handleSubmit}
                            initialValues={initialValues}
                            >
                                <label> New Project </label>

                                <label> Description </label>
                                <Field
                                    name='description'
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    type='text'
                                    placeholder='Description'
                                    className='border m-2 p-2'
                                />

                                {formik.errors.description && formik.touched.description && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.description.toUpperCase()}</div>
                                )}



                                <label> Deadline </label>
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
                                <label> status </label>
                                <Field
                                    name='status'
                                    as='select'
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    type='text'
                                    placeholder='Status'
                                    className='border m-2 p-2'
                                >
                                    <option value=''>Select Status</option>
                                    <option value='Not Started'>Not Started</option>
                                    <option value='Doing'>Doing</option>
                                    <option value='Blocked'>Blocked</option>
                                    <option value='Done'>Done</option>

                                </Field>

                                {formik.errors.status && formik.touched.status && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.status.toUpperCase()}</div>
                                )}
                                <label> note </label>
                                <Field
                                    name='note'
                                    value={formik.values.note}
                                    onChange={formik.handleChange}
                                    type='text'
                                    placeholder='Note'
                                    className='border m-2 p-2 h-[250px] flex justify-start'
                                />

                                {formik.errors.note && formik.touched.note && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.note.toUpperCase()}</div>
                                )}
                                <label> type </label>
                                <Field
                                    name='type'
                                    as='select'
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    type='text'
                                    placeholder='Type'
                                    className='border m-2 p-2'
                                >
                                    <option value=''>Select Type</option>
                                    <option value='Prep'>Prep</option>
                                    <option value='Shooting'>Shooting</option>
                                    <option value='Edit'>Edit</option>

                                </Field>

                                {formik.errors.type && formik.touched.type && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.type.toUpperCase()}</div>
                                )}

                                <label> Project </label>
                                <Field
                                    name='project'
                                    as='select'
                                    value={formik.values.project}
                                    onChange={formik.handleChange}
                                    type='text'
                                    className='border m-2 p-2'
                                >
                                    <option value=''>Select Project</option>
                                    {/* {
                                        projects ?

                                        projects.map(project => { return <option value={project.id}>{project.name}</option>})

                                        :

                                        <></>
                                    } */}


                                </Field>

                                {formik.errors.type && formik.touched.type && (
                                    <div className="text-sm text-ocean ml-2"> **{formik.errors.type.toUpperCase()}</div>
                                )}

                                <button type='submit'> + Add Task </button>


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