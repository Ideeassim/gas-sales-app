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
import Receipts from './components/Receipts';
import Expense from './components/Expense';
import DomidI from './components/DomidI';
import DomidII from './components/DomidII';
import CylinderGas from './components/Cylinder';


function App() {
  
const pages = ['Expense', 'Receipts', 'Ledger'];
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



  return (
    <StoreProvider>
   <div className='container'>
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
        
    </Menu>


            {pages.map((page,index)=><Button key={index} sx={{color:'#37353E',fontSize:'1.2rem'}}
            onClick={()=>changePage(page)}>
              {page}</Button>)}
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
   </div>
   </StoreProvider>
  )
}

export default App
