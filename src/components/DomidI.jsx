import { Box, Button, Fab, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from './StoreContext';
import axios from 'axios';

const DomidI = ({heading, invoiceNo,setDisplay}) => {
  const {formatted, setLedgerData, ledgerData}= useContext(StoreContext);

//uptake inputs
const[domidInputI, setDomidInputI]=useState({
  account:'Domid I',
  invoiceNo:'',
  totalKg:'',
  numberOfBottles:'',
  unitCostPrice:'',
  unitSalePrice:'',
  cashGiven:'',
  cashPaid:'',
  profit:''
})

// const [updated, setUpdatedData]=useState(); 

function handleChange(event) {
  const{name, value}=event.target;
  const updatedInput ={...domidInputI, [name]:value, invoiceNo:invoiceNo}
  const cashGiven = parseFloat(updatedInput.cashGiven) || 0;
  const cashPaid = parseFloat(updatedInput.cashPaid) || 0;
  const Profit = (cashGiven - cashPaid)  || 0;
  updatedInput.profit = Profit;
        setDomidInputI(updatedInput);
        
};

const cashGiven = parseFloat(domidInputI.cashGiven) || 0;
  const cashPaid = parseFloat(domidInputI.cashPaid) || 0;
  const Profit = cashGiven - cashPaid  || 0;
  
// useEffect(()=>{setCalcProfit()}, [domidInputI.profit])

  const fields = [
    { name: "totalKg", label: "Total Kg", type: 'text' },
    { name: "numberOfBottles", label: "Number Of Bottles", type:'number'},
    { name: "unitCostPrice", label: "Unit Cost Price" },
    { name: "unitSalePrice", label: "Unit Sale Price" },
    { name: "cashGiven", label: "Cash Given" , type:'number'},
    { name: "cashPaid", label: "Cash Paid",  type:'number' },
   
  ];

  



  function addDomid() {
const hasEmpty = Object.values(domidInputI).some(val => String(val).trim() === '');// check for empty fields

    if (hasEmpty) {
      alert('enter all fields!')
    }else{ 
 
 console.log(domidInputI);
 
  // setDomidInputII(updatedInput); 

 //make up ledger
   const updated={ account: 'Domid I',              
    date:formatted,
    invoiceNo: invoiceNo, 
    receipt:[domidInputI],
    grandTotal: Profit
 
    }
    //send to backend
    axios.post('http://localhost:5000/api/domidInvoices', updated)
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
  }

  return (
    <Box>
      <Typography sx={heading} textAlign='center'>Domid I Invoice</Typography>
       <Box sx={{marginBottom:'45px'}}>
          <Typography gutterBottom>Date: {formatted}</Typography>
          <Typography gutterBottom>Invoice No: {invoiceNo}</Typography>
          </Box>
            <Box sx={{display: 'flex', gap:5, flexWrap:'wrap'}}>
            {fields.map(({name, label})=> {return <TextField key={name} label={label} name={name} value={domidInputI[name]} onChange={handleChange}  sx={{ minWidth: 220 }}/>})}
            <TextField name='Profit' label='Profit' value={Profit}/>
    </Box>
<Fab variant='extended' sx={{margin:'20px',  backgroundColor:'white', color:'#F97A00', borderRadius:'10px'}}onClick={addDomid}>Save</Fab>
</Box>)}

export default DomidI;