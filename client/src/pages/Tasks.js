import { useState, useContext } from 'react'
import { useFormik, Formik, Form, Field } from 'formik'
import { toast } from 'react-hot-toast'
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '../context/UserContext'
import { object, string, array, number, bool } from "yup";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Task from '../components/Task'
import AddBoxIcon from '@mui/icons-material/AddBox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function Tasks() {

    const { tasks, user, updateTasks, projects } = useContext(UserContext)
    const [notDoing, setNotDoing] = useState(false)
    const [doing, setDoing] = useState(true)
    const [done, setDone] = useState(false)
    const [newTask, setNewTask] = useState(false)
    const [blocked, setBlocked] = useState(false)

    const handlenotDoing = () => {
        setNotDoing(!notDoing)
    }

    const handleDoing = () => {
        setDoing(!doing)
    }

    const handleDone = () => {
        setDone(!done)
    }

    const handleBlocked = () => {
        setBlocked(!blocked)
    }

    const handleNewTask= () => {
        setNewTask(!newTask)
    }


    const taskSchema = object({
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
        validationSchema: taskSchema,
        onSubmit: (formData) => {


            fetch('http://127.0.0.1:5555/task/', {
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
                        const updatedTasks = [...tasks, data]
                        updateTasks(updatedTasks)
                        handleNewTask()
                        toast.success("Task Added")
        
                    })
        
        
        
                }
            })



        }
    })



    return (
        <>

            {
                newTask ?

                <div className='fixed inset-0 flex flex-col justify-center items-center transition-colors backdrop-blur'>
                    <div className='bg-white border'>
                        <CloseIcon onClick={handleNewTask} />
                        <Formik 
                            onSubmit={formik.handleSubmit}
                            initialValues={initialValues}
                        >
                            <Form 
                            className=' flex flex-col'
                            onSubmit={formik.handleSubmit}
                            initialValues={initialValues}
                            >
                                <label> New Task </label>

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
                                    {
                                        projects ?

                                        projects.map(project => { return <option value={project.id}>{project.name}</option>})

                                        :

                                        <></>
                                    }
                                    

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


            {/* Page Header */}
            <div className='flex flex-row items-center justify-between mb-2 h-[5%]'>
                <div className='flex flex-row items-center'>
                    <TaskAltIcon fontSize='small' />
                    <p className='text-lg ml-2'>Tasks</p>
                </div>

                <div>
                    <AddBoxIcon fontSize='medium' onClick={handleNewTask}/>
                </div>
            </div>

            {/* Tasks */}
            <div className='border border-[0.2px] h-[95%] overflow-y-scroll'>

                <div className='flex flex-col mx-2'>

                    {/* Not Started*/}
                    <div className='flex flex-row items-center my-2' onClick={handlenotDoing}>

                        {/* Color Indicator */}
                        <div className='bg-notStarted w-[20px] h-[20px] border border-[0.2px] mr-2'>

                        </div>

                        {/* Stage Name */}
                        <p className='mx-2'>Not Started { tasks ? `[${tasks.filter(task => task.status === 'Not Started').length}]` : '[0]'}</p>

                        {/* Toggle Logo Depending on State */}

                        {
                            notDoing ?
                            
                            <KeyboardArrowDownIcon fontSize='large' />

                            :

                            <KeyboardArrowLeftIcon fontSize='large' />

                        }

                        
                    </div>

                    {
                        tasks && notDoing ?

                        tasks.filter(task => task.status === 'Not Started').map(task => {
                            return <Task id={task.id} {...task} />
                        })

                        :

                        <></>
                    }




                    {/* Doing */}
                    <div className='flex flex-row items-center my-2' onClick={handleDoing}>
                        {/* Color Indicator */}
                        <div className='bg-doing w-[20px] h-[20px] border border-[0.2px] mr-2'>

                        </div>

                        {/* Stage Name */}
                        <p className='mx-2'> Doing { tasks ? `[${tasks.filter(task => task.status === 'Doing').length}]`  : '[0]'}<p>



                            </p>
                            
                        </p>


                        {/* Toggle Logo Depending on State */}

                        {
                            doing ?
                            
                            <KeyboardArrowDownIcon fontSize='large' />

                            :

                            <KeyboardArrowLeftIcon fontSize='large' />

                        }

                        
                    </div>

                    {
                        tasks && doing ?

                        tasks.filter(task => task.status === 'Doing').map(task => {
                            return <Task id={task.id} {...task} />
                        })

                        :

                        <></>
                    }

                    {/* Blocked */}
                    <div className='flex flex-row items-center my-2' onClick={handleBlocked}>
                        {/* Color Indicator */}
                        <div className='bg-blocked w-[20px] h-[20px] border border-[0.2px] mr-2'>

                        </div>

                        {/* Stage Name */}
                        <p className='mx-2'>Blocked { tasks ? `[${tasks.filter(task => task.status === 'Blocked').length}]` : '[0]'}</p>

                        {/* Toggle Logo Depending on State */}

                        {
                            blocked ?
                            
                            <KeyboardArrowDownIcon fontSize='large' />

                            :

                            <KeyboardArrowLeftIcon fontSize='large' />

                        }
                        
                    </div>

                    {
                        tasks && blocked ?

                        tasks.filter(task => task.status === 'Blocked').map(task => {
                            return <Task id={task.id} {...task} />
                        })

                        :

                        <></>
                    }

                    {/* Done */}
                    <div className='flex flex-row items-center my-2' onClick={handleDone}>
                        {/* Color Indicator */}
                        <div className='bg-done w-[20px] h-[20px] border border-[0.2px] mr-2'>

                        </div>

                        {/* Stage Name */}
                        <p className='mx-2'>Done { tasks ? `[${tasks.filter(task => task.status === 'Done').length}]` : '[0]'}</p>


                        {/* Toggle Logo Depending on State */}

                        {
                            done ?
                            
                            <KeyboardArrowDownIcon fontSize='large' />

                            :

                            <KeyboardArrowLeftIcon fontSize='large' />

                        }
                        
                    </div>

                    {
                        tasks && done ?

                        tasks.filter(task => task.status === 'Done').map(task => {
                            return <Task id={task.id} {...task} />
                        })

                        :

                        <></>
                    }
                
                </div>

            </div>
        
        
        </>
    )
}

export default Tasks