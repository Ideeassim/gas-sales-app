import { Box, Typography, FormControl, InputLabel, MenuItem, Select, TextField, Button, CircularProgress } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from './StoreContext';
import axios from 'axios';

const Expense = ({heading}) => {

// Fetch data from backend
  const fetchLedgerData = () => {
    setLoading(true); // start loading
    axios
      .get('http://localhost:5000/api/invoices')
      .then((res) => {
        setLedgerData(res.data);
          setLoading(false); // stop loading
      })
      .catch((err) => console.error('Error fetching invoices:', err));
        setLoading(false); // stop loading
  };

  useEffect(() => {
    fetchLedgerData();
  }, []);
const{ledgerData, formatted,  setExpenseToLedger, setLedgerData }= useContext(StoreContext);
  const ledgerTotal= ledgerData.reduce((sum, item) => sum + Number(item.grandTotal), 0);

 const [loading, setLoading] = useState(true); // loading state
const [account, setAccount] =useState('');
const[expenseInput, setExpenseInput] =useState({
      Date:'',
      InvoiceNo:'',
      Amount:'',
      Narration:'',
      Account:'',
      Type: 'Expense'
    });
   
 
const[invoiceNo, setInvoiceNo]=useState('')


  const handleChange = (event) => {
    setAccount(event.target.value);
    setInvoiceNo(Math.floor(1000 + Math.random() * 9000));
  };

  function handleInput(event) {
    const{name, value}=event.target;
    setExpenseInput(prev =>({...prev, [name]: value, Date:formatted, InvoiceNo: invoiceNo}));
  
    switch (account) {
      case 'Accessories':
        setExpenseInput(prev =>({...prev, Account:'Accessories'}))
        break;
    
      default:
        console.warn('no account')
        break;
    }
    
  };

  function handleSave() {
      // console.log(expenseInput);
     

        axios.post('http://localhost:5000/api/expenses', expenseInput)
    .then(res => {
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
  return (
    <Box>
       <Typography sx={heading}>Expense</Typography> 
       
        <Typography>Expense from: </Typography>
        <FormControl sx={{width:'9rem', marginTop:'10px'}}>
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
        </Select>
      </FormControl>
      <Box sx={{display:'flex', alignItems:'center', gap:2, marginTop:'10px'}}> 
        <Typography>Date: {formatted}</Typography>
        <Typography>Invoice No: {invoiceNo}</Typography>
       
         
        </Box>
        <Box sx={{display:'flex', flexDirection:'column', gap:3}}>
       <Typography variant='h6'>{account}:₦ {ledgerTotal} </Typography>
       <TextField label='Amount'sx={{ width: '10%' }} onChange={handleInput} name='Amount' value={expenseInput.Amount}></TextField>
       <TextField label='Narration' sx={{ width: '70%' }}
        id="outlined-multiline-static"
          multiline
          rows={4} onChange={handleInput} name='Narration' value={expenseInput.Narration}></TextField>
         
      </Box> <Button variant='outlined' sx={{marginY:'10px'}} onClick={handleSave}>Save</Button>
    </Box>
  )
}

export default Expense