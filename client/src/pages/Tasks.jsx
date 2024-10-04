import { useState, useEffect, useContext } from 'react'
import Task from '../components/Task'

function Tasks({id, name, deadline, description, project_type, budget}){

    const [currentTasks, setCurrentTasks] = useState(null)

    useEffect(() => {
        fetch('/api/project/tasks', {
            'method': 'GET',
            'Authorization': `Token ${token}`
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
                <div>
                    <p>Add Task</p>
                </div>
            </div>

            {/* main body */}
            <div className='h-[95%] w-full flex flex-col gap-4 border scrollbar-thin scrollbar-thumb-ocean overflow-scroll'>

                <div>
                    <div>
                        My Tasks
                    </div>

                    <div>
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