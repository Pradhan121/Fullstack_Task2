import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

export default function User() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  if (!user) {
    return (
      <Box p={2}>
        <Typography>No logged in user found.</Typography>
      </Box>
    )
  }

  return (
    <Box p={2}>
      <Typography variant="h6">Logged in User</Typography>
      <Typography>Name: {user.name || user.username}</Typography>
      <Typography>Email: {user.email}</Typography>
      {user.address && <Typography>Address: {user.address}</Typography>}
    </Box>
  )
}