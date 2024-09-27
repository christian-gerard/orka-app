import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'



function Nav() {

    const { setToken } = useContext(UserContext)
    const [navOpen, setNavOpen] = useState(false)
    const handleNav = () => setNavOpen(!navOpen)

    const logout = () => {
        setToken(null)
        toast.success('Logging Out')
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
                            <NavLink to='/projects'>
                                <span className='mx-2 italic text-lg hover:text-ocean' >Projects</span>
                            </NavLink>

                        </div>

                        {/* Account Navigation */}
                        <div className='border-t border-white py-2'>
                            <NavLink to='/settings'>
                                <span className='mr-2 italic text-md hover:text-ocean border p-[0.25em]' >Settings</span>
                            </NavLink>
                            <span className='mx-2 italic text-md hover:text-ocean border p-[0.25em]' onClick={logout} >Logout</span>
                        </div>

                    </div>

                </div>

                :

                <>
                </>

            }



            {/* Desktop Menu */}
            <div className='hidden sm:block w-[100px] flex justify-between h-full bg-ocean'>
                <div>

                    <div>
                        LOGO

                    </div>

                    <div>
                        MENU BUTTONS
                    </div>

                </div>

                <div>
                    BOTTOM BUTTONS
                </div>

            </div>
        </div>
    )
}

export default Nav