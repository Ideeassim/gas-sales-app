import {React, useContext, useState} from 'react'
import { StoreContext } from './StoreContext'
import { Fab, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Dialog, DialogActions,DialogContent, DialogContentText } from '@mui/material';
import axios from 'axios';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

const AccessoryReceipt = ({heading, invoiceNo, setDisplay}) => {
const[open, setOpen]=useState(false);
const[error, setError]=useState(false);

    const {accessoryData, setAccessoryData, 
        formatted, setLedgerData,
    receiptTotal, setReceiptTotal}=useContext(StoreContext);

        const grandTotal = accessoryData.reduce((sum, item) => sum + Number(item.Total), 0);


    function deleteItem(i) {
     const newAccessoryData = accessoryData.filter((_,indexToRemove) => indexToRemove !== i);  
   setAccessoryData(newAccessoryData);
    
};
function addToLedger() {
  if (accessoryData.length  ==0) {
    return;
  };
  //make up ledger
   const updated={ account: 'Accessories',              
    date:formatted,
    invoiceNo: invoiceNo, 
    receipt:[...accessoryData.map((obj, index) =>({id: index +1, item: obj.Item, quantity: obj.Quantity, 
        price: obj.Price, total: obj.Total}))] ,
        grandTotal:grandTotal
    }
        setLedgerData(prev => [...prev,updated]);
 setReceiptTotal(prev =>[...prev, grandTotal]);
 
             // 1. Send to backend
 axios.post('https://gas-sales-app.onrender.com/api/invoices', updated)
    .then(res => {
       setOpen(true);
        setError(false)
      console.log('Saved to DB:', res.data);
      setOpen(true);
      // 2. Update context for immediate UI update
      setLedgerData(prev => [...prev, res.data]);
      setReceiptTotal(prev => [...prev, grandTotal]);
      
      setAccessoryData([]);
      
       
    })
    .catch(err => {
              setError(true)
            setOpen(true);
      console.error('Error saving invoice:', err);
    });
          
      
           
 }
 
 function handleClose() {
     setOpen(false);
     setDisplay('');
 }

  return (
    <Paper sx={{marginTop:'100px', padding:'20px'}} elevation={4}>
        <Typography sx={{...heading, p:2 }} >Accessory Receipt</Typography>
        <Typography>Date: {formatted}</Typography>
        <Typography>Invoice No: {invoiceNo}</Typography>
        <TableContainer sx={{marginTop:'30px'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accessoryData.length>0 && accessoryData.map((data,i) => <TableRow key={i}>
                        <TableCell>{data.Item}</TableCell>
                        <TableCell>{data.Quantity}</TableCell>
                        <TableCell>₦ {data.Price}</TableCell>
                        <TableCell>₦ {data.Total}
                        <Button sx={{marginLeft:'10px'}} onClick={()=>deleteItem(i)}>remove</Button></TableCell>
                        
                    </TableRow>)}
                   
                </TableBody>
            </Table>
        </TableContainer>
        <Typography sx={{margin:'40px'}}><em>Grand Total</em> : ₦{grandTotal}</Typography>
        <Fab variant="extended" sx={{margin:'10px',  backgroundColor:'white', color:'#F97A00', borderRadius:'10px'}} onClick={addToLedger}>save</Fab>
              {/* dialog */}
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
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
        </Paper>
  )
}

export default AccessoryReceipt;