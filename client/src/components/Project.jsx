import { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'

function Project() {

    return(
        <NavLink to='/'>
            <div className='w-full h-[200px] p-2 border'>
                {/* Project Box Header */}
                <div>
                    <p>Project Title</p>
                </div>

                {/* Project Details */}
                <div>

                </div>
            </div>
        </NavLink>
    )
}

export default Project