import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'
import TsunamiIcon from '@mui/icons-material/Tsunami';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import DetailsIcon from '@mui/icons-material/Details';
import LogoutIcon from '@mui/icons-material/Logout';



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
                <div className='text-4xl tracking-[0.6em] p-4 flex flex-row '>

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
                        <div className='text-4xl tracking-[0.6em] flex flex-row reddit-mono text-ocean' onClick={handleNav}>
                            ORKA
                        </div>

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
            <div className='hidden sm:block w-[100px] h-full '>
                <div className='flex flex-col w-full h-full justify-between text-[1em] text-center'>

                    <div className='flex flex-col pt-10 bg-black'>

                        <NavLink to='/' className='hover:text-ocean'>
                            <TsunamiIcon style={{ width: '45px', height: '45px' }}/>
                        </NavLink>

                    </div>

                    <div className='flex flex-col pt-10 bg-black gap-6'>

                        <NavLink to='/projects' className='hover:text-ocean'>
                            <DetailsIcon style={{ width: '45px', height: '45px' }}/>
                        </NavLink>

                        <NavLink to='/clients' className='hover:text-ocean'>
                            <GroupIcon style={{ width: '45px', height: '45px' }}/>
                        </NavLink>

                    </div>

                    <div className='flex flex-col gap-4 bg-black pb-8'>

                        <NavLink to='/settings' className='hover:text-ocean'>
                            <SettingsIcon style={{width: '45px', height: '45px'}} />
                        </NavLink>

                        <NavLink to='/' className='hover:text-ocean' onClick={logout}>
                            <LogoutIcon style={{width: '45px', height: '45px'}} />
                        </NavLink>

                    </div>

                </div>
            </div>



        </div>
    )
}

export default Nav