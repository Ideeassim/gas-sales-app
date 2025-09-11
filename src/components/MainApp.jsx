import React from 'react'
import { useState, useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import{ Button,Paper, Toolbar,Fade,Container, Menu,MenuItem, Divider, Stack, Box, Typography, FormControl} from '@mui/material';

import AccessoryInvoice from './AccessoryInvoice'
import { StoreProvider } from './StoreProvider';
import AccessoryReceipt from './AccessoryReceipt';
import Ledger from './Ledger';
import Receipts from './Receipts';
import Expense from './Expense';
import DomidI from './DomidI';
import DomidII from './DomidII';
import CylinderGas from './Cylinder';
import { useNavigate } from "react-router-dom";


const MainApp = () => {
const navigate= useNavigate();

const pages = ['Expense', 'Receipts', 'Ledger'];
 const [display, setDisplay]=useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);


   const [account, setAccount] =useState('');
    const[invoiceNo, setInvoiceNo]=useState('')
  
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (event) => {
      const accountName=event.target.innerText;
   
      switch (accountName) {
    case 'Accessories':
      setDisplay('Accessories');
      setAccount('Accessories');
      setInvoiceNo(Math.floor(1000 + Math.random() * 9000));
      break;
  
      case 'Domid I':
       setDisplay('domid I');
       setAccount('Domid I');
       setInvoiceNo(Math.floor(1000 + Math.random() * 9000));
        break;
  
      case 'Domid II':
       setDisplay('domid II');
       setAccount('Domid II');
       setInvoiceNo(Math.floor(1000 + Math.random() * 9000));
        break;
  
      case 'Cylinder Gas':
       setDisplay('cylinder gas');
       setAccount('Cylinder Gas');
       setInvoiceNo(Math.floor(1000 + Math.random() * 9000));
        break;
   
  
   case 'Ledger':
      setDisplay(' Ledger');
      setAccount('Ledger');
      break;
  
   case 'Receipts':
      setDisplay('Receipts');
      setAccount('Receipts');
      break;
  
   case 'Expense':
      setDisplay('Expense');
      setAccount('Expense');
      break;
  
    default:
      // Optional: handle unexpected account names
      console.warn('Unknown account:', accountName);
      break;
  }
  
      setAnchorEl(null);   
      console.log(accountName);
      
    };
  
    const heading={
      color:'#57564F',
      margin:'0 auto',
      fontSize:'2rem',
      textAlign: 'center'
      
    }
   function changePage(page) {
    setDisplay(page);  
   }

   function handleLogOut() {
    navigate('/login')
   }
  return (
     <StoreProvider>
   <Box sx={{height:'100vh', width:'80rem'}}>
      <AppBar position="static" sx={{backgroundColor:'#ffffff', color:'#57564F', marginBottom:'50px'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{gap:5}} >
       
          <Button sx={{color:'#37353E',fontSize:'1.2rem'}}
          id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
          >Sales</Button>    
          <Menu
           id="fade-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'fade-button',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        <MenuItem onClick={handleClose} >
        Accessories
        </MenuItem>
        <Divider sx={{ my: 0.2 }} />
        <MenuItem onClick={handleClose} >
         Domid I
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} >
          Domid II
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} >
          Cylinder Gas
        </MenuItem>
        
    </Menu><Divider orientation="vertical" flexItem variant="middle"/>
                <Stack
           direction="row"
          spacing={1}
          divider={<Divider orientation="vertical" flexItem />}
          >
          
            {pages.map((page,index)=><Button key={index} sx={{color:'#37353E',fontSize:'1.2rem'}}
            onClick={()=>changePage(page)}>
              {page}</Button>)}
              </Stack>
              <Button sx={{marginLeft:'auto',  backgroundColor: 'black', color:'white', '&:hover': { backgroundColor: '#57564F', color:'white', borderRadius:'5px'}}} onClick={handleLogOut}>Log Out</Button>
        </Toolbar>
      </Container>
    </AppBar>
    <Paper sx={{marginTop:'200px', height:'auto', width:'80%', margin:'0 auto', padding:'50px'}}>
      {display == 'Accessories' && <AccessoryInvoice heading={heading} invoiceNo={invoiceNo} setDisplay={setDisplay} />}
       {display == 'Accessories'  && <AccessoryReceipt heading={heading} account={account} invoiceNo={invoiceNo}  setDisplay={setDisplay}/>}
      {display == 'Ledger' &&<Ledger  heading={heading} />}
      {display == 'Receipts' &&<Receipts  heading={heading} />}
      {display == 'Expense' &&<Expense  heading={heading} />}
      {display == 'domid I' && <DomidI heading={heading} invoiceNo={invoiceNo} setDisplay={setDisplay}/>}
      {display == 'domid II' && <DomidII heading={heading} invoiceNo={invoiceNo} setDisplay={setDisplay}/>}
      {display == 'cylinder gas' && <CylinderGas heading={heading} invoiceNo={invoiceNo} setDisplay={setDisplay}/>}
    </Paper>
   </Box>
   </StoreProvider>
  )
}

export default MainApp