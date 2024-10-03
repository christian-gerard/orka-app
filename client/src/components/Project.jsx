import { useEffect, useState, useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Project({id, name, deadline, description, project_type}) {

    const route = useParams()
    const [currentProject, setCurrentProject] = useState(null)

    useEffect(() => {

        if(route.id !== undefined){

            fetch(`/api/account/projects/${route.id}`)
            .then(resp => {
                if(resp.ok){
                    return resp.json().then( data => {
                        setCurrentProject(data)
                    })
                }
            })

        }



    }, [route.id])

    return(
        <>

        {
            route.id ?

            <div className='h-full w-full border'>

                <div className='h-[5%] flex flex-row justify-between'>

                    <div>

                    <NavLink to='/projects'>
                        <ArrowBackIcon style={{ width: '45px', height: '45px' }}/>
                    </NavLink>


                    </div>

                    <div className='flex gap-2'>


                        <NavLink>
                            <DeleteIcon style={{ width: '45px', height: '45px' }}/>
                        </NavLink>


                        <NavLink>
                            <EditIcon style={{ width: '45px', height: '45px' }}/>
                        </NavLink>

                    </div>


                </div>

                { currentProject ?


                    <div className=' h-[95%] w-full '>

                        <div className='h-[10%] flex flex-row justify-between px-6'>

                            <p className='text-5xl flex items-center'>{currentProject.name ? currentProject.name : "name not known"}</p>
                            <p className='text-3xl flex items-center'>{currentProject.deadline ? currentProject.deadline: "No Deadline"}</p>

                        </div>

                        <div className='bg-white h-[90%] w-full px-6'>

                            <div className='overflow-scroll scrollbar scrollbar-thumb-ocean h-[5%]'>
                                {currentProject.project_type ? currentProject.project_type : "Description Not Listed"}
                            </div>

                            <div className='overflow-scroll scrollbar scrollbar-thumb-ocean h-[20%]'>
                                {currentProject.description ? currentProject.description : "Description Not Listed"}
                            </div>

                            <div className='overflow-scroll scrollbar scrollbar-thumb-ocean h-[15%] overflow-scroll scrollbar scrollbar-thumb-ocean border'>
                                <p>Assigned Users</p>
                                {currentProject.users ?

                                    currentProject.users.map(user =>
                                        <div className='flex flex-row border'>
                                            <div className='px-2'>
                                                <p>{user.first_name} {user.last_name}</p>
                                            </div>

                                            <div className='px-2'>
                                                <p>{user.email}</p>
                                            </div>

                                        </div>
                                    )

                                    :

                                    "no current users"

                                }
                            </div>

                            <div className='border h-[60%] flex flex-row'>

                                <div className='border h-full w-[60%]'>
                                    <h1>TASKS</h1>
                                </div>

                                <div className='border h-full w-[40%]'>
                                    <h1>Budget</h1>
                                </div>

                            </div>




                        </div>

                    </div>



                    :

                    <p>LOADING</p>

                }



            </div>

            :

            <NavLink to={`/projects/${id}`}>
                <div className='w-full h-[150px] p-2 border'>
                    {/* Project Box Header */}
                    <div className='flex flex-row justify-between h-[20%] border-b'>
                        <p className='text-2xl'>{name ? name : 'Untitled'}</p>
                        <p className='text-lg'>{deadline ? deadline : 'No Deadline'}</p>
                    </div>

                    {/* Project Details */}
                    <div className='flex flex-col justify-between h-[80%]'>
                        <p className='scrollbar overflow-scroll text-sm h-[70%]'>
                            {description ? description : "No Description Available"}
                        </p>
                        <p className='h-[30%] text-lg'>
                            {project_type ? project_type : 'No Type'}
                        </p>

                    </div>
                </div>
            </NavLink>



        }
        </>
    )
}

export default Project