import { useContext } from 'react'
import Project from '../components/Project'
import Client from '../components/Client'
import Task from '../components/Task'
import { UserContext } from '../context/UserContext'
import GridViewIcon from '@mui/icons-material/GridView';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DetailsIcon from '@mui/icons-material/Details';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import TaskAlt from '@mui/icons-material/TaskAlt'


function Dashboard() {

    const { projects, tasks, clients } = useContext(UserContext)

    return(
        <div className='flex flex-col h-full w-full overflow-hidden'>
            {/* Page Header */}
            <div className='flex flex-row items-center mb-2 h-[5%]'>
                <GridViewIcon fontSize='small' />
                <p className='text-lg ml-2'>Dashboard</p>
            </div>

            {/* Outstanding Tasks */}
            <div className='border border-[0.2px] h-[45%] '>

                <div className='text-lg p-1 h-[10%] flex flex-row items-center'>
                    <TaskAltIcon fontSize='small' />
                    <p className='text-lg ml-2 '>Outstanding Tasks</p>
                </div>


                <div className='overflow-y-scroll h-[90%] '>

                    {
                        tasks.length !== 0 ?

                        tasks.map((task) => 
                            <Task id={task.id} {...task} />
                        )

                        :

                        <div className='h-full w-full flex justify-center items-center'>

                            <h1 className='text-3xl italic mx-2'> No Outstanding Tasks </h1>

                        </div>
                        

                    }

                </div>

            </div>

            {/* Projects */}
            <div className='border border-[0.2px] my-4 h-[25%] flex justify-between flex-col'>

                <div className='text-lg p-1 h-[10%] flex flex-row items-center'>
                    <DetailsIcon fontSize='small' />
                    <p className='text-lg ml-2 '>Projects</p>
                </div>

                <div className='overflow-x-scroll h-[95%] flex flex-row items-center overflow-hidden'>
  
                    {
                        projects.length !== 0 ?

                        projects.map((project) => 

                            <Project id={project.id} {...project} />

                        )

                        :

                        <div className='h-full  flex justify-center items-center'>

                            <h1 className='text-3xl italic mx-2'> No Current Projects </h1>

                        </div>
                    }

                </div>

            </div>

            {/* Clients */}
            <div className='border border-[0.2px] h-[25%] overflow-hidden'>

                <div className='text-lg p-1 h-[10%] flex flex-row items-center'>
                    <PeopleOutlineIcon fontSize='small' />
                    <p className='text-lg ml-2 '>Clients</p>
                </div>

                <div className='overflow-x-scroll h-[90%] flex flex-row items-center'>

                    {
                        clients.length !== 0 ?

                        clients.map((client) => 
                            <Client id={client.id} {...client} />
                        )

                        :

                        <div className='h-full w-full flex justify-center items-center'>

                            <h1 className='text-3xl italic mx-2'> No Current Clients</h1>

                        </div>
                    }

                </div>

            </div>

        </div>
    )
}

export default Dashboard