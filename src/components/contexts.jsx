import {useState, createContext} from "react";


export const UserContext = createContext();
export const UsersContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const UsersProvider = ({children}) => {
    const [users, setUsers] = useState(null);

    return (
        <UsersContext.Provider value={{users, setUsers}}>
            {children}
        </UsersContext.Provider>
    );
};