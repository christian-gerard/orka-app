import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'
import Close from '@mui/icons-material/Close';
import CloseIcon from '@mui/icons-material/Close';

function Task({id, deadline, description, category, status, project}) {
    const { projects, updateProjects, tasks, token, setTasks } = useContext(UserContext)

    const handleStatus = () => {

        const requestData = {
            status: "Complete"
        }

        fetch(`/api/project/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            credentials: 'include',
        })
        .then(resp => {
            if(resp.ok){
                const newTasks = tasks.filter(task => task.id !== id)
                setTasks(newTasks)
                toast.success(`Task Marked Complete`)
            }
        })
    }

    const determineColor = () => {
        if(status === "Not Started") {
            return "bg-black text-white"
        } else if (status === "DOING") {
            return "bg-red"
        } else {
            return "bg-ocean"
        }
    }

    const handleTaskDelete = () => {

        fetch(`/api/project/tasks/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            credentials: 'include',
        })
        .then(resp => {
            if(resp.ok){
                const newTasks = tasks.filter(task => task.id !== id)
                setTasks(newTasks)
                toast.success(`Task Deleted`)
            }
        })

    }

    useEffect(() => {
        updateProjects()
    },[])


    const findProjectName = () => {
        if(projects) {
            const projName = projects.filter(proj => proj.id === project)[0]

            return projName ? projName.name : "Untitled"

        }
    }


    return (
        <div className='p-1 m-2 border flex flex-row justify-between items-center h-[40px]'>

            <div className='w-[50%] flex flex-row items-center'>
                <div onClick={handleTaskDelete} className='mx-1'>
                    <CloseIcon />
                </div>
                <p className=' border border-black  p-[0.1em] mx-1'>
                    {findProjectName()}
                </p>
                <p>{description ? description : "No Description"}</p>
            </div>

            <div className='w-[50%] flex flex-row justify-end gap-2'>
                <p className={determineColor()}>{status ? status : "No Status"}</p>
                <p>{deadline ? deadline.slice(5,11) : "No Deadline"}</p>
                <input type='checkbox' className='peer w-[25px] h-[25px] border-2 checked:text-white' onClick={handleStatus} />
            </div>
        </div>
    )
}
export default Task