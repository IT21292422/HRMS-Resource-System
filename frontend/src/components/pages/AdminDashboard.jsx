import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react'
import { Overview, Resources, CreateNew, Learners, Status } from "../index.mjs"

const drawerWidth = 200;

const AdminDashboard = () => {

  const [selected, setSelected] = useState("Overview")

  const handleSelected = (text)=> {
    setSelected(text)
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {['Overview', 'Courses', 'Create New', 'Learners','Status'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={ () => handleSelected(text)}>
                <ListItemText primary={text} primaryTypographyProps={{ fontSize: "1rem", fontWeight: "500", color: "#212121" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        
        { (selected === 'Overview') && <Overview />}
        { (selected === 'Courses') && <Resources />}
        { (selected === 'Create New') && <CreateNew />}
        { (selected === 'Learners') && <Learners />}
        { (selected === 'Status') && <Status />}
      </Box>
    </Box>
  )
}

export default AdminDashboard 