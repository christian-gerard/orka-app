import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Error from './Error'
import Auth from '../components/Auth'
import Project from '../components/Project'
import Dashboard from '../pages/Dashboard'
import Projects from '../pages/Projects'
import Clients from '../pages/Clients'
import Client from '../components/Client'
import Settings from '../pages/Settings'
import Tasks from '../pages/Tasks'
import Budgets from '../pages/Budgets'
import Budget from '../components/Budget'
import Welcome from '../pages/Welcome'



const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
            {
                path: '/login',
                element: <Auth />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/projects',
                element: <Projects />,
            },
            {
                path: '/projects/:id',
                element: <Project />,
            },
            {
                path: '/clients',
                element: <Clients />,
            },
            {
                path:'/clients/:id',
                element: <Client />
            },
            {
                path: '/settings',
                element: <Settings />,
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
                path: '/budgets/:id',
                element: <Budget />,
            }

		]
	},
    {
        path: '/welcome',
		element: <Welcome />,
    }
])

export default router