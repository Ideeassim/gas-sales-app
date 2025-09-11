import { Box, Button, Fab, TextField, Typography, Dialog, DialogActions,DialogContent, DialogContentText } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from './StoreContext';
import axios from 'axios';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

const DomidII = ({heading, invoiceNo,setDisplay}) => {
  const {formatted, setLedgerData, ledgerData}= useContext(StoreContext);
const[open, setOpen]=useState(false);
const[error, setError]=useState(false);


//uptake inputs
const[domidInput2, setDomidInput2]=useState({
  account:'Domid II',
  invoiceNo:'',
customerName:'',
totalKg:'',
  numberOfBottles:'',
  unitCostPrice:'',
  unitSalePrice:'',
  cashGiven:'',
  cashPaid:'',
  profit:''
})


function handleChange(event) {
  const{name, value}=event.target;
    const updatedInput ={...domidInput2, [name]:value, invoiceNo:invoiceNo}
  const cashGiven = parseFloat(updatedInput.cashGiven) || 0;
  const cashPaid = parseFloat(updatedInput.cashPaid) || 0;
  const Profit = (cashGiven - cashPaid)  || 0;
  updatedInput.profit = Profit;
  setDomidInput2(updatedInput)     
          
};

const cashGiven = parseFloat(domidInput2.cashGiven) || 0;
  const cashPaid = parseFloat(domidInput2.cashPaid) || 0;
  const Profit = cashGiven - cashPaid  || 0;

  const fields = [
    { name: "totalKg", label: "Total Kg" },
    { name: "customerName", label: "Customer Name" },
    { name: "numberOfBottles", label: "Number Of Bottles", type: Number },
    { name: "unitCostPrice", label: "Unit Cost Price" },
    { name: "unitSalePrice", label: "Unit Sale Price" },
    { name: "cashGiven", label: "Cash Given" },
    { name: "cashPaid", label: "Cash Paid" },

  ];

  



  function addDomid() {
 //make up ledger
   const updated={ account: 'Domid II',              
    date:formatted,
    invoiceNo: invoiceNo, 
    receipt:[domidInput2],
    grandTotal: domidInput2.profit 
    }
    console.log(domidInput2);
    
    //send to backend
    axios.post('http://localhost:5000/api/domid2Invoices', updated)
    .then(res => {
      setOpen(true);
         setError(false)
      console.log('Saved to DB:', res.data);
      // 2. Update context for immediate UI update
      setLedgerData(prev => [...prev, res.data]);
      
      
    })
        .catch(err => {
          setError(true);
          setOpen(true)
      console.error('Error saving invoice:', err);
    });
  };

     function handleClose() {
     setOpen(false);
     setDisplay('');
 }

  return (
    <Box>
      <Typography sx={heading} textAlign='center'>Domid II Invoice</Typography>
       <Box sx={{marginBottom:'45px'}}>
          <Typography gutterBottom>Date: {formatted}</Typography>
          <Typography gutterBottom>Invoice No: {invoiceNo}</Typography>
          </Box>
            <Box sx={{display: 'flex', gap:5, flexWrap:'wrap'}}>
            {fields.map(({name, label})=> {return <TextField key={name} label={label} name={name} value={domidInput2[name]} onChange={handleChange}  sx={{ minWidth: 220 }}/>})}
            <TextField name='Profit' label='Profit' value={Profit}/>
    </Box>
<Fab  sx={{margin:'15px',  backgroundColor:'white', color:'#F97A00', borderRadius:'10px'}} variant='outlined' onClick={addDomid}>Save</Fab>
 {/* dialog */}
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
    
        <DialogContent sx={{display:'flex', alignItems:'center'}}>
          {error?(<DialogContentText  id="alert-dialog-description">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>Unable to save invoice <CancelIcon color='error'/></Box></DialogContentText>)  :(
            <DialogContentText id="alert-dialog-description"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          Invoice saved successfully! <CheckCircleOutlineIcon color='success'/></Box>
          </DialogContentText>)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          
        </DialogActions>
      </Dialog>
</Box>)}

export default DomidII;