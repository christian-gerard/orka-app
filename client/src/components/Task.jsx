import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'
import { object, string, array, number, bool } from "yup";
import { useFormik, Formik, Form, Field } from 'formik'
import Message from '../components/Message'
import User from '../components/User'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
    const [extraFields, setExtraFields] = useState(false)

    const handleExtraFields = () => {
        setExtraFields(!extraFields)
    }

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


                <div className={`overflow-hidden w-full text-sm h-full mt-1`}>

                    {/* Header */}
                    <div className=''>
                        <div className='flex flex-row justify-between p-1 bg-black text-white'>
                            <div className='flex flex-row items-center gap-2'>
                                <p className='text-lg'>Project</p>
                                <p>Client</p>
                            </div>
                            <div>
                                <DeleteIcon onClick={handleTaskDelete} />
                                <EditIcon onClick={handleEditTask}/>
                            </div>
                        </div>
                        {/* Details */}
                        <div className='flex flex-row w-full'>
                            <div className='w-[60%] p-1'>
                                <div className='border-b pb-1'>Details</div>
                                <div>
                                    <p>Category</p>
                                    <p>Days Till Deadline</p>
                                </div>

                            </div>

                            <div className='w-[40%]'>
                                <div className='p-1'>Assigned</div>
                                <div className='border h-[80px] flex flex-row flex-wrap bg-gray overflow-y-scroll'>
                                    <div>

                                        <User />
                                        <User />
                                        <User />
                                        <User />
                                        <User />

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>



                    {/* Thread */}
                    <div className='h-screen'>
                        <p>Thread</p>
                        <div className='h-[500px] overflow-y-scroll scrollbar scrollbar-thumb-ocean border flex flex-col gap-4'>
                            <Message outgoing={true} message={'Should we push the deadline back'}/>
                            <Message outgoing={false} message={'Hello'}/>
                            <Message outgoing={false} message={'Working on something good'}/>
                            <Message outgoing={true} message={'Wellp'}/>
                            <Message outgoing={false} message={'Working on something good'}/>
                            <Message outgoing={true} message={'Wellp'}/>
                            <Message outgoing={false} message={'Working on something good'}/>
                            <Message outgoing={true} message={'Wellp'}/>
                            <Message outgoing={false} message={'Working on something good'}/>
                            <Message outgoing={true} message={'Last Message'}/>
                        </div>
                    </div>

                </div>

            {
                editTask &&

                <Formik
                onSubmit={formik.handleSubmit}
                initialValues={initialValues}
                >
                    <Form
                    className='fixed inset-0 flex flex-col justify-center items-center transition-colors backdrop-blur '
                    onSubmit={formik.handleSubmit}
                    initialValues={initialValues}
                    >
                        <div className='bg-white border h-[700px] w-[350px] lg:h-[80%] lg:w-[40%]'>

                            <CloseIcon onClick={handleEditTask}/>

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
                                {/* {
                                    projects ?

                                    projects.map(project =>
                                        <option key={project.id} value={project.id}>{project.name}</option>
                                    )
                                    :

                                    <></>
                                } */}

                            </Field>

                            {formik.errors.project && formik.touched.project && (
                                <div className="text-sm text-red ml-2"> **{formik.errors.project}</div>
                            )}




                            <label className='ml-2'> Deadline </label>
                            <Field
                                name='deadline'
                                type='date'
                                value={formik.values.deadline}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='Deadline'
                                className='ml-2 mr-2 border h-[30px] lg:h-[40px]'
                            />

                            {formik.errors.deadline && formik.touched.deadline && (
                                <div className="text-sm text-red ml-2"> **{formik.errors.deadline}</div>
                            )}


                            <div onClick={handleExtraFields} className='flex flex-row items-center gap-2 border-b pb-1  my-1'>
                                <p>{extraFields ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</p>
                                <p>Additional Fields</p>
                            </div>

                            {
                                extraFields &&
                                <>


                                    <label className='ml-2'> Status </label>
                                    <Field
                                        name='status'
                                        as='select'
                                        value={formik.values.status}
                                        onChange={formik.handleChange}
                                        placeholder='Status'
                                        className='ml-2 mr-2 border h-[30px] lg:h-[40px]'
                                    >
                                        <option value='not started'>Not Started</option>
                                        <option value='doing'>Doing</option>
                                        <option value='blocked'>Blocked</option>
                                        <option value='complete'>Complete</option>

                                    </Field>


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

                                    <label className='ml-2'> Note </label>
                                    <Field
                                        name='note'
                                        value={formik.values.note}
                                        onChange={formik.handleChange}
                                        as='textarea'
                                        placeholder='Write notes here...'
                                        className='ml-2 mr-2 border min-h-[100px] lg:h-[40px]'
                                    />

                                    {formik.errors.note && formik.touched.note && (
                                        <div className="text-sm text-red ml-2"> **{formik.errors.note}</div>
                                    )}


                                </>

                            }


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

                        </div>
                    </Form>
                </Formik>
            }
        </div>
    )
}
export default Task