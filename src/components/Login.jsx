import ButtonAppBar from "./NavBar"
import { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Login({users}){

    const [userName, setUserName] = useState('')
    
    const handleChange = (event) => {
        setAge(event.target.value);
      }

    return (
        <>
        <ButtonAppBar />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Username</InputLabel>
            <Select
              labelId="select-user-input"
              id="demo-simple-select"
              value={userName}
              label="Username"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        </>
      )
}