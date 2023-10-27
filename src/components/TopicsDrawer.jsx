import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MailIcon from '@mui/icons-material/Mail';
import { getTopics } from '../network/network';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


export default function TopicsDrawer({drawerOpen, setDrawerOpen, topics}){

  const navigate = useNavigate()

  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(!drawerOpen);
  };



  const list = () => (
    <Box
      sx={{ width : 250 }}
      role="presentation"
      onClick={toggleDrawer(drawerOpen)}
      onKeyDown={toggleDrawer(drawerOpen)}
    >
      <ListItem>
      <Typography variant='h5'>Topics</Typography>
      </ListItem>
      <Divider />
      <List>
        {
        topics.map((topic, index) => (
          <ListItem key={topic.slug} disablePadding>
            <ListItemButton
              onClick={(e)=>navigate(`/${topic.slug}`)}
            >
              <ListItemIcon>
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText primary={topic.slug} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
 
    </Box>
  );



    return (
        <Drawer
            anchor='left'
            open={drawerOpen}
         >
            {list()}
        </Drawer>
    )
}