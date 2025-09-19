import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from './StoreContext';
import {FormControl, InputLabel, Select, MenuItem, Box, CircularProgress, Paper, Table,TableBody,TableCell, TableContainer, TableHead, TableRow, Typography, Button, Divider } from '@mui/material';
import axios from 'axios';
import { Fade } from '@mui/material';


const Ledger = ({heading}) => {

  const { ledgerData, setLedgerData, expenseToLedger, setExpenseToLedger} = useContext(StoreContext);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


const months = Array.from({ length: 12 }, (_, i) =>
  new Date(0, i).toLocaleString('default', { month: 'long' })
);
// Get current month name
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
const [month, setMonth]= useState(currentMonth);
const [account, setAccount]=useState('');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

const accounts =["Accessories", "Domid I", "Domid II", "Cylinder Gas"];

const changeAccount= (event) =>{
  setAccount(event.target.value);
}
  const fetchLedgerData = () => {
     setLoading(true);
     Promise.all([
    axios.get('https://gas-sales-app.onrender.com/api/invoices'),
    axios.get('https://gas-sales-app.onrender.com/api/expenses'),
    axios.get("https://gas-sales-app.onrender.com/api/domidInvoices"),
    axios.get("https://gas-sales-app.onrender.com/api/domid2Invoices"),
    axios.get('https://gas-sales-app.onrender.com/api/cylinderInvoices')

  ])
    .then(([invoicesRes, expensesRes, domidRes, domid2Res, cylRes]) => {
      // combine invoices + domid into one ledger array
      const combinedInvoices = [...invoicesRes.data, ...domidRes.data, ...domid2Res.data, ...cylRes.data];
      setLedgerData(combinedInvoices);
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

// Filter invoices by month + account
const filteredLedgerData = ledgerData.filter(item => {
    const dateStr = item.Date || item.date; // fallback in case of lowercase
  const [day, monthStr, year] = dateStr.split("/");
  const itemMonth = new Date(`${year}-${monthStr}-${day}`).toLocaleString("en-US", { month: "long" });
  // ✅ Filter by month and account (allow empty account = all accounts)
  return (
    itemMonth === month &&
    (account === "" || item.account === account)
  );
});

// Filter expenses by month + account
const filteredExpenses = expenseToLedger.filter(exp => {
  const dateStr = exp.Date || exp.date; // fallback in case of lowercase
  if (!dateStr) {
    console.warn("Expense with missing Date:", exp);
    return false;
  }

  const [day, monthStr, year] = dateStr.split("/");
  const itemMonth = new Date(`${year}-${monthStr}-${day}`).toLocaleString("en-US", { month: "long" });
  // ✅ Filter by month and account (allow empty = all accounts)
  return (
    itemMonth === month &&
    (account === "" || exp.Account === account)
  );
});

// Totals (after filtering)
const ledgerTotal = filteredLedgerData.reduce((sum, item) => sum + Number(item.grandTotal), 0);
const expTotal = filteredExpenses.reduce((sum, item) => sum + Number(item.Amount), 0);
const netProfit = ledgerTotal - expTotal;

    // // const ledgerTotal= receiptTotal.reduce((sum, item) => sum + Number(item), 0);
    // const ledgerTotal= ledgerData.reduce((sum, item) => sum + Number(item.grandTotal), 0);



const hasEmpty = ledgerData.length === 0 || ledgerData.some(obj =>
  Object.values(obj).some(val => String(val).trim() === '')); //treat an empty ledgerData array as invalid 

const emptyExpense = expenseToLedger.length === 0|| expenseToLedger.some(obj =>
  Object.values(obj).some(val => String(val).trim() === '')); //treat an empty expenseToLedger array as invalid 




function deleteItem(invoice) {
  console.log("Deleting invoice:", invoice);
  const { _id, account } = invoice;

  let url;

  if (account === "Domid I") {
    url= `http://localhost:5000/api/domidInvoices/${_id}`;
  }else if (account === "Domid II"){
   url= `http://localhost:5000/api/domid2Invoices/${_id}`;
  }else if (account === "Cylinder Gas"){
    url = `https://gas-sales-app.onrender.com/api/cylinderInvoices/${_id}`;
  } 
  else{
  url=    `https://gas-sales-app.onrender.com/api/invoices/${_id}`;
  }

  axios.delete(url)
    .then(() => {
      setLedgerData(prev => prev.filter(inv => inv._id !== _id));
    })
    .catch(err => console.error("Error deleting invoice:", err));
}


    function deleteExp(id) {
     axios
    .delete(`https://gas-sales-app.onrender.com/api/expenses/${id}`)
    .then(() => {
      // Remove the deleted expense from state immediately
      setExpenseToLedger(prev => prev.filter(exp => exp._id !== id));
    })
    .catch((err) => console.error('Error deleting expense:', err));
    }
    //  //calculate net profit
    //  const expTotal =  expenseToLedger.reduce((sum, item) => sum + Number(item.Amount), 0);
    //  const netProfit =ledgerTotal - expTotal;

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
 < Paper sx={{padding:3}}>  
 <Box sx={{display:'flex', gap: 5}}>
      <FormControl sx={{width: 'fit-content', minWidth:'7rem'}}>
      <InputLabel id="month-label">Month</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={month}
    label="Month"
    onChange={handleChange}
  >{months.map((month, index) => <MenuItem key={index} value={month}>{month}</MenuItem>)}
    
  </Select>
  </FormControl>
  <FormControl  sx={{width: 'fit-content', minWidth:'11rem'}}>
    <InputLabel>View by Account</InputLabel>
    <Select 
    value={account}
      label='Account'
      onChange={changeAccount}> <MenuItem value=''>All Accounts</MenuItem>
      {accounts.map((acc, index)=><MenuItem key={index} value={acc}>{acc}</MenuItem>)}
     
    </Select>
  </FormControl>
  </Box>
 <Box sx={{display:'flex', gap:4, marginY:5, padding:3}}>   <Typography variant='h6' sx={{color: '#2e2c2aff'}}>Ledger Total:  <span style={{color:'green'}}>₦{ledgerTotal}</span></Typography>
    <Typography variant='h6' sx={{color: '#2e2c2aff'}}>Net Profit: <span style={{color:'green'}}>₦{netProfit}</span></Typography>
    <Typography variant='h6' sx={{color: '#2e2c2aff'}}>Total Expense: <span style={{color:'green'}}>₦{expTotal}</span></Typography>
     <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", p: 2 }}>
      
    </Box>
    </Box>

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
          {filteredLedgerData.length === 0 && filteredExpenses.length === 0 ? (<Typography sx={{margin:'0 auto', color:'#57564F'}}>No Data...</Typography>): (filteredLedgerData.map((obj, index) =>
          <TableRow key={index}>
            <TableCell sx={{ color:'green'}}>{obj.date}</TableCell>
            <TableCell  sx={{ color:'green'}}>{obj.invoiceNo}</TableCell>
            <TableCell  sx={{ color:'green'}}>{obj.account}</TableCell>           
            <TableCell  sx={{ color:'green'}}>{obj.grandTotal}<Button sx={{marginLeft:'10px'}} color='error' onClick={() =>{console.log("Clicked!", obj); deleteItem(obj)}}>remove</Button></TableCell>
          </TableRow>))}
          {!emptyExpense && (filteredExpenses.map((exp, i) =>
          <TableRow  key={exp._id || i}>
            <TableCell  sx={{ color:'red'}} >{exp.Date}</TableCell>
            <TableCell  sx={{ color:'red'}}>{exp.InvoiceNo}</TableCell>
            <TableCell  sx={{ color:'red'}}>{exp.Type}</TableCell>
            <TableCell  sx={{ color:'red'}}>{exp.Amount}<Button sx={{marginLeft:'10px'}} color="error"  onClick={()=>deleteExp(exp._id)}>remove</Button></TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    
 </Paper>
 </Fade>
  )
}

export default Ledger;