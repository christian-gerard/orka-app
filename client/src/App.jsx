import './styles.css'
import {useContext} from 'react'
import {UserContext} from './context/UserContext'
import { Toaster } from 'react-hot-toast'
import Auth from './components/Auth'


function App() {

  // const { user } = useContext(UserContext)

  return (
    <div className='text-2xl text-black'>
      <Toaster />
      { 0 ? 
        <div className='h-full w-full flex flex-col sm:flex-row'>
            <div className='p-4 w-full h-full'>
              {/* <Outlet /> */}
              <h1>Orka</h1>
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
