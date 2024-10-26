
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'


export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [account, setAccount] =  useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const logout = () => {
      console.log('MAKE THIS CLEAR ALL COOKIES')

    }

    const refreshToken = () => {

      const refreshData = {
        refresh: Cookies.get('refreshToken')
      }

      if(refreshData["refresh"]) {

        axios.post('/api/user/me/', refreshData)
        .then(resp => {
          if(resp.status == 200){
            console.log(resp.data)
          } else if(resp.status == 401) {
            toast.error('Timed Out: Please Login')
          } else {
            toast.error('Error: Please Login')
          }
        })
        .catch(err => {
          console.error("Error:", err); // Log the error for debugging
          throw err
        })

      }

    }

    useEffect(() => {
      refreshToken()

    }, [])



  return (

    <UserContext.Provider
      value={{
        user,
        setUser,
        account,
        setAccount,
        accessToken,
        setAccessToken,
        logout
        }} >
        {children}
    </UserContext.Provider>

  )


}


export default UserProvider