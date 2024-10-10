import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { object, string, array, number, bool } from "yup";
import { useFormik, Formik, Form, Field } from 'formik'
import { toast } from 'react-hot-toast'
import Task from '../components/Task'

function Tasks({id, name, deadline, description, project_type, budget}){

    const { token, tasks, setTasks } = useContext(UserContext)
    const [currentTasks, setCurrentTasks] = useState(null)
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
        status: ''
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
                        className='flex flex-row justify-left h-full lg:justify-center w-full border'
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                        >
                            <div className='h-full sm:h-[40px] w-full lg:h-[80%] lg:w-full '>

                                <div className='flex flex-col  sm:flex-row  overflow-x-scroll scrollbar scrollbar-thumb-ocean'>

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
                                        <option value='Social Media'>Finance</option>
                                        <option value='Commercial'>Commercial</option>

                                    </Field>

                                    {formik.errors.projectType && formik.touched.projectType && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.projectType}</div>
                                        )}

                                    <label className='ml-2'> Status </label>
                                    <Field
                                        name='status'
                                        type='text'
                                        value={formik.values.status}
                                        onChange={formik.handleChange}
                                        placeholder='Status'
                                        className='ml-2 mr-2 border h-[30px] lg:h-[40px]'
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
                                        className='ml-2 mr-2 border h-[30px] lg:h-[40px]'
                                    />

                                    {formik.errors.deadline && formik.touched.deadline && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.deadline.toUpperCase()}</div>
                                    )}

                                </div>


                            </div>

                            <div className='bg-black w-[25%] lg:w-[10%] text-white h-full hover:text-ocean'>

                                <button type='submit' className='h-[60px] flex items-center'> Add Task</button>

                            </div>



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