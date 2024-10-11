import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import Close from '@mui/icons-material/Close';
import CloseIcon from '@mui/icons-material/Close';

function Task({deadline, description, category, status, project}) {
    const { projects, updateProjects, tasks } = useContext(UserContext)

    const handleStatus = () => {
        console.log("Handle Status Triggered")
    }

    const handleTaskDelete = () => {
        console.log("DELETING TASK")
    }

    useEffect(() => {
        updateProjects()
    },[])

    return (
        <div className='p-1 m-2 border flex flex-row justify-between items-center h-[40px]'>

            <div className='w-[50%] flex flex-row items-center'>
                <div onClick={handleTaskDelete}>
                    <CloseIcon />
                </div>
                <p className='bg-ocean border border-black text-white p-[0.1em]'>
                    {projects ?
                       "TESTING"
                        :
                        "<><><>"
                    }
                </p>
                <p>{description ? description : "No Description"}</p>
            </div>

            <div className='w-[50%] flex flex-row justify-end gap-2'>
                <p>{status ? status : "No Status"}</p>
                <p>{category ? category : "No Category"}</p>
                <p>{deadline ? deadline : "No Deadline"}</p>
                <input type='checkbox' className='peer w-[25px] h-[25px] border-2 checked:text-white' />
            </div>
        </div>
    )
}
export default Task