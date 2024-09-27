
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)



  return (

    <UserContext.Provider value={{user, setUser}} >
        {children}
    </UserContext.Provider>

  )


}


export default UserProvider