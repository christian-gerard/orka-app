
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [account, setAccount] =  useState(null)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

      fetch('/api/user/me',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' ,
        },
        credentials: 'include',
      })
      .then(resp => {
        if(resp.ok){
          return resp.json().then(data => {

            setUser(data)

          })
        }
      })

      setIsLoading()

    }, [])



  return (

    <UserContext.Provider value={{ user, setUser, account, setAccount, isLoading }} >
        {children}
    </UserContext.Provider>

  )


}


export default UserProvider