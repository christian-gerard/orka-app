import { NavLink } from 'react-router-dom'

function Client() {
    return(

        <NavLink to='/' className='m-2 rounded-[100%] flex flex-col items-center'>
            <div className='rounded-[100%] border w-[200px] h-[200px] bg-ocean'>
            </div>
            <p className='text-2xl'>Client</p>
        </NavLink>
    )
}

export default Client