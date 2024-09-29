import './styles.css'
import {useContext} from 'react'
import { Outlet } from 'react-router-dom'
import {UserContext} from './context/UserContext'
import { Toaster } from 'react-hot-toast'
import Auth from './components/Auth'
import Nav from './components/Nav'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

function CircularSize() {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <CircularProgress size="150px" />
    </Stack>
  );
}



function App() {

const { user, isLoading } = useContext(UserContext)

  return (
    <div className='h-screen w-screen select-none font-montserrat'>

      <Toaster />

      {
        isLoading ?

          <div className='fixed inset-0 bg-white backdrop-blur-sm bg-opacity-30 z-50 flex items-center justify-center'>
            <CircularSize />
          </div>

          :

          <>
          </>

      }

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
