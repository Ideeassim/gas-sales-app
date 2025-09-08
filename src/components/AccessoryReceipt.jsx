import {React, useContext} from 'react'
import { StoreContext } from './StoreContext'
import { Fab, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';

const AccessoryReceipt = ({heading, invoiceNo, setDisplay}) => {
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
            setAccessoryData([]);
            setDisplay('');
           console.log(updated);

             // 1. Send to backend
 axios.post('http://localhost:5000/api/invoices', updated)
    .then(res => {
      console.log('Saved to DB:', res.data);
      // 2. Update context for immediate UI update
      setLedgerData(prev => [...prev, res.data]);
      setReceiptTotal(prev => [...prev, grandTotal]);
      setAccessoryData([]);
      setDisplay('');
      alert('Receipt saved!')
    })
    .catch(err => {
      console.error('Error saving invoice:', err);
    });
           
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
        </Paper>
  )
}

export default AccessoryReceipt;