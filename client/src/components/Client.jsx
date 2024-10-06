import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Project from '../components/Project'

function Client({ id, name}) {
    const route = useParams()
    const { clients, setClients, token, projects } = useContext(UserContext)
    const [currentClient, setCurrentClient] = useState(null)

    useEffect(() => {

        if(route.id !== undefined){

            fetch(`/api/account/clients/${route.id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                credentials: 'include',
            })
            .then(resp => {
                if(resp.ok){
                    return resp.json().then( data => {
                        setCurrentClient(data)
                    })
                }
            })


        }


    },[route.id])

    return(
        <>

        {
            route.id ?

            <div className='border w-full h-full'>

                <div className='h-[5%] flex flex-row justify-between'>

                <div>

                    <NavLink to='/clients'>
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

                {
                    currentClient ?

                        <div className='w-full h-[95%] px-6 flex flex-col'>

                            <div className='flex flex-row justify-between h-[10%]'>

                                <p className='text-4xl'>{currentClient.name ? currentClient.name : 'No Name'}</p>

                                <p className='text-2xl'>{currentClient.type ? currentClient.type : 'No Type'}</p>

                            </div>

                            <div className='w-full h-[15%] border'>
                                <h1>Current Projects</h1>
                                {
                                    projects ?

                                    // projects.map(project => <Project key={project.id} {...project} />)
                                    <></>

                                    :

                                    <p>No Projects</p>


                                }
                            </div>



                            <div className='overflow-scroll scrollbar scrollbar-thumb-ocean h-[15%] overflow-scroll scrollbar scrollbar-thumb-ocean border'>
                                <p>Assigned Users</p>
                                {currentClient.users ?

                                    currentClient.users.map(user =>
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

                            <div className='overflow-scroll scrollbar scrollbar-thumb-ocean h-[60%] w-full overflow-scroll scrollbar scrollbar-thumb-ocean border'>
                                <p>Contacts</p>
                                {currentClient.contacts ?

                                    currentClient.contacts.map(contact =>
                                        <div className='flex flex-row border'>
                                            <div className='px-2'>
                                                <p>{contact ? contact.first_name: "NONE"}</p>
                                            </div>

                                            <div className='px-2'>

                                            </div>

                                        </div>
                                    )

                                    :

                                    "no current contacts"

                                }
                            </div>

                        </div>

                    :

                    <div>
                        <h1>LOADING LOADING LOADING</h1>
                    </div>

                }
            </div>

            :

            <NavLink to={`/clients/${id}`} className='flex flex-col items-center w-[175px] h-[225px] lg:w-[25%] lg:h-auto bg-red'>
                <div className='rounded-[100%] border w-[150px] h-[150px] bg-ocean'>
                </div>
                <p className='text-2xl'>{name ? name : 'UNNAMED'}</p>
                <p className='text-lg'>{projects ? projects.filter(project => project.id === id).length : '0'} Active Projects</p>
            </NavLink>

        }



        </>

    )
}

export default Client