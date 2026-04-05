import {Box, Button, InputAdornment, TextField, Typography} from '@mui/material'
import PersonIcon from "@mui/icons-material/Person"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useFormik } from 'formik'
import {toast} from 'react-toastify'
import axios from "axios"
import  * as Yup from 'yup'

export default function Register() {
    const[userList, setUserList] = useState({
        username:'', email:'', password:''
    })
    const[profile,setProfile] = useState()
    const navigate = useNavigate()

    const formik = useFormik({
       initialValues: userList,
       validationSchema: Yup.object({
         username: Yup.string().required('Required'),
         email: Yup.string().required('Required'),
         password: Yup.string().required('Required')
       }),
       onSubmit: (values,{resetForm})=>{
        const formdata = new FormData()

         if(profile){
            formdata.append('profile', profile);
         }
         else{
            toast.error('Please add File');
         }
         formdata.append('username', values.username);
         formdata.append('email', values.email);
         formdata.append('password', values.password);

         axios.post('http://localhost:3000/api/register',formdata,
            {headers: {"Content-Type": "multipart/form-data"}})

         .then(()=>{
            toast.success('Register Successfuly');
            resetForm();
            navigate('/')
         })
         .catch((err)=>{toast.error(err)})
       }
    })
  return (
    <Box
         sx={{ display: "flex", justifyContent: "center",minHeight:'100vh' }}
      >       
        <Box
          sx={{
            backgroundColor: "color-mix(in srgb, #0b1ae9, transparent 90%)",
            borderRadius: "12px",
            width: "320px",
            height: '480px',
            padding: "22px",
            margin: "80px auto",   
          }}
        >               
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "25px",
              textTransform: "uppercase",               
            }}
          >
               Create an account 
          </Typography>
          <form encType='multipart/formdata' onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="UserName"
            type="text"
            name='username'
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "color-mix(in srgb, #131428, transparent 90%)",
                paddingLeft: "8px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#524dd3", paddingLeft: "0" }} />             
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "color-mix(in srgb, #131428, transparent 90%)",
                paddingLeft: "8px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#524dd3", paddingLeft: "0" }} />               
                </InputAdornment>
              ),
            }}
          />
           <TextField
            fullWidth
            label="password"
            type="password"
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "color-mix(in srgb, #131428, transparent 90%)",
                paddingLeft: "8px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#524dd3", paddingLeft: "0" }} />               
                </InputAdornment>
              ),
            }}
          />
          <TextField fullWidth
            type='file'
            name='profile'
            onChange={(e)=>setProfile(e.target.files[0])}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "color-mix(in srgb, #131428, transparent 90%)",
                paddingLeft: "8px",
              },
            }}/>
           <Button
            type='submit'
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#0b1ae9",
              padding: "10px",
              borderRadius: "10px",
              fontWeight: "500",
              fontSize: "16px",
              gap: "8px",
              display: "flex",
              alignItems: "center",
              color: "#fff",
              textDecoration: "none",
            }}
          >Submit</Button> 
        </form>
          <Link to='/'
             style={{
              textDecoration:'none',
              color: "#94a3b8",
              textAlign: "center",
              marginTop:'20px',
              fontSize: "18px",
              display:'block'
           }}
         >
          Already have an account?{" "}
          <span style={{ color: "#2563eb", cursor: "pointer" }}>
            Login
          </span>
        </Link>          
        </Box>      
      </Box>
  )
}
