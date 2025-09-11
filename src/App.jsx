import { useState, useContext } from 'react';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import{ Button,Paper, Toolbar,Fade,Container, Menu,MenuItem, Divider, Stack, Box, Typography, FormControl} from '@mui/material';
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
import Login from './components/Login';
import MainApp from './components/MainApp';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  
const pages = ['Expense', 'Receipts', 'Ledger'];
 const [display, setDisplay]=useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
const[hasLoggedIn, setHasLoggedIn]=useState(false);

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
    
          <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login hasLoggedIn={hasLoggedIn} setHasLoggedIn={setHasLoggedIn}/>}
        />
        <Route
          path="/dashboard"
          element={
            hasLoggedIn ? (
                <MainApp/>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
 
  
     
   
  )
}

export default App
