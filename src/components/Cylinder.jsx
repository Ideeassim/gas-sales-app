import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from './StoreContext';
import axios from 'axios';

const CylinderGas = ({heading, invoiceNo,setDisplay}) => {
  const {formatted, setLedgerData, ledgerData}= useContext(StoreContext);

//uptake inputs
const[cylData, setCylData]=useState({
  account:'Cylinder Gas',
  invoiceNo:'',
difference:'',
gasFilled:'',
gasDispensed:'',
costPrice:'',
  salePrice:'',
  saleAmount:'',
  purchaseAmount:'',
  profit:''
})

const [grandTotal, setGrandTotal]=useState([]);

function handleChange(event) {
  const{name, value}=event.target;
  const updated ={...cylData, [name]: value, invoiceNo:invoiceNo};
  const gasFilled= parseFloat(updated.gasFilled  || 0);
  const gasDispensed= parseFloat(updated.gasDispensed  || 0);
  const difference = gasFilled - gasDispensed;
  updated.difference = difference
  const saleAmount =parseFloat(updated.saleAmount  || 0);
  const purchaseAmount =parseFloat(updated.purchaseAmount  || 0);
updated.profit = saleAmount - purchaseAmount;
setCylData(updated);
};


  const fields = [
    
    { name: "gasFilled", label: "Gas Filled" },
    { name: "gasDispensed", label: "Gas Dispensed" },
    { name: "difference", label: "Difference" },
    { name: "costPrice", label: "Cost Price" },
    { name: "salePrice", label: "Sale Price" },
    { name: "saleAmount", label: "Sale Amount" },
    { name: "purchaseAmount", label: "Purchase Amount" },
    { name: "profit", label: "Profit" },
  ];

  



  function addDomid() {



 //make up ledger
   const updated={ account: 'Cylinder Gas',              
    date:formatted,
    invoiceNo: invoiceNo, 
    receipt:[cylData],
    grandTotal: cylData.profit
 
    }
    //send to backend
    axios.post('http://localhost:5000/api/cylinderInvoices', updated)
    .then(res => {
      console.log('Saved to DB:', res.data);
      // 2. Update context for immediate UI update
      setLedgerData(prev => [...prev, res.data]);
      
      setDisplay('');
    })
        .catch(err => {
      console.error('Error saving invoice:', err);
    });
  };


  return (
    <Box>
      <Typography sx={heading} textAlign='center'>Cylinder Gas Invoice</Typography>
       <Box sx={{marginBottom:'45px'}}>
          <Typography gutterBottom>Date: {formatted}</Typography>
          <Typography gutterBottom>Invoice No: {invoiceNo}</Typography>
          </Box>
            <Box sx={{display: 'flex', gap:5, flexWrap:'wrap'}}>
            {fields.map(({name, label})=> {return <TextField key={name} label={label} name={name} value={cylData[name]} onChange={handleChange}  sx={{ minWidth: 220 }}/>})}
       
    </Box>
<Button variant='outlined' sx={{marginTop: '20px'}} onClick={addDomid}>Save</Button>
</Box>)}

export default CylinderGas;