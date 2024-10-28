
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'


export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const logout = () => {
      Cookies.remove('refreshToken', {secure: true})
      setAccessToken(null)

    }

    const refreshToken = () => {

      setIsLoading(true)

      const refreshData = {
        refresh: Cookies.get('refreshToken')
      }

      if(refreshData["refresh"]) {

        axios.post(`/api/user/refresh/`, refreshData)
        .then(resp => {
          if(resp.status == 200){

            const access = resp.data.access

            axios.get(`/api/user/`, {
              headers: {
                Authorization: `Bearer ${access}`
              }
            })
            .then(resp => {
              if(resp.status == 200){
                setUser(resp.data)
                setAccessToken(access)
              } else if(resp.status == 401) {
                toast.error('Invalid Login')
              }
            })


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

    useEffect(() => {
      refreshToken()

    }, [])

  console.log(user)

  return (

    <UserContext.Provider
      value={{
        user,
        setUser,
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