import { Box } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <>
      <Box sx={{display: 'flex'}}>
         <Sidebar/>
         <Box sx={{flex: 1, padding: '20px'}}>
           <Outlet/>
         </Box>
      </Box>
    </>
  )
}
