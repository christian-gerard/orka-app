import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'

// import MenuIcon from '@mui/icons-material/Menu';
// import GridViewIcon from '@mui/icons-material/GridView';
// import DetailsIcon from '@mui/icons-material/Details';
// import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import TaskAltIcon from '@mui/icons-material/TaskAlt';


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


                                Dashboard



                                Projects



                                Clients



                                Tasks




                                Budgets


                        </div>
                                
                        {/* Account Navigation */}
                        <div className='border-t border-white py-2 '>

                                Settings


                                Logout

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