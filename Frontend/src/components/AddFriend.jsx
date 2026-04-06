import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export default function AddFriend({ fetchFriendList, editId, setEditId, open, setOpen, friendList, setFriendList, showAddButton=true }) {
  
  const formik = useFormik({
    initialValues: friendList || { name: '', email: '', address: '' },
    enableReinitialize: true,
    validationSchema: Yup.object({
       name: Yup.string().required('Required'),
       email: Yup.string().email('Invalid').required('Please Enter valid email'),
       address: Yup.string().required('Required')
    }),
    onSubmit: (value, {resetForm}) => {
      if(editId !== null){
        axios.put(`http://localhost:3000/api/friends/${editId}`, value)
          .then(() => {
            toast.success('FriendData updated successfully');
            fetchFriendList()
            setEditId(null)
            resetForm();
            setOpen(false) 
            setFriendList({ name: '', email: '', address: '' })
          })
          .catch((err) => console.log(err))
      } else {
        axios.post('http://localhost:3000/api/friends', value)
          .then(() => {
            toast.success('FriendData added successfully');
            fetchFriendList();
            resetForm()
            setOpen(false)
            setFriendList({ name: '', email: '', address: '' }) 
          })
          .catch((err) => console.log(err))
      }
    }
  })

  const handleCancel = () => {
    setOpen(false)
    setEditId(null)
    setFriendList({ name: '', email: '', address: '' })
  }

  return (
    <Box>
      {showAddButton && (
        <Button sx={{ border: "1px solid", mb: 2 }} onClick={() => setOpen(true)}>
          Add Friend
        </Button>
      )}
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>{editId ? 'Update Friend' : 'Add Friend'}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField fullWidth 
              label='Name'
              name='name' 
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{mb: 2}} />

            <TextField fullWidth 
              label='Email'
              name='email' 
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{mb: 2}} />

            <TextField fullWidth 
              label='Address'
              name='address' 
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              sx={{mb: 2}} />

            <DialogActions>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="submit">{editId ? 'Update' : 'Submit'}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  )
}