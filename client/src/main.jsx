import { RouterProvider } from 'react-router-dom'
import router from './utils/routes'
import { createRoot } from 'react-dom/client'
import { UserProvider } from '../src/context/UserContext'

createRoot(document.getElementById('root')).render(
    <UserProvider>
        <RouterProvider router={router} />
    </UserProvider>
)
