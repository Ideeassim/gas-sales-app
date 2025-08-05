import React, { useContext, useEffect } from 'react'
import { StoreContext } from './StoreContext';
import { Box, Paper, Table,TableBody,TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';

const Ledger = ({heading}) => {
    const { ledgerData, setLedgerData} = useContext(StoreContext);

    // const ledgerTotal= receiptTotal.reduce((sum, item) => sum + Number(item), 0);
    const ledgerTotal= ledgerData.reduce((sum, item) => sum + Number(item.grandTotal), 0);
const hasEmpty = ledgerData.length === 0 || ledgerData.some(obj =>
  Object.values(obj).some(val => String(val).trim() === '')); //treat an empty ledgerData array as invalid 

      function deleteItem(index) {
     const newLedgerData = ledgerData.filter((_,indexToRemove) => indexToRemove !== index);  
   setLedgerData(newLedgerData);
    
};
     
  return (
 < Paper>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Invoice No</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hasEmpty ? (<TableRow><TableCell>no data</TableCell></TableRow>): (ledgerData.map((obj, index) =>
          <TableRow key={index}>
            <TableCell>{obj.date}</TableCell>
            <TableCell>{obj.invoiceNo}</TableCell>
            <TableCell>{obj.account}</TableCell>           
            <TableCell >{obj.grandTotal}<Button sx={{marginLeft:'10px'}} onClick={()=>deleteItem(index)}>remove</Button></TableCell>
          </TableRow>))}
          
        </TableBody>
      </Table>
    </TableContainer>

    <Typography variant='h6' sx={{color: '#FF7601'}}>Ledger Total:{ledgerTotal}</Typography>
 </Paper>
  )
}

export default Ledger;