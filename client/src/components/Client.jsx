import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Client({ id, name, projects }) {
    const route = useParams()
    const { clients, setClients } = useContext(UserContext)
    const [currentClient, setCurrentClient] = useState(null)


    useEffect(() => {

        if(route.id !== undefined){

            fetch(`/api/account/clients/${route.id}`)
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

                        <div className='h-[95%] px-6'>
                            {currentClient.name ? currentClient.name : 'No Name'}
                        </div>

                    :

                    <div>
                        <h1>LOADING LOADING LOADING</h1>
                    </div>

                }


            </div>


            :

            <NavLink to={`/clients/${id}`} className='m-2 rounded-[100%] flex flex-col items-center'>
                <div className='rounded-[100%] border w-[200px] h-[200px] bg-ocean'>
                </div>
                <p className='text-2xl'>{name ? name : 'Unnamed'}</p>
                <p className='text-2xl'>{projects ? projects.length : '0'} Active Projects</p>
            </NavLink>

        }



        </>

    )
}

export default Client