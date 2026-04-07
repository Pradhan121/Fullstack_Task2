import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
    const navigate = useNavigate()
  
 const get = JSON.parse(localStorage.getItem('user'));

    const handleLogout=()=>{
        localStorage.removeItem('user')
        navigate('/')
    }
   let menuItems = [];

if (get?.role === "superAdmin") {
  menuItems = [
    { name: "User", path: "/dashboard/user" },
    { name: "ViewFriend", path: "/dashboard/viewfriend" },
  ];
} else if (get?.role === "admin") {
  menuItems = [
    { name: "AddFriend", path: "/dashboard/addfriend" },
    { name: "ViewFriend", path: "/dashboard/viewfriend" },
  ];
} else {
  menuItems = [
     { name: "User", path: "/dashboard/user" },
    { name: "AddFriend", path: "/dashboard/addfriend" },
    { name: "ViewFriend", path: "/dashboard/viewfriend" },
  ]; 
}

  return (
    <>
        <Box sx={{ width: 250, height: "100vh", background: "#f1f5f9" }}>
      <List sx={{display:'flex',flexDirection:'column', gap:'20px', marginTop:'80px'}}>
        {menuItems.map((item, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)} >
              <ListItemText 
                 primary={item.name} sx={{
                  '& .MuiTypography-root': {
                  fontSize: '18px',
                }
              }}
            />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemText
              primary="Logout"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "18px",
                  color: "red", 
                  fontWeight: "600"
                }
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
    </>
  )
}
