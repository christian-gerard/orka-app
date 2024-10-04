
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [projects, setProjects] = useState(null)
    const [clients, setClients] = useState(null)
    const [account, setAccount] =  useState(null)
    const [tasks, setTasks] =  useState(null)
    const [authenticated, setAuthenticated] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

      fetch('/api/user/me/',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
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

      console.log('USER' + user)

    }, [])



  return (

    <UserContext.Provider value={{ user, setUser, account, setAccount, isLoading, projects, setProjects, clients, setClients, token, setToken}} >
        {children}
    </UserContext.Provider>

  )


}


export default UserProvider