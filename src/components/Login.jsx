import React, { useState } from 'react'
import{TextField, Button,Paper, InputLabel, OutlinedInput, InputAdornment,IconButton, Toolbar,Fade,Container, Menu,MenuItem, Divider, Stack, Box, Typography, FormControl} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';


const Login = ({setHasLoggedIn, username, setUser}) => {
     const [showPassword, setShowPassword] = React.useState(false);
    
    const[password, setPassword]=useState('');
      const [message, setMessage] = useState("");

const navigate= useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

const handleLogin = async () => {
    try {
      const res = await axios.post("https://gas-sales-app.onrender.com/login", {
        username,
        password,
      });
      setMessage(res.data.message);
      setHasLoggedIn(true);
      navigate('/dashboard')
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
      setMessage("Login failed: " + err.response.data.message);
    } else {
      setMessage("Login failed: " + err.message); // fallback for network/other errors
    }
      setHasLoggedIn(false);
    }
  };



  return (
    <Paper sx={{padding:5, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'50rem', height:'90vh'}}>
    {/* <Typography variant='h2' sx={{color:'#57564F'}}>LPG <span style={{color:'#FAA533'}}>SALES</span></Typography> */}
   <img src={logo} height='400px'/>
  
   < Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '45ch' }, display:'flex', flexDirection:'column', marginTop:'-10px' }}
      noValidate
      autoComplete="off"
    >
 
         <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUser(e.target.value)} />
    
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
          onChange={(e) => setPassword(e.target.value)} 
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
           
    </Box> <Button 
    sx={{marginTop:'10px', backgroundColor: 'black', color:'white', '&:hover': { backgroundColor: '#57564F', color:'white', borderRadius:'5px' } }}  onClick={handleLogin}>
        Login</Button>
        <p>{message}</p>
   </Paper>
  )
}

export default Login