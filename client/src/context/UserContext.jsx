
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [account, setAccount] =  useState(null)

    useEffect(() => {
      console.log('Page Refreshed')

    }, [])



  return (

    <UserContext.Provider value={{ user, setUser, token, setToken, account, setAccount }} >
        {children}
    </UserContext.Provider>

  )


}


export default UserProvider