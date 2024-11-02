
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'


export const UserContext = createContext()



const UserProvider = ({children}) => {
    const API_URL = import.meta.env.VITE_API_URL
    const [user, setUser] = useState(null)
    const [accountUsers, setAccountUsers] = useState(null)
    const [accountProjects, setAccountProjects] = useState(null)
    const [accountTasks, setAccountTasks] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const logout = () => {
      Cookies.remove('refreshToken', {secure: true})
      setAccessToken(null)
    }

    const renderUsers = () => {
      const token = accessToken


      axios.get(`${API_URL}/api/user/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
      })
      .then(resp => {

          if(resp.status == 200){
              setAccountUsers(resp.data)

          } else if (resp.status == 401){
              toast.error('Unauthorized')
          }
      })

    }

    const renderProjects= () => {
      const token = accessToken


      axios.get(`${API_URL}/api/projects/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
      })
      .then(resp => {

          if(resp.status == 200){
              setAccountProjects(resp.data)

          } else if (resp.status == 401){
              toast.error('Unauthorized')
          }
      })

    }

    const renderTasks = () => {
      const token = accessToken


      axios.get(`${API_URL}/api/tasks/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
      })
      .then(resp => {

          if(resp.status == 200){
              setAccountTasks(resp.data)

          } else if (resp.status == 401){
              toast.error('Unauthorized')
          }
      })
    }

    const refreshToken = () => {

      setIsLoading(true)

      const refreshData = {
        refresh: Cookies.get('refreshToken')
      }

      if(refreshData["refresh"]) {

        axios.post(`${API_URL}/api/user/refresh/`, refreshData)
        .then(resp => {
          if(resp.status == 200){
            setUser(resp.data.user)
            setAccessToken(resp.data.access)

          } else if(resp.status == 401) {
            toast.error('Timed Out: Please Login')
          } else {
            toast.error('Error: Please Login')
          }
        })
        .catch(err => {
          setIsLoading(false)
          console.error("Error:", err); // Log the error for debugging
          throw err
        })

      }

      setIsLoading(false)

    }

    const updateAccountTasks = (editedTask) => {
      const newTasks = accountTasks.filter(task => task.id !== editedTask.id)

      setAccountTasks([...newTasks, editedTask])

      renderTasks()

    }

    useEffect(() => {
      refreshToken()
      renderUsers()

    }, [])

  return (

    <UserContext.Provider
      value={{
        API_URL,
        user,
        setUser,
        accountUsers,
        accountProjects,
        renderProjects,
        renderTasks,
        accountTasks,
        renderUsers,
        updateAccountTasks,
        accessToken,
        setAccessToken,
        isLoading,
        logout
        }} >
        {children}
    </UserContext.Provider>

  )


}


export default UserProvider