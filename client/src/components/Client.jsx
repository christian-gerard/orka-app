import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink, useParams } from 'react-router-dom'

function Client({name,projects}) {
    const route = useParams()
    const { clients, setClients } = useContext(UserContext)


    useEffect(() => {

        if(route.id !== undefined){


        }


    },[route.id])

    return(
        <>
        {
            route.id ?

            <div>
            </div>


            :

            <NavLink to='/' className='m-2 rounded-[100%] flex flex-col items-center'>
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