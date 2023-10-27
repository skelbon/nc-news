import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';


export default function SortBar({sortBy, setSortBy, order, setOrder}) {


    
    const handleOrderChange = (e)=>{
        setOrder(e.target.value)
    }
    
    const handleSortChange = (e)=>{
        setSortBy(e.target.value)
    }
    
    return (
        <>
        <Stack 
            direction="row"
            // spacing={4}
            // whiteSpace={}
        >
        <FormControl variant='standard' autowidth sx={{minWidth: '120px', marginRight: '20px', marginLeft: 'auto', height: '20px'}}>
            <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
            <Select
                autoWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                label="Sort by"
                onChange={handleSortChange}
                sx={{height: '75%'}}
            >
                <MenuItem value={'created_at'}>Date created</MenuItem>
                <MenuItem value={'comment_count'}>Comment count</MenuItem>
                <MenuItem value={'votes'}>Vote count</MenuItem>
            </Select>
            </FormControl>
        <FormControl>
        <RadioGroup
            row
            sx={{marginBottom : '5px'}}
            aria-labelledby="sorr-order-label"
            name="sort-order-group"
            value={order}
            onChange={handleOrderChange}
        >
            <FormControlLabel value="DESC" control={<Radio />} label="desc" />
            <FormControlLabel value="ASC" control={<Radio />} label="asc" />
        
        </RadioGroup>
        </FormControl>
        </Stack>
        </>
    )
}