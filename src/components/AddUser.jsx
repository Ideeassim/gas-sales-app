import { Typography, Box, FormControl, TextField } from '@mui/material'
import { IoIosArrowBack } from "react-icons/io";
import React from 'react'

const AddUser = () => {
  return (
   <Box>
    <Box sx={{display:'flex', alignItems:'center', color:'#FAA533'}}>
       <IoIosArrowBack /> <Typography> Back </Typography>
    </Box>
    <Box>
        <Typography variant='h5'>Add a new user</Typography>
        <FormControl>
            <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUser(e.target.value)} />
        </FormControl>
    </Box>
   </Box>
  )
}

export default AddUser