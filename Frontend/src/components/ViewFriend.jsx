import axios from 'axios'
import { useState, useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export default function ViewFriend() {
  const [friendData, setFriendData] = useState([])
  const [editId, setEditId] = useState(null)
  const [open, setOpen] = useState(false)
  const [friendList, setFriendList] = useState({ name: '', email: '', address: '' })

  const fetchFriendList = () => {
    axios.get('http://localhost:3000/api/friends')
      .then((res) => setFriendData(res.data.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => { fetchFriendList() }, [])

  const formik = useFormik({
    initialValues: friendList,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name required'),
      email: Yup.string().email('Invalid email').required('Email required'),
      address: Yup.string().required('Address required')
    }),
    onSubmit: (values, { resetForm }) => {
      axios.put(`http://localhost:3000/api/friends/${editId}`, values)
        .then(() => {
          toast.success('Friend updated successfully')
          fetchFriendList()
          setEditId(null)
          resetForm()
          setOpen(false)
          setFriendList({ name: '', email: '', address: '' })
        })
        .catch(err => console.log(err))
    }
  })

  const handleEdit = (f) => {
    setFriendList({ name: f.name, email: f.email, address: f.address })
    setEditId(f._id)
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
    setEditId(null)
    setFriendList({ name: '', email: '', address: '' })
    formik.resetForm()
  }

  return (
    <>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {friendData.map((f, i) => (
            <tr key={i}>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>{f.address}</td>
              <td>
                <button onClick={() => handleEdit(f)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Update Friend</DialogTitle>
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
              <Button type="submit" variant="contained">Update</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}