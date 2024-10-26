import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import Task from '../components/Task'
import Client from '../components/Client'
import Project from '../components/Project'



function Dashboard() {
    const { } = useContext(UserContext)

    const [outstandingTasks, setOutstandingTasks] = useState(null)
    const [myProjects, setMyProjects] = useState(null)

    const renderOutstandingTasks = () => {


    }

    const renderMyProjects = () => {


    }


    useEffect(() => {

    }, [])

    return (
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex items-center justify-between'>
                <p className=''>Dashboard</p>
                <div>Refresh</div>
            </div>

            {/* Top Half :: 45%*/}
            <div className='h-[45%] w-full border'>
                <p className='h-[10%] text-2xl flex items-center bg-ocean text-white'>Outstanding Tasks</p>
                <div className='h-[90%] overflow-y-scroll scrollbar scrollbar-thumb-ocean'>
                    <div className='h-full w-full'>

                        {
                            outstandingTasks && outstandingTasks.length !== 0 ?

                            outstandingTasks
                            .filter(task => task.status !== 'Complete')
                            .sort((a, b) => a.status.localeCompare(b.status))
                            .map(task => <Task key={task.id} {...task} />)

                            :

                            <p className='text-3xl w-full h-full text- flex justify-center items-center'>No Current Tasks</p>
                        }

                    </div>
                </div>



            </div>

            {/* Bottom Half 50% */}
            <div className='h-[50%] w-full flex flex-row'>
                {/* Projects */}
                <div className='w-full h-full border'>
                    <p className='h-[10%] text-2xl flex items-center bg-ocean text-white'>Projects</p>
                    <div className='h-[90%] overflow-y-scroll scrollbar scrollbar-thumb-ocean'>
                        <div className='h-full w-full'>
                            {
                                myProjects ?

                                myProjects.map(project => <Project key={project.id} {...project} />)

                                :

                                <p className='text-3xl w-full h-full text- flex justify-center items-center'>No Current Projects</p>
                            }
                        </div>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default Dashboard