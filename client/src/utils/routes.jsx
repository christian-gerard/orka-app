import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import Error from './Error'
import Auth from '../components/Auth'
import Accounts from '../pages/Accounts'
import Projects from '../pages/Projects'
import Settings from '../pages/Settings'


const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
            {
                path: '/',
                element: <Accounts/>,
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
                path: '/settings',
                element: <Settings />,
            }

		]
	}
])

export default router