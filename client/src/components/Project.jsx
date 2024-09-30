import { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'

function Project() {

    return(
        <NavLink to='/'>
            <div className='w-full h-[150px] p-2 border'>
                {/* Project Box Header */}
                <div className='flex flex-row justify-between h-[20%] border-b'>
                    <p className='text-2xl'>Project Title</p>
                    <p className='text-lg'>Deadline</p>
                </div>

                {/* Project Details */}
                <div className='flex flex-col justify-between h-[80%]'>
                    <p className='scrollbar overflow-scroll text-sm h-[70%]'>Description field where the general description of the project will be held. I should probably limit this by characters at one point but idk
                    </p>
                    <p className='h-[30%] text-lg'>Client Name Here</p>

                </div>
            </div>
        </NavLink>
    )
}

export default Project