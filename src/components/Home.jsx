import React from 'react'
import logo from '../assets/logo.png';
import { Box } from '@mui/material';


const Home = () => {
  return (
    <Box sx={{display:'flex', justifyContent:'center'}} >
        <img src={logo} height={400} style={{opacity:'0.5'}}/>
    </Box>
  )
}

export default Home