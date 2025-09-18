import { Box,Dialog, DialogActions,DialogContent, DialogContentText, DialogTitle, Paper, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, CircularProgress,Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from './StoreContext';
import axios from 'axios';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';


const Expense = ({heading}) => {
const[cylData, setCylData]= useState([]);
const[domidData, setDomidData]=useState([]);
const[domid2Data, setDomid2Data]=useState([]);
const[AccData, setAccData]=useState([]);
const[expData, setExpData]=useState([]);
const [loading, setLoading] = useState(true); // loading state
const [error, setError] = useState(false);
const [addExp, setAddExp]=useState(false)
const[viewExp, setViewExp]=useState(true)

// Fetch data from backend
  const fetchLedgerData = () => {
    setLoading(true); // start loading

    Promise.all([
    axios.get('http://localhost:5000/api/invoices'),
    axios.get('http://localhost:5000/api/expenses'),
    axios.get("http://localhost:5000/api/domidInvoices?account=Domid1"),
    axios.get("http://localhost:5000/api/domid2Invoices?account=Domid2"),
    axios.get('http://localhost:5000/api/cylinderInvoices')

  ])

 .then(([invoicesRes, expensesRes, domidRes, domid2Res, cylRes]) => {
      // combine invoices + domid into one ledger array
      const combinedInvoices = [...invoicesRes.data, ...expensesRes.data, ...domidRes.data, ...domid2Res.data, ...cylRes.data];
      setLedgerData(combinedInvoices);
    setAccData(invoicesRes.data);
    setCylData(cylRes.data);
    setDomidData(domidRes.data);
    setDomid2Data(domid2Res.data);
     setExpData(expensesRes.data); 
    })
   .catch((err) => {
  console.error('Error fetching ledger data:', err);
  setError('Failed to load ledger data. Please try again.');
})

    .finally(() => {
      setLoading(false);
    });
    
  }

  useEffect(() => {
    fetchLedgerData(); 
 
    
  }, []);

const{ledgerData, formatted,  setExpenseToLedger, setLedgerData }= useContext(StoreContext);

  const accTotal= AccData.reduce((sum, item) => sum + Number(item.grandTotal), 0);
  const domidTotal= domidData.reduce((sum, item) => sum + Number(item.grandTotal), 0);
  const domid2Total= domid2Data.reduce((sum, item) => sum + Number(item.grandTotal), 0);
  const cylTotal= cylData.reduce((sum, item) => sum + Number(item.grandTotal), 0);

 
const [account, setAccount] =useState('');
const[open, setOpen]=useState(false)
const[expenseInput, setExpenseInput] =useState({
      date:'',
      InvoiceNo:'',
      Amount:'',
      Narration:'',
      Account:'',
      Type: 'Expense'
    });
   
 
const[invoiceNo, setInvoiceNo]=useState('')
// Get current month name
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
const [month, setMonth]= useState(currentMonth);
const [acct, setAcct]=useState('');


  const handleChange = (event) => {
    setAccount(event.target.value);
    setInvoiceNo(Math.floor(1000 + Math.random() * 9000));
  };

  function handleInput(event) {
    const{name, value}=event.target;
    setExpenseInput(prev =>({...prev, [name]: value, Date:formatted, InvoiceNo: invoiceNo}));
  
    switch (account) {
      case 'Accessories':
        setExpenseInput(prev =>({...prev, Account:'Accessories'}));
      
        break;

      case 'Domid I':
        setExpenseInput(prev =>({...prev, Account:'Domid I'}))
        break;

      case 'Domid II':
        setExpenseInput(prev =>({...prev, Account:'Domid II'}))
        break;

      case 'Cylinder Gas':
        setExpenseInput(prev =>({...prev, Account:'Cylinder Gas'}))
        break;
    
      default:
        console.warn('no account')
        break;
    }
    
  };

  function handleSave() {
      // console.log(expenseInput);
     

        axios.post('https://gas-sales-app.onrender.com/api/expenses', expenseInput)
    .then(res => {
       setOpen(true);
      setError(false);
      console.log('Expense saved:', res.data);
      // Optionally update context or state here
       setExpenseToLedger(prev =>[...prev, res.data]);
       setExpenseInput({
      Date:'',
      InvoiceNo:'',
      Amount:'',
      Narration:'',
      Account:'',
      Type: 'Expense'
    });
    setAccount('')
    })
    .catch(err => {
       setOpen(true);
          setError(true);
      console.error('Error saving expense:', err);
    }); 
     
  }
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  function addExpense() {
    setAddExp(true);
    setViewExp(false);
 
    
  }

  function viewExpense() {
    setViewExp(true);
    setAddExp(false);
  }

const months = Array.from({ length: 12 }, (_, i) =>
  new Date(0, i).toLocaleString('default', { month: 'long' })
);

  const handleMonth = (event) => {
    setMonth(event.target.value);
  };
const accounts =["Accessories", "Domid I", "Domid II", "Cylinder Gas"];

const changeAccount= (event) =>{
  setAcct(event.target.value);
}


// Filter expenses by month + account
const filteredExpenses = expData.filter(exp => {
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
    (acct === "" || exp.Account === acct)
  );
});

//calculate filtered total expense
const totalExp= filteredExpenses.reduce((sum, item)=> sum + Number(item.Amount), 0 );

function handleClose() {
     setOpen(false);
     setViewExp(true);
    setAddExp(false);
}
  return (
    <Box>
       <Typography sx={heading}>Expense</Typography> 
       <Box sx={{display:'flex', justifyContent:'space-evenly', marginTop:'20px', marginBottom:'20px'}}>
        <Button variant='outlined' onClick={addExpense}>+ Add Expense</Button>
       <Button variant='outlined' onClick={viewExpense}>View Expenses</Button></Box>
       
       {addExp && <Box>
        <Typography>Expense from: </Typography>
        <FormControl sx={{width:'9rem', marginTop:'15px'}}>
        <InputLabel id="demo-simple-select-label" sx={{paddingTop:0, marginTop:-1.5}}>Account</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={account}
          label="Account"
          onChange={handleChange}
          sx={{
      height: 30
    }}
        >
          <MenuItem value='Accessories'>Accessories</MenuItem>
          <MenuItem value='Domid I'>Domid I</MenuItem>
          <MenuItem value='Domid II'>Domid II</MenuItem>
          <MenuItem value='Cylinder Gas'>Cylinder Gas</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{display:'flex', alignItems:'center', gap:2, marginTop:'20px'}}> 
        <Typography>Date: {formatted}</Typography>
        <Typography>Invoice No: {invoiceNo}</Typography>
       
         
        </Box>
        <Box sx={{display:'flex', flexDirection:'column', gap:3, marginTop:'15px'}}>
       {/* <Typography variant='h6'>Balance:₦ {account === 'Accessories' ? accTotal : account=== 'Domid I' ? domidTotal: account === 'Domid II' ? domid2Total : account === 'Cylinder Gas' ? cylTotal: 'select account' } </Typography> */}
       <TextField label='Amount'sx={{ width: '10%' }} onChange={handleInput} name='Amount' value={expenseInput.Amount}></TextField>
       <TextField label='Narration' sx={{ width: '70%' }}
        id="outlined-multiline-static"
          multiline
          rows={4} onChange={handleInput} name='Narration' value={expenseInput.Narration}></TextField>
         
      </Box> <Button variant='outlined' sx={{marginY:'10px'}} onClick={handleSave}>Save</Button>
      {/* dialog */}
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
          {error?(<DialogContentText  id="alert-dialog-description">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>Unable to save expense <CancelIcon color='error'/></Box></DialogContentText>)  :(
            <DialogContentText id="alert-dialog-description"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          Expense saved successfully! <CheckCircleOutlineIcon color='success'/></Box>
          </DialogContentText>)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          
        </DialogActions>
      </Dialog>
     </Box>}

     {viewExp && <Paper elevation={3} sx={{padding:'10px', margin:'20px'}}>
      <Box sx={{display:'flex', gap:5, marginTop:4, marginBottom:4}}>
        <FormControl sx={{width: 'fit-content', minWidth:'7rem'}}>
            <InputLabel id="month-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={month}
          label="Month"
          onChange={handleMonth}
        >{months.map((month, index) => <MenuItem key={index} value={month}>{month}</MenuItem>)}
          
        </Select>
        </FormControl>

          <FormControl  sx={{width: 'fit-content', minWidth:'11rem'}}>
            <InputLabel>View by Account</InputLabel>
            <Select 
            value={acct}
              label='Account'
              onChange={changeAccount}> <MenuItem value=''>All Accounts</MenuItem>
              {accounts.map((acc, index)=><MenuItem key={index} value={acc}>{acc}</MenuItem>)}
             
            </Select>
          </FormControl></Box>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Invoice No</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Narration</TableCell>
            </TableRow>    
          </TableHead>
          <TableBody>
            {filteredExpenses.length === 0 ?<Typography sx={{margin:'0 auto', color:'#57564F'}}>No Data...</Typography> : (filteredExpenses.map((exp, index) =>
             <TableRow key={index}>
              <TableCell sx={{ color:'red'}}>{exp.Date}</TableCell>
              <TableCell sx={{ color:'red'}}>{exp.InvoiceNo}</TableCell>
              <TableCell sx={{ color:'red'}}>{exp.Account}</TableCell>
              <TableCell sx={{ color:'red'}}>{exp.Amount}</TableCell>
              <TableCell sx={{ color:'red'}}>{exp.Narration}</TableCell>
             </TableRow>))}                    
          </TableBody>
        </Table>
      </TableContainer>
      <Typography  sx={{ color:'red', margin:'15px'}}>Total Expense: ₦{totalExp}</Typography>
      </Paper> }
    </Box>
  )
}

export default Expense;