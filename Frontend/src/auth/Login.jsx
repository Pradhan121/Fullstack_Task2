import {Box, Button, InputAdornment, TextField, Typography} from '@mui/material'
import PersonIcon from "@mui/icons-material/Person"
import LockIcon from "@mui/icons-material/Lock"
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useFormik } from 'formik'
import {toast} from 'react-toastify'
import axios from "axios"
import  * as Yup from 'yup'

export default function Login() {
    const[userList, setUserList] = useState({
        username:'', password:''
    })
    const navigate = useNavigate()

    const formik = useFormik({
       initialValues: userList,
       validationSchema: Yup.object({
         username: Yup.string().required('Required'),
         password: Yup.string().required('Required')
       }),
       onSubmit: (values,{resetForm})=>{ 
         axios.post('http://localhost:3000/api/login',values)
            
         .then((res)=>{
            toast.success('Register Successfuly');
            resetForm()
            localStorage.setItem('user', JSON.stringify(res.data.data))
            navigate('/dashboard')
         })
         .catch((err)=>{console.log(err)})
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
            height: '400px',
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
               Welcome back
          </Typography>
          <form onSubmit={formik.handleSubmit}>
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
          <Link to='/register'
             style={{
              textDecoration:'none',
              color: "#94a3b8",
              textAlign: "center",
              marginTop:'20px',
              fontSize: "18px",
              display:'block'
           }}
         >
          Don’t have an account?{" "}
          <span style={{ color: "#2563eb", cursor: "pointer" }}>
            Login
          </span>
        </Link>          
        </Box>      
      </Box>
  )
}
