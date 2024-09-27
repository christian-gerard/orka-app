
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [account, setAccount] =  useState(null)

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
            console.log(data)
            setUser(data)
            toast.success(`YE IT WORKED`)

          })}
      })

    }, [])



  return (

    <UserContext.Provider value={{ user, setUser, token, setToken, account, setAccount }} >
        {children}
    </UserContext.Provider>

  )


}


export default UserProvider