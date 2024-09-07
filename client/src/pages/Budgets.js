import { useState,useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Project from '../components/Project'

function Budgets() {
    const { projects } = useContext(UserContext)


    return (
        <>
            {/* Page Header */}
            <div className='flex flex-row items-center justify-between mb-2 h-[5%]'>
                <div className='flex flex-row items-center'>
                    <AttachMoneyIcon fontSize='small' />
                    <p className='text-lg ml-2'>Budgets</p>
                </div>
            </div>

            {/* Budgets */}
            <div className='border border-[0.2px] h-[100%] overflow-y-scroll h-[95%]'>

                {
                    projects ?

                    projects.map(project => {
                        return (
                        <NavLink to={`/budgets/${project.id}`}>
                            <div className='border border-[0.2px] my-4 mx-4 p-2'>
                                <p>{project.name}</p>
                                <p>${project.budget}.00</p>
                            </div>
                        </NavLink>
                        )
                    })

                    :

                    <h1> No Budgets</h1>
                }

            </div>
        
        
        </>
    )
}

export default Budgets