import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export default function AddFriend() {
  const [friendList, setFriendList] = useState({
    name: '', email: '', address: ''
  })
  const[editId,setEditId] = useState(null)
  const[open, setOpen] = useState(false)



  const formik = useFormik({
    initialValues: friendList,
    enableReinitialize: true,
    validationSchema: Yup.object({
       name: Yup.string().required('Required'),
       email: Yup.email('Invalid').string().required('Please Enter speacial character'),
       address: Yup.string().required('Required')
    }),
    onSubmit: (value, {resetForm})=>{

      if(editId!== null){
        axios.put(`http://localhost:3000/friends/${editId}`, value)
        .then(()=>{
          toast.success('FriendData updated successfuly');
            fetchFriendList()
            setEditId(null)
            resetForm();
            setOpen(false) 
          })
          .catch((err)=>{console.log(err)})
      }
      else{
        axios.post('http://localhost:3000/friends',value)
        .then(()=>{
          toast.success('FriendsData added successfuly');
          fetchFriendList();
          resetForm()
          setOpen(false) 
        })
        .catch((err)=>{console.log(err)})
      }
      setFriendList({
         name: '', email: '', address: ''
      })
    }
  })
  const handleCancel=()=>{
    setOpen(false)
    setFriendList({
      name: '', email: '', address: ''
    })
  }
  return (
    <>
    <Box>
     <Button sx={{ border: "1px solid", mb: 2 }} onClick={()=>setOpen(true)}>Add Question</Button>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add Friend</DialogTitle>

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
                <Button type="submit">Submit</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Box>
      </>
  )
}
