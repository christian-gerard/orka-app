import './styles.css'
import {useContext} from 'react'
import { Outlet } from 'react-router-dom'
import {UserContext} from './context/UserContext'
import { Toaster } from 'react-hot-toast'
import Auth from './components/Auth'
import Nav from './components/Nav'


function App() {

const { user } = useContext(UserContext)

  return (
    <div className='h-screen w-screen select-none'>

      <Toaster />

      { user ?

        <div className='h-full w-full flex flex-col sm:flex-row'>
            <Nav />
            <div className='p-4 w-full h-full'>
              <Outlet />
            </div>
        </div>

        :

        <div className='h-full flex items-center justify-center'>
          <Auth />
        </div>
      }

    </div>
  )
}

export default App
