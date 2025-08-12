import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from './StoreContext';
import { Box, CircularProgress, Paper, Table,TableBody,TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import axios from 'axios';
import { Fade } from '@mui/material';


const Ledger = ({heading}) => {

  const { ledgerData, setLedgerData, expenseToLedger, setExpenseToLedger} = useContext(StoreContext);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchLedgerData = () => {
     setLoading(true);
     Promise.all([
    axios.get('http://localhost:5000/api/invoices'),
    axios.get('http://localhost:5000/api/expenses')
  ])
    .then(([invoicesRes, expensesRes]) => {
      setLedgerData(invoicesRes.data);
      setExpenseToLedger(expensesRes.data);
    })
   .catch((err) => {
  console.error('Error fetching ledger data:', err);
  setError('Failed to load ledger data. Please try again.');
})

    .finally(() => {
      setLoading(false);
    });
  };

  
  useEffect(() => {
    fetchLedgerData();
  }, []);

   

    // const ledgerTotal= receiptTotal.reduce((sum, item) => sum + Number(item), 0);
    const ledgerTotal= ledgerData.reduce((sum, item) => sum + Number(item.grandTotal), 0);

const hasEmpty = ledgerData.length === 0 || ledgerData.some(obj =>
  Object.values(obj).some(val => String(val).trim() === '')); //treat an empty ledgerData array as invalid 

const emptyExpense = expenseToLedger.length === 0|| expenseToLedger.some(obj =>
  Object.values(obj).some(val => String(val).trim() === '')); //treat an empty expenseToLedger array as invalid 


      function deleteItem(id) {
  //    const newLedgerData = ledgerData.filter((_,indexToRemove) => indexToRemove !== index);  
  //  setLedgerData(newLedgerData);
    axios
      .delete(`http://localhost:5000/api/invoices/${id}`)
      .then(() => {
        fetchLedgerData(); // Refetch after delete
      })
      .catch((err) => console.error('Error deleting invoice:', err));
    
};

    function deleteExp(id) {
     axios
    .delete(`http://localhost:5000/api/expenses/${id}`)
    .then(() => {
      // Remove the deleted expense from state immediately
      setExpenseToLedger(prev => prev.filter(exp => exp._id !== id));
    })
    .catch((err) => console.error('Error deleting expense:', err));
    }
     //calculate net profit
     const expTotal =  expenseToLedger.reduce((sum, item) => sum + Number(item.Amount), 0);
     const netProfit =ledgerTotal - expTotal;

      if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200} flexDirection="column">
        <CircularProgress />
        <Typography mt={2}>Loading ledger data...</Typography>
      </Box>
    );
  }
  if (error) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Typography color="error" variant="h6">
        {error}
      </Typography>
    </Box>
  );
}
  return (
    <Fade in={!loading} timeout={600}>
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
            <TableCell >{obj.grandTotal}<Button sx={{marginLeft:'10px'}} color='error' onClick={()=>deleteItem(obj._id)}>remove</Button></TableCell>
          </TableRow>))}
          {!emptyExpense && (expenseToLedger.map((exp, i) =>
          <TableRow  key={exp._id || i}>
            <TableCell>{exp.Date}</TableCell>
            <TableCell>{exp.InvoiceNo}</TableCell>
            <TableCell>{exp.Type}</TableCell>
            <TableCell>{exp.Amount}<Button sx={{marginLeft:'10px'}} color="error"  onClick={()=>deleteExp(exp._id)}>remove</Button></TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Typography variant='h6' sx={{color: '#FF7601'}}>Ledger Total: ₦{ledgerTotal}</Typography>
    <Typography variant='h6' sx={{color: '#FF7601'}}>Net Profit: ₦{netProfit}</Typography>
 </Paper>
 </Fade>
  )
}

export default Ledger;