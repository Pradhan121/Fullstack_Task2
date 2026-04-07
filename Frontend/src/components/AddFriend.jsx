import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export default function AddFriend() {
  const [open, setOpen] = useState(false)
  const [friendList, setFriendList] = useState({ name: '', email: '', address: '' })

  const formik = useFormik({
    initialValues: friendList,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name required'),
      email: Yup.string().email('Invalid email').required('Email required'),
      address: Yup.string().required('Address required')
    }),
    onSubmit: (values, { resetForm }) => {
      axios.post('http://localhost:3000/api/friends', values)
        .then(() => {
          toast.success('Friend added successfully')
          resetForm()
          setOpen(false)
        })
        .catch(err => console.log(err))
    }
  })

  const handleCancel = () => {
    setOpen(false)
    formik.resetForm()
  }

  return (
    <Box>
      {/* ✅ Sirf Button */}
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Friend
      </Button>

      {/* ✅ Ek hi Dialog */}
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Add Friend</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField fullWidth label="Name" name="name"
              value={formik.values.name} onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ mb: 2, mt: 1 }} />

            <TextField fullWidth label="Email" name="email"
              value={formik.values.email} onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 2 }} />

            <TextField fullWidth label="Address" name="address"
              value={formik.values.address} onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              sx={{ mb: 2 }} />

            <DialogActions>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="submit" variant="contained">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  )
}