import { useState, useEffect, useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Expense from '../components/Expense'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function Budget({id, name, deadline, description, project_type, budget}){
    const route = useParams()
    const [currentBudget, setCurrentBudget] = useState(null)

    useEffect(() => {

        if(route.id !== undefined) {
            fetch(`/api/account/projects/${route.id}`)
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


                    </div>


                </div>

                <div className='h-[95%] w-full border flex flex-col'>

                    <div className='h-[95%] w-full flex flex-row'>
                        <div className='h-full w-[80%] border'>

                        </div>

                        <div className='h-full w-[20%] border'>

                        </div>

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
                <div className='border w-full h-[100px]'>
                    <p>{name ? name : "No Name"}</p>
                    <p>{budget ? budget : "NO BUDGET"}</p>
                    <p>{deadline ? deadline : "No Deadline"}</p>
                </div>
            </NavLink>


        }

        </>
    )
}

export default Budget