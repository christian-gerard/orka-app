import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { object, string, array, number, bool } from "yup";
import { useFormik, Formik, Form, Field } from 'formik'
import { toast } from 'react-hot-toast'
import Task from '../components/Task'

function Tasks(){

    const { token, tasks, setTasks, updateTasks, projects } = useContext(UserContext)
    const [newTask, setNewTask] = useState(false)

    const handleNewTask = () => {
        setNewTask(!newTask)
    }

    const taskSchema = object({
        description: string(),
        deadline: string(),
        status: string(),
        category: string()
      });

    const initialValues = {
        description: '',
        deadline:  '',
        category:  '',
        status: '',
        project: ''
    }

    const formik = useFormik({
        initialValues,
        validationSchema: taskSchema,
        onSubmit: (formData) => {

        const requestData = {
            description: formData.description,
            deadline: formData.deadline,
            category: formData.category,
            status: formData.status,
            project: formData.project
        }

        fetch(`/api/project/tasks/`, {
            method: "POST",
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



        }
    })

    useEffect(() => {
        updateTasks()
    },[])

    return(
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex justify-between items-bottom'>
                <p className=''>Tasks</p>
            </div>

            {/* main body */}
            <div className='h-[95%] w-full flex flex-col gap-4 border scrollbar-thin scrollbar-thumb-ocean overflow-scroll'>

                <div>
                    <div className='flex flex-row justify-between items-center'>
                        <p>My Tasks</p>
                        <p className='flex items-center' onClick={handleNewTask}>
                            { newTask ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon /> }
                            Add Task
                        </p>
                    </div>

                    <div>

                        {
                            newTask ?

                        <Formik
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                        >
                        <Form
                        className='flex h-full lg:justify-center w-full border'
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                        >
                            <div className='w-full'>

                                <div className='flex flex-col'>

                                        <label className='ml-2'> Description </label>
                                        <Field
                                            name='description'
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            type='text'
                                            placeholder='Description'
                                            className='ml-2 mr-2 border'
                                        />

                                        {formik.errors.description && formik.touched.description && (
                                            <div className="text-sm text-red ml-2"> **{formik.errors.description.toUpperCase()}</div>
                                        )}

                                        <label className='ml-2'> Category </label>
                                        <Field
                                            name='category'
                                            as='select'
                                            value={formik.values.category}
                                            onChange={formik.handleChange}
                                            type='text'
                                            placeholder='Status'
                                            className='ml-2 mr-2 border h-[30px] lg:h-[40px]'
                                        >
                                            <option value=''>Select Type</option>
                                            <option value='Social Media'>Finance</option>
                                            <option value='Commercial'>Commercial</option>

                                        </Field>

                                        {formik.errors.projectType && formik.touched.projectType && (
                                            <div className="text-sm text-red ml-2"> **{formik.errors.projectType}</div>
                                            )}

                                        <label className='ml-2'> Status </label>
                                        <Field
                                            name='status'
                                            as='select'
                                            value={formik.values.status}
                                            onChange={formik.handleChange}
                                            placeholder='Status'
                                            className='ml-2 mr-2 border h-[30px] lg:h-[40px]'
                                        >
                                            <option value='Not Started'>Not Started</option>

                                        </Field>

                                        {formik.errors.budget && formik.touched.budget && (
                                            <div className="text-sm text-red ml-2"> **{formik.errors.budget.toUpperCase()}</div>
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
                                            className='ml-2 mr-2 border h-[30px] lg:h-[40px]'
                                        />

                                        {formik.errors.deadline && formik.touched.deadline && (
                                            <div className="text-sm text-red ml-2"> **{formik.errors.deadline.toUpperCase()}</div>
                                        )}
                                        <label className='ml-2'> Project </label>
                                        <Field
                                            name='project'
                                            type='date'
                                            as='select'
                                            value={formik.values.project}
                                            onChange={formik.handleChange}
                                            placeholder='Project'
                                            className='ml-2 mr-2 border h-[30px] lg:h-[40px]'
                                        >
                                            <option value=''>Select Project</option>
                                            {
                                                projects ?

                                                projects.map(project =>
                                                    <option value={project.id}>{project.name}</option>
                                                )
                                                :

                                                <></>
                                            }

                                        </Field>

                                        {formik.errors.deadline && formik.touched.deadline && (
                                            <div className="text-sm text-red ml-2"> **{formik.errors.deadline.toUpperCase()}</div>
                                        )}

                                </div>


                                <div className='bg-black text-white hover:text-ocean h-[40px] flex items-center justify-center mt-4'>

                                    <button type='submit' className=''> Add Task</button>

                                </div>

                            </div>



                        </Form>

                    </Formik>
                            :
                            <>
                            </>
                        }

                        {
                            tasks ?

                            <div>

                                {tasks.map(task => <Task key={task.id} {...task} />)}

                            </div>

                            :

                            <div>
                                <h1>Tasks</h1>
                            </div>

                        }

                    </div>
                </div>



            </div>

        </div>
    )
}

export default Tasks