import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import Error from './Error'
import Auth from '../components/Auth'



const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
            {
                path: '/login',
                element: <Auth />,
            }

		]
	}
])

export default router