import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Task from '../components/Task'

function Tasks({id, name, deadline, description, project_type, budget}){

    const { token } = useContext(UserContext)
    const [currentTasks, setCurrentTasks] = useState(null)
    const [newTask, setNewTask] = useState(false)

    const handleNewTask = () => {
        setNewTask(!newTask)
    }

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

                            <div className='bg-ocean w-full h-[40px]'>
                                <h1>NEW TASK IN PUT</h1>
                            </div>
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