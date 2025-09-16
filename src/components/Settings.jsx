import { Stack, Typography, Box } from '@mui/material'
import React from 'react'
import { IoPersonAddOutline, IoPersonRemoveOutline} from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";
import { IconContext } from "react-icons";

const Settings = ({setDisplay}) => {

function addUser(){

}

  return (
    <Stack>
    <Typography variant='h5' sx={{textAlign:'center'}}>Settings</Typography>
    <Box sx={{display:'flex', justifyContent:'space-evenly', marginTop:'4rem'}}>
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer', padding:'15px',"&:hover":{backgroundColor:"#DFD0B8"}}} onClick={()=>{setDisplay("AddUser")}}>
        <IconContext.Provider value={{ size:'3em' }}>
        <IoPersonAddOutline />
        </IconContext.Provider>
        Add User
    </Box>
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer', padding:'15px',"&:hover":{backgroundColor:"#DFD0B8"}}}>
        <IconContext.Provider value={{ size:'3em' }}>
        <IoPersonRemoveOutline />
        </IconContext.Provider>
        Remove User
    </Box>
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer', padding:'15px',"&:hover":{backgroundColor:"#DFD0B8"}}}>
        <IconContext.Provider value={{ size:'3em' }}>
        <MdOutlinePassword />
        </IconContext.Provider>
       Change Password
    </Box>
  
    </Box>
    </Stack>
  )
}

export default Settings