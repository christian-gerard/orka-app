import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'
import Task from '../components/Task'
import Project from '../components/Project'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

function Dashboard() {
    const {accessToken} = useContext(UserContext)

    const [outstandingTasks, setOutstandingTasks] = useState(null)
    const [myProjects, setMyProjects] = useState(null)

    const renderOutstandingTasks = () => {

        const token = accessToken
        let tasks = null


        axios.get(`${API_URL}/api/tasks/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {
            if(resp.status == 200){
                tasks = resp.data
                if(tasks && tasks.length !== 0) {
                    setOutstandingTasks(
                        tasks
                        .filter(task => task.status !== 'Complete')
                        .sort((a, b) => a.status.localeCompare(b.status))
                        .map(task => <Task key={task.id} {...task} />)
                    )

                } else {
                    setOutstandingTasks(<p className='text-3xl w-full h-full text- flex justify-center items-center'>No Current Tasks</p>)
                }
            } else if (resp.status == 401){
                toast.error('Unauthorized')
            }
        })


    }

    const renderMyProjects = () => {

        const token = accessToken
        let projects = null


        axios.get(`${API_URL}/api/projects/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {

            if(resp.status == 200){
                projects = resp.data
                if(projects && projects.length !== 0) {
                    setMyProjects(
                        projects
                        .map(proj => <Project key={proj.id} {...proj} />)
                    )
                } else {
                    setMyProjects(<p className='text-3xl w-full h-full text- flex justify-center items-center'>No Current Projects</p>)
                }
            } else if (resp.status == 401){
                toast.error('Unauthorized')
            }
        })
    }


    useEffect(() => {
        renderOutstandingTasks()
        renderMyProjects()
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
                            outstandingTasks
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
                                myProjects
                            }
                        </div>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default Dashboard