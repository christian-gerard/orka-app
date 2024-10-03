import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Task from '../components/Task'
import Client from '../components/Client'
import Project from '../components/Project'



function Dashboard() {
    const { clients, projects } = useContext(UserContext)

    return (
        <div className='h-full w-full'>
            {/* Page Header 10%*/}
            <div className='h-[5%] w-full text-3xl flex items-center'>
                <p className=''>Dashboard</p>
            </div>

            {/* Top Half :: 45%*/}
            <div className='h-[45%] w-full border'>


                <p className='h-[5%]'>Outstanding Tasks</p>
                <div className='h-[95%] overflow-scroll-y scrollbar scrollbar-thumb-ocean overflow-scroll'>
                    <div>
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                    </div>
                </div>



            </div>

            {/* Bottom Half 50% */}
            <div className='h-[50%] w-full flex flex-row'>
                {/* Clients */}
                <div className='w-[50%] h-full border'>
                    <p className='h-[5%]'>Clients</p>
                    <div className='h-[95%] overflow-scroll-y scrollbar scrollbar-thumb-ocean overflow-scroll'>
                        <div>
                            {
                                clients ?

                                clients.map(client => <Client key={client.key} {...client} />)

                                :

                                <>
                                </>
                            }
                        </div>
                </div>

                </div>
                {/* Projects */}
                <div className='w-[50%] h-full border'>
                    <p className='h-[5%]'>Projects</p>
                    <div className='h-[95%] overflow-scroll-y scrollbar scrollbar-thumb-ocean overflow-scroll'>
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