import { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'

function Project({name, deadline, description, project_type}) {

    return(
        <NavLink to='/'>
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
    )
}

export default Project