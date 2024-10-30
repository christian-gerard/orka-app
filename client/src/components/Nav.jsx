import { useState, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'
import TsunamiIcon from '@mui/icons-material/Tsunami';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import DetailsIcon from '@mui/icons-material/Details';
import LogoutIcon from '@mui/icons-material/Logout';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import Task from './Task';
import Account from '../components/Account'



function Nav() {

    const { logout, accounts, updateAccounts } = useContext(UserContext)
    const loc = useLocation()
    const [navOpen, setNavOpen] = useState(false)
    const [acctMenuOpen, setAcctMenuOpen] = useState(false)
    const handleNav = () => setNavOpen(!navOpen)
    const handleAcctMenu = () => {
        updateAccounts()
        setAcctMenuOpen(!acctMenuOpen)
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
                <div className='fixed sm:hidden inset-0 backdrop-blur '>

                    {/* Menu */}
                    <div className='bg-black p-4'>

                        {/* Menu Bar + App Title */}
                        <div className='text-4xl tracking-[0.6em] flex flex-row reddit-mono text-ocean' onClick={handleNav}>
                            ORKA
                        </div>

                        {/* Page Navigation */}
                        <div className='py-4 flex flex-wrap'>

                            <NavLink to='/' onClick={handleNav}>
                                <span className='mx-2 italic text-lg hover:text-ocean' >Dashboard</span>
                            </NavLink>

                            <NavLink to='/projects' onClick={handleNav}>
                                <span className='mx-2 italic text-lg hover:text-ocean' >Projects</span>
                            </NavLink>

                            <NavLink to='/clients' onClick={handleNav}>
                                <span className='mx-2 italic text-lg hover:text-ocean' >Clients</span>
                            </NavLink>

                            <NavLink to='/tasks' onClick={handleNav}>
                                <span className='mx-2 italic text-lg hover:text-ocean' >Tasks</span>
                            </NavLink>

                            {/* <NavLink to='/budgets' onClick={handleNav}>
                                <span className='mx-2 italic text-lg hover:text-ocean' >Budgets</span>
                            </NavLink> */}

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

                        <NavLink to='/' className={ loc.pathname === '/' ? 'hover:text-white text-ocean' : 'hover:text-ocean text-white'}>
                            <TsunamiIcon style={{ width: '45px', height: '45px' }}/>
                        </NavLink>

                    </div>

                    <div className='flex flex-col pt-10 bg-black gap-6'>

                        <NavLink to='/projects' className={ loc.pathname === '/projects' ? 'hover:text-white text-ocean' : 'hover:text-ocean text-white'}>
                            <DetailsIcon style={{ width: '45px', height: '45px' }}/>
                        </NavLink>

                        <NavLink to='/clients' className={ loc.pathname === '/clients' ? 'hover:text-white text-ocean' : 'hover:text-ocean text-white'}>
                            <GroupIcon style={{ width: '45px', height: '45px' }}/>
                        </NavLink>

                        <NavLink to='/tasks' className={ loc.pathname === '/tasks' ? 'hover:text-white text-ocean' : 'hover:text-ocean text-white'}>
                            <TaskAltIcon style={{ width: '45px', height: '45px' }}/>
                        </NavLink>

                        {/* <NavLink to='/budgets' className={ loc.pathname === '/budgets' ? 'hover:text-white text-ocean' : 'hover:text-ocean text-white'}>
                            <AttachMoneyIcon style={{ width: '45px', height: '45px' }}/>
                        </NavLink> */}

                    </div>

                    <div className='flex flex-col gap-4 bg-black pb-8 border-t border-white'>

                        <div className='hover:text-ocean flex justify-center mt-4' >
                            <div className='h-[45px] w-[45px] rounded-[100%] border flex items-center justify-center text-[1em]'> J&M </div>
                        </div>

                        <NavLink to='/settings' className={ loc.pathname === '/settings' ? 'hover:text-white text-ocean' : 'hover:text-ocean text-white'}>
                            <SettingsIcon style={{width: '45px', height: '45px'}} />
                        </NavLink>

                        <NavLink to='/' className='hover:text-ocean' onClick={logout}>
                            <LogoutIcon style={{width: '45px', height: '45px'}} />
                        </NavLink>

                    </div>

                </div>
            </div>

            {
                acctMenuOpen ?

                <div className='fixed inset-0 flex flex-col justify-center items-center transition-colors backdrop-blur text-black'>

                    <div className='bg-white  border h-[500px] w-[350px] lg:h-[50%] lg:w-[40%] '>
                            <div className='h-[5%] w-full flex items-center m-4'>

                                <CloseIcon  className='mr-6' style={{width: '40px', height: '40px'}} onClick={handleAcctMenu} />
                                <label className='text-2xl'> Choose Account </label>

                            </div>

                            <div className='h-[95%] w-full flex items-center'>
                                <div className='flex flex-row flex-wrap gap-4 mx-4'>
                                    {
                                        accounts ?

                                        accounts.map(acct => <Account key={acct.id} {...acct}/>)

                                        :

                                        <>
                                        </>

                                    }
                                </div>
                            </div>



                    </div>

                </div>

                :

                <></>
            }



        </div>
    )
}

export default Nav