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

    const formik = useFormik({
        initialValues,
        validationSchema: taskSchema,
        onSubmit: (formData) => {

        const token = accessToken
        const requestData = {

            user: formData.users
        }

        axios.post(`${API_URL}/api/tasks/${id}/update-users/`, requestData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => {
            if(resp.status == 201){
                formik.resetForm()
                toast.success('Task Added')
            }
        })



        }
    })

    useEffect(() => {

    },[])




    return (
        // <div  onClick={handleOpen} className={isChecked ?
        // 'text-gray border-gray p-1 m-2 border flex flex-col justify-between items-center h-[40px] text-sm'
        // : ''
        // }>

            <div onClick={handleOpen} className={`p-1 border flex flex-col text-sm ${isChecked && 'text-gray'} ${isOpen ? 'h-[100px]' : 'h-[40px]'}`}>
                <div className=' w-full flex flex-row justify-between items-center'>

                    <div className='w-[70%] flex flex-row items-center gap-2'>
                        { isChecked ?
                            <div className='peer w-[25px] h-[25px] border-2 text-2xl flex justify-center items-center' onClick={handleUnmark}> ✓ </div>
                            :
                            <div className='peer w-[25px] h-[25px] border' onClick={handleMarkAsDone}></div>
                        }
                        <p className='truncate'>{description ? description : "No Description"}</p>
                    </div>

                    <div className='w-[30%] flex flex-row justify-end items-center gap-2'>
                        {/* <p>{users && users.map(user => `${first_name} ${last_name}`)}</p> */}
                        <p className={generateColor()}>{status ? status : "No Status"}</p>
                        <p className='p-1 border truncate'>{deadline ? deadline.slice(5,11) : "No Deadline"}</p>
                    </div>

                </div>


            {
                isOpen && !isChecked &&

                <div>
                    opening

                </div>
            }
        </div>
    )
}
export default Task