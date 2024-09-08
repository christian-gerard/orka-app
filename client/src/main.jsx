import { RouterProvider } from 'react-router-dom'
import router from './utils/routes'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
