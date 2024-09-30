import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import Error from './Error'
import Auth from '../components/Auth'
import Dashboard from '../pages/Dashboard'
import Projects from '../pages/Projects'
import Clients from '../pages/Clients'
import Settings from '../pages/Settings'


const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/login',
                element: <Auth />,
            },
			{
                path: '/projects',
                element: <Projects />,
            },
            {
                path: '/clients',
                element: <Clients />,
            },
			{
                path: '/settings',
                element: <Settings />,
            }

		]
	}
])

export default router