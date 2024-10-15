
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

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

function setCookie(name, value, days = 7) {
  const date = new Date();
  // Set the expiration date, default is 7 days
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  // Set the cookie with the name, value, expiration date, and path
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
}

function clearAllCookies() {
  // Get all the cookies as a single string
  const cookies = document.cookie.split(";");

  // Loop through all cookies and delete them
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      // Set the cookie's expiry date to a past date to delete it
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }

}


export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [accounts, setAccounts] =  useState(null)
    const [projects, setProjects] = useState(null)
    const [clients, setClients] = useState(null)
    const [expenses, setExpenses] = useState(null)
    const [tasks, setTasks] =  useState(null)
    const [token, setToken] = useState(null)
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
      fetch('/api/user/logout/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' ,
            'Authorization': `Token ${token}`
        },
        credentials: 'include',
        })
        .then( resp => {
            if(resp.ok){
              setUser(null)
              toast.success('Logout Successful')
            }
        }

        )
      clearAllCookies()

    }

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
            setAccount(data[0])
            setClients(data[0].clients)

          })
        }
      })

      setToken(getCookie('token'))

    }, [])



  return (

    <UserContext.Provider
      value={{
        user,
        setUser,
        accounts,
        setAccounts,
        updateAccounts,
        isLoading,
        projects,
        setProjects,
        clients,
        setClients,
        token,
        setToken,
        setCookie,
        getCookie,
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