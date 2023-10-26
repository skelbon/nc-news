import ButtonAppBar from "./NavBar"
import { useContext, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UserContext, UsersContext } from "./contexts";
import { getUsers } from "../network/network";
import { useNavigate } from 'react-router-dom';

export default function Login(){

    const {user, setUser} = useContext(UserContext)
    const {users, setUsers} = useContext(UsersContext)
    const navigate = useNavigate()
    const handleChange = (event) => {
        setUser(event.target.value);
        navigate("/")
      }
    
    

    console.log(users);
    return (
        <>
        <ButtonAppBar />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Username</InputLabel>
            <Select
              labelId="select-user-input"
              id="demo-simple-select"
              value={user ? user :'nobody'}
              label="Username"
              onChange={handleChange}
            >
              {users.map((user)=>
                <MenuItem value={user.username}>{`${user.username}`}</MenuItem>
              )}
              
            </Select>
          </FormControl>
        </Box>
        </>
      )
}