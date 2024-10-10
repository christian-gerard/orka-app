import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import Task from '../components/Task'
import Client from '../components/Client'
import Project from '../components/Project'



function Dashboard() {
    const { clients, projects, tasks, updateProjects, updateClients, updateTasks } = useContext(UserContext)


    useEffect(() => {
        updateProjects()
        updateClients()
        updateTasks()
    }, [])

    return (
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex items-center'>
                <p className=''>Dashboard</p>
            </div>

            {/* Top Half :: 45%*/}
            <div className='h-[45%] w-full border'>


                <p className='h-[10%] text-2xl flex items-center bg-ocean text-white'>Outstanding Tasks</p>
                <div className='h-[90%] overflow-y-scroll scrollbar scrollbar-thumb-ocean'>
                    <div>

                        {
                            tasks ?

                            tasks.map(task => <Task key={task.id} {...task} />)

                            :

                            "NO TASKS"
                        }

                    </div>
                </div>



            </div>

            {/* Bottom Half 50% */}
            <div className='h-[50%] w-full flex flex-row'>
                {/* Clients */}
                <div className='w-[40%] h-full border'>
                    <p className='h-[10%] text-2xl flex items-center bg-ocean text-white'>Clients</p>
                    <div className='h-[90%] overflow-y-scroll scrollbar scrollbar-thumb-ocean flex flex-row flex-wrap w-full'>
                            {
                                clients ?

                                clients.map(client => <Client key={client.key} {...client} />)

                                :

                                <>
                                </>
                            }
                    </div>
                </div>
                {/* Projects */}
                <div className='w-[60%] h-full border'>
                    <p className='h-[10%] text-2xl flex items-center bg-ocean text-white'>Projects</p>
                    <div className='h-[90%] overflow-y-scroll scrollbar scrollbar-thumb-ocean'>
                        <div>
                            {
                                projects ?

                                projects.map(project => <Project key={project.id} {...project} />)

                                :

                                <>
                                </>
                            }
                        </div>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default Dashboard