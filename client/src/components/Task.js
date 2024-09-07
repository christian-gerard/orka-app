import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'

function Task({id, description, deadline, project, type, note, status}) {

    const [taskStatus, setTaskStatus] = useState(false)
    const { projects, user } = useContext(UserContext)

    console.log(taskStatus)

    

    const markAsDone = () => {
        setTaskStatus(!taskStatus)

        fetch(`http://127.0.0.1:5555/task/${id}/`, {
                method: "PATCH",
                body: JSON.stringify({"status": "Done"}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${user.token}`
                }
            })
            .then(resp => {

                if(resp.ok){

                    return resp.json().then(data => {
                        toast.success('Task Updated to Done')
                    })
                } else {
                    toast.error('Unable to Save')
                    setTaskStatus(false)
                }

                console.log(resp)
            })
        }



    return (
        <div className={taskStatus ?  'border border-[0.2px] text-lg text-gray flex flex-row items-center my-2 mx-2 justify-between ' : 'border border-[0.2px] text-lg flex flex-row items-center my-2 mx-2 justify-between'} >
            <div className='flex flex-row'>
                <DragIndicatorIcon />
                <p className={taskStatus ? 'line-through' : ''}>{description}</p>
                
            </div>

            <div className='flex flex-row items-center'>
                <p className={ taskStatus ? 'border p-1 text-gray' : 'border p-1 text-white bg-ocean'}>{project ? projects.filter(project_obj => project_obj.id === project)[0].name : "UnNamed"}</p>
            <p className={ taskStatus ? 'border p-1 text-gray' : 'border p-1 text-white bg-gray'} >{taskStatus ? 'Done' : status}</p>
                <input 
                    type='checkbox'
                    className=' border h-[25px] w-[25px] mx-3'
                    onClick={markAsDone}
                    value={taskStatus} 
                    >
                </input>
            
            </div>
        </div>
    )
}

export default Task