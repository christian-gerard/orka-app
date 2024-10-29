import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'
import Close from '@mui/icons-material/Close';
import CloseIcon from '@mui/icons-material/Close';

function Task({id, deadline, description, category, status, project}) {
    const { } = useContext(UserContext)

    useEffect(() => {

    },[])




    return (
        <div className='p-1 m-2 border flex flex-row justify-between items-center h-[40px] text-sm'>

            <div className='w-[70%] flex flex-row items-center'>
                <input type='checkbox' className='peer w-[25px] h-[25px] border-2 checked:text-white' />
                <p className=' border border-black  text-lg p-[0.1em] mx-1 flex flex-nowrap max-h-[30px]'>

                </p>
                <p>{description ? description : "No Description"}</p>
            </div>

            <div className='w-[30%] flex flex-row justify-end gap-2'>
                <p className=''>{status ? status : "No Status"}</p>
                <p>{deadline ? deadline.slice(5,11) : "No Deadline"}</p>
            </div>
        </div>
    )
}
export default Task