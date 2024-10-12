import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink, useParams } from 'react-router-dom'
import Expense from '../components/Expense'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function Budget({id, name, deadline, description, project_type, budget, client, expenses}){
    const { token } = useContext(UserContext)
    const route = useParams()
    const [currentBudget, setCurrentBudget] = useState(null)

    useEffect(() => {

        if(route.id !== undefined) {
            fetch(`/api/account/projects/${route.id}`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                credentials: 'include',
            })
            .then(resp => {
                if(resp.ok){
                    return resp.json().then((data) => {
                        setCurrentBudget(data)
                    })
                }
            })
        }

    }, [route.id])

    return(

        <>
        {
            route.id ?

            <div className='w-full h-full border'>

                <div className='h-[5%] flex flex-row justify-between'>

                    <div>

                    <NavLink to='/budgets'>
                        <ArrowBackIcon style={{ width: '45px', height: '45px' }}/>
                    </NavLink>

                    <div>
                        <p>{currentBudget ? currentBudget.budget : 'None'}</p>
                    </div>


                    </div>


                </div>

                <div className='h-[95%] w-full border flex flex-col'>

                    <div className='h-[95%] w-full flex flex-col overflow-y-scroll scrollbar scrollbar-thumb-ocean'>
                        <h1 className='bg-red text-white text-5xl w-full h-full flex justify-center items-center'>WIP</h1>

                    </div>

                    <div className=' h-[5%] w-full flex flex-row'>
                        <div className='h-full w-[80%] border flex justify-end text-2xl px-2 items-center'>
                            <p>TOTAL</p>

                        </div>

                        <div className='h-full w-[20%] border text-xl flex items-center justify-center'>
                            <p>$32,000.0</p>

                        </div>
                    </div>

                </div>





            </div>

            :

            <NavLink to={`/budgets/${id}`} >
                <div className='border w-full h-[100px] flex justify-between flex-col'>
                    <div className='flex flex-row items-center justify-between'>
                        <p className='text-xl'>{name ? name : "No Name"}</p>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        {expenses ? <p>{expenses.length} Entries</p> : "---" }
                        <div className='flex flex-row items-end'>
                        <p className='text-xl sm:text-xl'>$95,000.00</p>
                        <p className='text-xl sm:text-2xl'>/${budget ? budget : "NO BUDGET"}</p>


                        </div>
                    </div>
                </div>
            </NavLink>


        }

        </>
    )
}

export default Budget