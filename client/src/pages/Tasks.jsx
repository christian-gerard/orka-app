import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { object, string, array, number, bool } from "yup";
import { useFormik, Formik, Form, Field } from 'formik'
import { toast } from 'react-hot-toast'
import Task from '../components/Task'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

function Tasks(){

    const { accessToken } = useContext(UserContext)
    const [newTask, setNewTask] = useState(false)
    const [tasks, setTasks] = useState(null)

    const handleNewTask = () => {
        formik.resetForm()
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

    const renderTasks = () => {

        const token = accessToken


        axios.get(`${API_URL}/api/tasks/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {
            if(resp.status == 200){

                if(taskData && taskData.length !== 0) {
                    setTasks(
                        taskData(resp.data))

                } else {
                    setTasks([])
                }
            } else if (resp.status == 401){
                toast.error('Unauthorized')
            }
        })


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

        axios.post(`${API_URL}/api/tasks/`, requestData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => {
            if(resp.status == 200){
                formik.resetForm()
                setTasks([data, ...tasks])
                toast.success('Task Added')
            }
        })



        }
    })

    useEffect(() => {
        renderTasks()

    },[])

    return(
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex justify-between items-bottom'>
                <p className=''>Tasks</p>
                <p className='flex items-center text-xl text-white bg-black pr-2' onClick={handleNewTask}>
                            { newTask ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon /> }
                            Add Task
                        </p>
            </div>

            {/* main body */}
            <div className='h-[95%] w-full flex flex-col gap-4 border scrollbar-thin scrollbar-thumb-ocean overflow-scroll'>

                <div className='w-full h-full flex flex-row'>

                    <div className={newTask ? 'w-[60%]' : 'w-full'}>
                    {
                        tasks && tasks.length !== 0 ?

                        tasks
                        .filter(task => task.status !== 'Complete')
                        .sort((a, b) => a.status.localeCompare(b.status))
                        .map(task => <Task key={task.id} {...task} />)


                        :

                        <p className='text-3xl w-full h-full text- flex justify-center items-center'>No Current Tasks</p>
                    }

                    </div>


                    <div className={newTask ? 'w-[40%] p-4' : 'w-none'}>

                    {
                        newTask &&

                            <Formik
                            onSubmit={formik.handleSubmit}
                            initialValues={initialValues}
                            >
                                <Form
                                className='h-full w-full border p-2 '
                                onSubmit={formik.handleSubmit}
                                initialValues={initialValues}
                                >
                                    <div className='w-full h-full flex flex-col justify-between'>

                                        <div className='flex flex-col gap-2'>

                                                <label className='ml-2'> Description </label>
                                                <Field
                                                    name='description'
                                                    value={formik.values.description}
                                                    onChange={formik.handleChange}
                                                    type='text'
                                                    placeholder='Description'
                                                    className='ml-2 mr-2 border h-[30px] lg:h-[40px]'
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
                                                    <option value='Finance'>Finance</option>
                                                    <option value='Creative'>Creative</option>
                                                    <option value='Client'>Production</option>
                                                    <option value='Client'>Client</option>

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
                                                    <option value=''>Select Status</option>
                                                    <option value='Not Started'>Not Started</option>
                                                    <option value='Doing'>Doing</option>
                                                    <option value='Blocked'>Blocked</option>
                                                    <option value='Complete'>Complete</option>

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
                                                        // projects ?

                                                        // projects.map(project =>
                                                        //     <option value={project.id}>{project.name}</option>
                                                        // )
                                                        // :

                                                        // <></>
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
                    }

                    </div>

                </div>



            </div>

        </div>
    )
}

export default Tasks