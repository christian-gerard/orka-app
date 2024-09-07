import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

import Project from './Project'


function Client({id, name, status}) {
    const { user, updateUser, projects } = useContext(UserContext)
    const route = useParams();
    const [currentClient, setCurrentClient] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const nav = useNavigate()


    

    const handleDelete = () => {
        fetch(`http://127.0.0.1:5555/client/${route.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${user.token}`
            }
        })
        .then(resp => {
            if(resp.ok) {

                return resp.json().then(data => {
                    const updatedUser = {
                        ...user,
                        user: {
                            ...user.user,
                            account_details: {
                                ...user.user.account_details,
                                clients: user.user.account_details.clients.filter( client => client.id !== currentClient.id)
                            }
                        }
                    };

                    updateUser(updatedUser)

                    nav('/clients/')
                    toast.success('Client Deleted')

                })
            }
        })
    }

    useEffect(() => {
        if (route.id) { 
            fetch(`http://127.0.0.1:5555/client/${route.id}`,{
                headers: {
                    'Authorization': `Token ${user.token}`
                } 
            })
            .then(resp => {
                if(resp.ok){
                    return resp.json().then((data) => {
                        console.log(data)
                        setCurrentClient(data)
                    })
                }
            })
        }

        }, [route.id]);

    return (

        <>

        {
            route.id ?

            <div className='h-full'>

            
            
            <div className='h-[15%]'>
                <div className='flex flex-row justify-between'>

                    <NavLink to={'/clients'} className='flex flex-row text-xl items-center '>
                        <ArrowBackIcon className='mr-2'/>
                        <p>clients</p>
                    </NavLink>

                    <div>
                        <DeleteIcon onClick={handleDelete} />
                    </div>

                </div>

                <h1 className='text-4xl'>{currentClient ? currentClient.name : 'untitled'}</h1>
                <p>{currentClient ? currentClient.type : 'Inactive'}</p>
                <p>{currentClient ? currentClient.client_img : 'Inactive'}</p>
                <p>{currentClient ? currentClient.isActive : 'Inactive'}</p>

            </div>

            <div className='h-[40%] overflow-y-scroll border border-[0.2px] my-4'>
                <p className='text-lg'> Client Projects</p>
                {
                    projects && currentClient ? projects.filter(project => project.client === currentClient.id).map(project => <Project id={project.id} {...project} />) : <h1>NONE</h1>
                }
            </div>

            <div className='h-[40%] overflow-y-scroll border border-[0.2px] my-4'>
                <p className='text-lg'> Client Contacts</p>
                {/* {
                    projects && currentClient ? projects.filter(project => project.client === currentClient.id).map(project => <Project id={project.id} {...project} />) : <h1>NONE</h1>
                } */}

                <h1>No Contacts Yet</h1>
            </div>
            
            
            </div>


            :

            <NavLink to={`/clients/${id}`} className='text-lg flex flex-col items-center my-2 mx-2'>

                <div className='border border-black  text-lg rounded-[100%] w-[100px] h-[100px] bg-ocean flex flex-col justify-center mx-4'>
                    
                </div>

                <p>{name ? name : 'untitled'}</p>

            </NavLink>


        }
        
        
        </>

    )
}

export default Client