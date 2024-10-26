
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'


export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [account, setAccount] =  useState(null)
    const [projects, setProjects] = useState(null)
    const [clients, setClients] = useState(null)
    const [expenses, setExpenses] = useState(null)
    const [tasks, setTasks] =  useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const updateProjects = () => {
      fetch('/api/account/projects/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' ,
            'Authorization': `Token ${token}`
        },
        credentials: 'include',
        })
        .then( resp => {
            if(resp.ok){
                return resp.json().then(data => {
                    setProjects(data)
                })
            }
        }

        )

    }

    const updateClients = () => {
      fetch('/api/account/clients', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        credentials:'include'
      })
      .then(resp => {
          if(resp.ok){
              return resp.json().then(data => {
                  setClients(data)
              })
          }
      })

    }

    const updateTasks = () => {
      fetch('/api/project/tasks', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        credentials: 'include',
      })
      .then(resp => {
          if(resp.ok){
              return resp.json().then(data => {
                  setTasks(data)
              })
          }
      })

    }

    const updateAccounts = () => {
      fetch('/api/account/accounts/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' ,
            'Authorization': `Token ${token}`
        },
        credentials: 'include',
        })
        .then( resp => {
            if(resp.ok){
                return resp.json().then(data => {
                    setAccounts(data)
                })
            }
        }

        )
    }

    const updateExpenses = () => {
      fetch('/api/project/expenses/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' ,
            'Authorization': `Token ${token}`
        },
        credentials: 'include',
        })
        .then( resp => {
            if(resp.ok){
                return resp.json().then(data => {
                    setExpenses(data)
                })
            }
        }

        )
        .catch(err => console.log(err))
    }

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
        updateAccounts,
        isLoading,
        projects,
        setProjects,
        clients,
        setClients,
        accessToken,
        setAccessToken,
        tasks,
        setTasks,
        updateProjects,
        updateClients,
        updateTasks,
        expenses,
        setExpenses,
        updateExpenses,
        logout
        }} >
        {children}
    </UserContext.Provider>

  )


}


export default UserProvider