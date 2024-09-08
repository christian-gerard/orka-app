import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'



function Nav() {

    const [navOpen, setNavOpen] = useState(false)

    const handleNav = () => {
        setNavOpen(!navOpen)
    }
 
    return(
        <div className='bg-black text-white'>
            {/* Mobile Web Menu */}
            <div className='sm:hidden'>

                {/* Menu Bar + App Title */}
                <div className='text-4xl tracking-[0.6em] p-4 flex flex-row reddit-mono italic'> 
                    <span className='mr-6 hover:text-ocean flex items-center' onClick={handleNav}>
                        ORKA
                    </span>
                </div>

            </div>

            {/* Mobile Dropdown Menu */}
            { navOpen ?

                // Background Blur
                <div className='fixed inset-0 backdrop-blur'>

                    {/* Menu */}
                    <div className='bg-black p-4'>

                        {/* Menu Bar + App Title */}
                        <div className='text-4xl tracking-[0.6em] flex flex-row reddit-mono italic' onClick={handleNav}> 
                            ORKA
                        </div>


                        {/* <div className='bg-white text-black flex justify-center'>
                            <p className='text-2xl p-1'>{user.user.account_details.name ? user.user.account_details.name : 'None'}</p>
                        </div> */}

                        {/* Page Navigation */}
                        <div className='py-4'>
                            <span className='mx-2 italic text-lg hover:text-ocean' >Projects</span>

                        </div>
                                
                        {/* Account Navigation */}
                        <div className='border-t border-white py-2'>
                            <span className='mr-2 italic text-md hover:text-ocean border p-[0.25em]' >Settings</span>
                            <span className='mx-2 italic text-md hover:text-ocean border p-[0.25em]' >Logout</span>
                        </div>

                    </div>

                </div>

                :

                <>
                </>

                }
        </div>
    )
}

export default Nav