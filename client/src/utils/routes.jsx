import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import Error from './Error'
import Auth from '../components/Auth'
import Projects from '../pages/Projects'
import Settings from '../pages/Settings'



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