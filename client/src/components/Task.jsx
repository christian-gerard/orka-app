import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'
import { object, string, array, number, bool } from "yup";
import { useFormik, Formik, Form, Field } from 'formik'
import Close from '@mui/icons-material/Close';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'

function Task({id, deadline, description, category, status, project, users}) {
    const { API_URL, accessToken } = useContext(UserContext)
    const oldStatus = status
    const [isChecked, setIsChecked] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

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

            <div  className={`p-1 border flex flex-col text-sm ${isChecked && 'text-gray'} ${isOpen ? 'h-[300px]' : 'h-[40px]'}`}>
                <div className=' w-full flex flex-row justify-between items-center'>

                    <div className='w-[70%] flex flex-row items-center gap-2 ' >
                        { isChecked ?
                            <div className='peer w-[25px] h-[25px] border-2 text-2xl flex justify-center items-center' onClick={handleUnmark}> ✓ </div>
                            :
                            <div className='peer w-[25px] h-[25px] border' onClick={handleMarkAsDone}></div>
                        }
                        <p onClick={handleOpen} className='hover:bg-ocean truncate'>{description ? description : "No Description"}</p>
                    </div>

                    <div className='w-[30%] flex flex-row justify-end items-center gap-2'>
                        {/* <p>{users && users.map(user => `${first_name} ${last_name}`)}</p> */}
                        <p className={generateColor()}>{status ? status : "No Status"}</p>
                        <p className='p-1 border truncate'>{deadline ? deadline.slice(5,11) : "No Deadline"}</p>
                    </div>

                </div>


            {
                isOpen &&

                <div className={`transition-all duration-500 transform origin-top overflow-hidden text-sm h-[250px] `}>
                    <label className='ml-2 text-base '> Users </label>

                    <Formik
                    onSubmit={formik.handleSubmit}
                    initialValues={initialValues}
                    >
                        <Form
                        className='h-full w-full border p-2 flex flex-col gap-2 '
                        onSubmit={formik.handleSubmit}
                        initialValues={initialValues}
                        >
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

                </div>
            }
        </div>
    )
}
export default Task