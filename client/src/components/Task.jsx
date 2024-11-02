import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'
import { object, string, array, number, bool } from "yup";
import { useFormik, Formik, Form, Field } from 'formik'
import Message from '../components/Message'
import User from '../components/User'
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'

function Task({id, deadline, description, category, status, project, users}) {

    const { API_URL, accessToken } = useContext(UserContext)
    const oldStatus = status
    const [isChecked, setIsChecked] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [editTask, setEditTask] = useState(false)

    const token = accessToken

    const handleEditTask = () => {
        setEditTask(!editTask)
    }

    const handleTaskDelete = () => {
        axios.delete(`${API_URL}/api/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {
            if(resp.status == 204) {

                toast.success('Deleted')
            } else {
                toast.error('Error Occured')
            }
        })
    }

    const handleMarkAsDone = () => {

        setIsChecked((isChecked) => !isChecked)

        const token = accessToken

        const status = {
            'status': 'done'
        }

        axios.patch(`${API_URL}/api/tasks/${id}/`, status, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {
            if(resp.status !== 200){
                setIsChecked(false)
                toast.error('Unable to Update')
            }
        })

    }

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleUnmark = () => {

        setIsChecked((isChecked) => !isChecked)

        const token = accessToken


        const status = {
            'status': oldStatus
        }

        axios.patch(`${API_URL}/api/tasks/${id}/`, status, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {
            if(resp.status !== 200){
                setIsChecked(false)
                toast.error('Unable to Update')
            }
        })

    }

    const generateColor = () => {
        if(status == 'not started') {
            return 'bg-notStarted p-1 border truncate'
        } else if(status=='doing') {
            return 'bg-doing p-1 border truncate'
        } else if(status=='blocked') {
            return 'bg-blocked p-1 border truncate'
        } else if(status=='done') {
            return 'bg-done p-1 border truncate'
        }

    }

    const userSchema = object({
        user: array()
    });

    const initialValues = {
        user: []
    }

    const formik = useFormik({
        initialValues,
        validationSchema: userSchema,
        onSubmit: (formData) => {
            console.log(formData)
        const token = accessToken

        axios.post(`${API_URL}/api/tasks/${id}/update-users/`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => {
            if(resp.status == 200){
                formik.resetForm()
                toast.success('Users Updated')
            }
        })



        }
    })

    useEffect(() => {

    },[])

    return (

        <div  className={`transition-all duration-800 ease-in-out p-1 border hover:duration-200 hover:border-[3px] flex flex-col text-sm ${isChecked && 'text-gray'} ${isOpen ? 'h-screen max-h-[90%]' : 'h-[40px] max-h-[40px]'}`}>
                <div className='w-full flex flex-row justify-between items-center' onClick={handleOpen}>

                    <div className='w-[70%] flex flex-row items-center gap-2 ' >
                        { isChecked ?
                            <div className='peer w-[25px] h-[25px] border-2 text-2xl flex justify-center items-center bg-ocean' onClick={handleUnmark}> ✓ </div>
                            :
                            <div className='peer w-[25px] h-[25px] border bg-white' onClick={handleMarkAsDone}></div>
                        }
                        <p  className='truncate'>{description ? description : "No Description"}</p>
                    </div>

                    <div className='w-[30%] flex flex-row justify-end items-center gap-2'>
                        {/* <p>{users && users.map(user => `${first_name} ${last_name}`)}</p> */}
                        <p className={generateColor()}>{status ? status : "No Status"}</p>
                        <p className='p-1 border truncate'>{deadline ? deadline.slice(5,11) : "No Deadline"}</p>
                    </div>

                </div>


                <div className={`overflow-hidden w-full text-sm h-full mt-1 `}>

                    {/* Header */}
                    <div className='flex flex-row justify-between p-1 bg-black text-white'>
                        <p>More Details</p>
                        <div>
                            <DeleteIcon onClick={handleTaskDelete} />
                            <EditIcon onClick={handleEditTask}/>
                        </div>
                    </div>
                    {/* More Details */}
                    <div className='flex flex-row w-full'>
                        <div className='w-[50%]'>
                            <div className='text-base'> Users </div>
                            <div className='border h-[100px]'>
                                <User />
                            </div>
                        </div>

                        <div className='w-[50%]'>
                            <div className='ml-2 text-base'> Other Details </div>
                            <div className='border w-full'>
                                <p>{project && project.name}</p>
                                <p>{deadline && deadline.slice(5,10)}</p>
                            </div>
                        </div>
                    </div>
                    {/* Thread */}
                    <div className=''>
                        <p>Thread</p>
                        <div className='h-[600px] overflow-y-scroll scrollbar scrollbar-thumb-ocean scrollbar-track-gray border flex flex-col gap-4'>
                            <Message outgoing={true} message={'Should we push the deadline back'}/>
                            <Message outgoing={false} message={'Hello'}/>
                            <Message outgoing={false} message={'Working on something good'}/>
                            <Message outgoing={true} message={'Wellp'}/>
                            <Message outgoing={false} message={'Working on something good'}/>
                            <Message outgoing={true} message={'Wellp'}/>
                            <Message outgoing={false} message={'Working on something good'}/>
                            <Message outgoing={true} message={'Wellp'}/>
                            <Message outgoing={false} message={'Working on something good'}/>
                            <Message outgoing={true} message={'Wellp'}/>
                        </div>
                    </div>
                    {
                        editTask &&

                        <Formik
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                        >
                            <Form
                            className='absolute h-[90%] inset-0 flex flex-col justify-center items-center transition-colors backdrop-blur-sm'
                            onSubmit={formik.handleSubmit}
                            initialValues={initialValues}
                            >
                                <CloseIcon onClick={handleEditTask}/>

                                <Field
                                    name='user'
                                    as='select'
                                    multiple
                                    value={formik.values.user}
                                    onChange={(e) => {
                                        const selectedUserId = parseInt(e.target.value); // Get the selected user ID
                                        const currentUsers = formik.values.user;

                                        // Toggle the selected user ID in the users array
                                        if (currentUsers.includes(selectedUserId)) {
                                            // If already selected, remove it
                                            formik.setFieldValue(
                                                'user',
                                                currentUsers.filter((id) => id !== selectedUserId)
                                            );
                                        } else {
                                            // If not selected, add it
                                            formik.setFieldValue('user', [...currentUsers, selectedUserId]);
                                        }

                                    }}
                                    onBlur={formik.handleBlur}
                                    className='ml-2 mr-2 border scrollbar scrollbar-thumb-ocean'
                                >
                                    {
                                        users && users.sort((a, b) => a.first_name.localeCompare(b.first_name)).map(user => <option key={user.id} className='text-sm border p-1 m-2' value={user.id}>{user.email}</option>)
                                    }

                                </Field>

                                <button type='submit' className={'bg-black text-white'}>Update</button>
                            </Form>
                        </Formik>
                    }

                </div>

        </div>
    )
}
export default Task