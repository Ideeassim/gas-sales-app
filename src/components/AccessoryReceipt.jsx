import {React, useContext} from 'react'
import { StoreContext } from './StoreContext'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect } from 'react';

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
           
 }
 
 

  return (
    <Paper sx={{marginTop:'100px', padding:'10px'}} elevation={4}>
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
                        <TableCell>{data.Price}</TableCell>
                        <TableCell>{data.Total}
                        <Button sx={{marginLeft:'10px'}} onClick={()=>deleteItem(i)}>remove</Button></TableCell>
                        
                    </TableRow>)}
                   
                </TableBody>
            </Table>
        </TableContainer>
        <Typography>Grand Total: {grandTotal}</Typography>
        <Button variant='outlined' sx={{backgroundColor:'primary'}} onClick={addToLedger}>save</Button>
        </Paper>
  )
}

export default AccessoryReceipt;