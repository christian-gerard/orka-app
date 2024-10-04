
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [projects, setProjects] = useState(null)
    const [clients, setClients] = useState(null)
    const [account, setAccount] =  useState(null)
    const [tasks, setTasks] =  useState(null)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

      fetch('/api/account/accounts',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        credentials: 'include',
      })
      .then(resp => {
        if(resp.ok){
          return resp.json().then(data => {
            setUser(data)
            console.log(data[0])
            setAccount(data[0])
            setClients(data[0].clients)

          })
        }
      })



    }, [])



  return (

    <UserContext.Provider value={{ user, setUser, account, setAccount, isLoading, projects, setProjects, clients, setClients, token, setToken}} >
        {children}
    </UserContext.Provider>

  )


}


export default UserProvider