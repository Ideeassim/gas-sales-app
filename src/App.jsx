import { useState, useContext } from 'react';
import { StoreContext } from './components/StoreContext';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import{ Button,Paper, Toolbar,Fade,Container, Menu,MenuItem, Divider} from '@mui/material';
import './App.css';
import AccessoryInvoice from './components/AccessoryInvoice';
import { StoreProvider } from './components/StoreProvider';

import AccessoryReceipt from './components/AccessoryReceipt';
import Ledger from './components/Ledger';

const pages = ['Expenses', 'Receipts', 'Ledger'];


function App() {
 const [display, setDisplay]=useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [showAccessories, setShowAccessories]=useState(false);
 const [account, setAccount] =useState('');
  const[invoiceNo, setInvoiceNo]=useState('')

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    const accountName=event.target.innerText;
    // if (accountName ==='Accessories') {
    //   // setShowAccessories(true);
    //   setDisplay('Accessories')
    //  setAccount('Accessories');
    //  setInvoiceNo( Math.floor(1000 + Math.random()* 9000));
      
    // }    
    switch (accountName) {
  case 'Accessories':
    setDisplay('Accessories');
    setAccount('Accessories');
    setInvoiceNo(Math.floor(1000 + Math.random() * 9000));
    break;

 case 'Ledger':
    setDisplay(' Ledger');
    setAccount('Ledger');
    break;

  default:
    // Optional: handle unexpected account names
    console.warn('Unknown account:', accountName);
    break;
}

    setAnchorEl(null);   
  };

  const heading={
    color:'#FF7601',
    margin:'0 auto',
    fontSize:'2rem',
    textAlign: 'center'
    
  }
 function changePage(page) {
  setDisplay(page);
  
 }
  return (
    <StoreProvider>
   <div className='container'>
      <AppBar position="static" sx={{backgroundColor:'grey', color:'white', marginBottom:'50px'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button sx={{color:'white'}}
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
         domid I
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} >
          Domid II
        </MenuItem>
        
    </Menu>


            {pages.map((page,index)=><Button key={index} sx={{color:'white'}}
            onClick={()=>changePage(page)}>
              {page}</Button>)}
        </Toolbar>
      </Container>
    </AppBar>
    <Paper sx={{marginTop:'200px', height:'auto', width:'70%', margin:'0 auto', padding:'50px'}}>
      {display == 'Accessories' && <AccessoryInvoice heading={heading} invoiceNo={invoiceNo} setDisplay={setDisplay} />}
       {display == 'Accessories'  && <AccessoryReceipt heading={heading} account={account} invoiceNo={invoiceNo}  setDisplay={setDisplay}/>}
      {display == 'Ledger' &&<Ledger  heading={heading} />}
    </Paper>
   </div>
   </StoreProvider>
  )
}

export default App
