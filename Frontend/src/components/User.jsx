import { useEffect, useState } from 'react'
import { Box, Typography, Avatar } from '@mui/material'

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
      <Typography variant="h5" mb={2}>Logged In User</Typography>
      {user.profile && (
        <Avatar
          src={`http://localhost:3000/images/${user.profile}`}
          sx={{ width: 80, height: 80, mb: 2 }}
        />
      )}
      <Typography><b>Username:</b> {user.username}</Typography>
      <Typography><b>Email:</b> {user.email}</Typography>
      <Typography><b>Role:</b> {user.role}</Typography>
    </Box>
  )
}