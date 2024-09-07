import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu';
import GridViewIcon from '@mui/icons-material/GridView';
import DetailsIcon from '@mui/icons-material/Details';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TaskAltIcon from '@mui/icons-material/TaskAlt';


function Nav() {

    // const { logout, user } = useContext(UserContext)

    const [navOpen, setNavOpen] = useState(true)

    const handleNav = () => {
        setNavOpen(!navOpen)
    }

    return(
        <div>
            NAV
        </div>
    )
}

export default Nav