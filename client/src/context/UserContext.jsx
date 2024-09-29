
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
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

          })
          .then(
            setIsLoaded(true)
          )
        }
      })


    }, [])



  return (

    <UserContext.Provider value={{ user, setUser, account, setAccount, isLoaded }} >
        {children}
    </UserContext.Provider>

  )


}


export default UserProvider