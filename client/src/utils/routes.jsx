import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import Error from './Error'
import Auth from '../components/Auth'
import Dashboard from '../pages/Dashboard'
import Projects from '../pages/Projects'
import Project from '../components/Project'
import Clients from '../pages/Clients'
import Client from '../components/Client'
import Tasks from '../pages/Tasks'
import Budgets from '../pages/Budgets'
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
                path: '/projects/:id',
                element: <Project />
            },
            {
                path: '/clients',
                element: <Clients />,
            },
            {
                path: '/clients/:id',
                element: <Client />,
            },
			{
                path: '/tasks',
                element: <Tasks />,
            },
            {
                path: '/budgets',
                element: <Budgets />,
            },
			{
                path: '/settings',
                element: <Settings />,
            }

		]
	}
])

export default router