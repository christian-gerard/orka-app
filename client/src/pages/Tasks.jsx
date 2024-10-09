import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { object, string, array, number, bool } from "yup";
import { useFormik, Formik, Form, Field } from 'formik'
import { toast } from 'react-hot-toast'
import Task from '../components/Task'

function Tasks({id, name, deadline, description, project_type, budget}){

    const { token } = useContext(UserContext)
    const [currentTasks, setCurrentTasks] = useState(null)
    const [newTask, setNewTask] = useState(false)

    const handleNewTask = () => {
        setNewTask(!newTask)
    }

    const taskSchema = object({
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
        name: '',
        description: '',
        deadline:  '',
        projectType:  '',
        budget: ''
    }

    const formik = useFormik({
        initialValues,
        validationSchema: taskSchema,
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
        fetch('/api/project/tasks', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            credentials: 'include',
        })
        .then(resp => {
            if(resp.ok){
                return resp.json().then(data => {
                    setCurrentTasks(data)
                })
            }
        })

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
                        className='flex flex-row justify-center items-center w-full bg-ocean'
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                        >
                            <div className='bg-white  border h-[40px] w-full lg:h-[80%] lg:w-full '>

                                <div className='w-full flex flex-row lg:gap-2 overflow-scroll scrollbar scrollbar-thumb-ocean items-center'>

                                    <label className='ml-2'> Description </label>
                                    <Field
                                        name='description'
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        type='text'
                                        placeholder='Description'
                                        className='border h-[40px]'
                                    />

                                    {formik.errors.description && formik.touched.description && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.description.toUpperCase()}</div>
                                    )}

                                    <label className='ml-2'> Category </label>
                                    <Field
                                        name='projectType'
                                        as='select'
                                        value={formik.values.projectType}
                                        onChange={formik.handleChange}
                                        type='text'
                                        placeholder='Status'
                                        className='border '
                                    >
                                        <option value=''>Select Type</option>
                                        <option value='Social Media'>Social Media</option>
                                        <option value='Commercial'>Commercial</option>

                                    </Field>

                                    {formik.errors.projectType && formik.touched.projectType && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.projectType}</div>
                                        )}

                                    <label className='ml-2'> Status </label>
                                    <Field
                                        name='budget'
                                        type='number'
                                        value={formik.values.budget}
                                        onChange={formik.handleChange}
                                        placeholder='Budget'
                                        className='border '
                                        step='1000'
                                        min="100"
                                        max="100000000"
                                    >

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
                                        className='border '
                                    />

                                    {formik.errors.deadline && formik.touched.deadline && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.deadline.toUpperCase()}</div>
                                    )}

                                </div>


                            </div>

                            <button type='submit' className='bg-black w-[10%] text-white h-full hover:text-ocean'> Add Task</button>


                        </Form>

                    </Formik>
                            :
                            <>
                            </>
                        }

                        {
                            currentTasks ?

                            <div>

                                {currentTasks.map(task => <Task key={task.id} {...task} />)}

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