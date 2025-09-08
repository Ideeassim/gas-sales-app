import { Box, FormControl,InputLabel, Select,MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, CircularProgress } from "@mui/material"
import { useContext, useState, useEffect } from "react"
import { StoreContext } from "./StoreContext"
import axios from 'axios';

const Receipts = ({heading}) => {
    const {ledgerData, setLedgerData}=useContext(StoreContext);
    const [loading, setLoading] = useState(true); // loading state

// Fetch data from backend
  const fetchLedgerData = () => {
    setLoading(true); // start loading
    Promise.all([
       axios.get('http://localhost:5000/api/invoices'),
      axios.get("http://localhost:5000/api/domidInvoices"),
      axios.get("http://localhost:5000/api/domid2Invoices"),
      axios.get('http://localhost:5000/api/cylinderInvoices')
      ])
   
      .then(([invoicesRes, domidRes, domid2Res, cylRes]) => {
          // combine invoices + domid into one ledger array
      const combinedInvoices = [...invoicesRes.data, ...domidRes.data, ...domid2Res.data, ...cylRes.data];
      setLedgerData(combinedInvoices);
      console.log(combinedInvoices);
      
          setLoading(false); // stop loading
      })
      .catch((err) => console.error('Error fetching invoices:', err));
        setLoading(false); // stop loading
  };

  useEffect(() => {
    fetchLedgerData();
    console.log(ledgerData);
    
  }, []);
// Get current month name
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
const [month, setMonth]= useState(currentMonth);
const [acct, setAcct]=useState('');

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
const filteredData = ledgerData.filter(item => {
  const dateStr = item.Date || item.date; // fallback in case of lowercase
  if (!dateStr) {
    console.warn("Expense with missing Date:", exp);
    return false;
  }

  const [day, monthStr, year] = dateStr.split("/");
  const itemMonth = new Date(`${year}-${monthStr}-${day}`).toLocaleString("en-US", { month: "long" });
  // ✅ Filter by month and account (allow empty = all accounts)
  return (
    itemMonth === month &&
    (acct === "" || item.account === acct)
  );
});
 
    const hasEmpty = ledgerData.length === 0 || ledgerData.some(obj =>
  Object.values(obj).some(val => String(val).trim() === '')); //treat an empty ledgerData array as invalid 

   if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

  return (
    <Box sx={{padding:'1px'}}>
        <Typography sx={heading}>Receipts</Typography>
        {hasEmpty? (<p>Enter Receipt</p>) : (<Box  sx={{display:'flex',  flexDirection: 'column', gap:2}}>
          <Box sx={{display:'flex', gap:5, margin:4}}>
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
          <Box sx={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
            {filteredData.length === 0 ? (<Typography>no data</Typography>) : filteredData.map((receipt, index) =>
          <Paper key={index} sx={{ width:'43%', margin:'15px', padding:2}} elevation={4}>
            <Box sx={{display:'flex', gap:'10px'}} className="receiptBox">
            <p>Acc: <span style={{color:'#FF7601'}}>{receipt.account}</span></p>
            <p>Date: <span> {receipt.date}</span></p>
            <p>Invoice No: <span>{receipt.invoiceNo}</span></p>
            </Box>

            <TableContainer>
                <Table>
                  {receipt.account ==='Accessories' && <TableHead>
                        <TableRow sx={{ '& th': { fontWeight: 'bold' } }} >
                            <TableCell >Item</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>}
                   {receipt.account === 'Domid I' && <TableHead>
                     <TableRow sx={{ '& th': { fontWeight: 'bold' } }} >
                            <TableCell >Total Kg</TableCell>
                            <TableCell>No Of Bottles</TableCell>
                            <TableCell>Unit Cost Price</TableCell>
                            <TableCell>Unit Sale Price</TableCell>
                            <TableCell>Cash Collected</TableCell>
                            <TableCell>Cash Paid</TableCell>
                            <TableCell>Profit</TableCell>
                        </TableRow></TableHead> }
                   {receipt.account === 'Domid II' && <TableHead>
                     <TableRow sx={{ '& th': { fontWeight: 'bold' } }} >
                            <TableCell >Customer Name</TableCell>
                            <TableCell >Total Kg</TableCell>
                            <TableCell>No Of Bottles</TableCell>
                            <TableCell>Unit Cost Price</TableCell>
                            <TableCell>Unit Sale Price</TableCell>
                            <TableCell>Cash Collected</TableCell>
                            <TableCell>Cash Paid</TableCell>
                            <TableCell>Profit</TableCell>
                        </TableRow></TableHead> }
                   {receipt.account === 'Cylinder Gas' && <TableHead>
                     <TableRow sx={{ '& th': { fontWeight: 'bold' } }} >                            
                            <TableCell >Total Kg</TableCell>
                            <TableCell>Gas Filled</TableCell>
                            <TableCell>Gas Dispensed</TableCell>
                            <TableCell>Cost Price</TableCell>
                            <TableCell>Sale Price</TableCell>
                            <TableCell>Sale Amount</TableCell>
                            <TableCell>Purchase Amount</TableCell>
                            <TableCell>Profit</TableCell>
                        </TableRow></TableHead> }
                     {receipt.account ==='Accessories' && <TableBody>{receipt.receipt.map((item, i) =>  <TableRow key={i}>
                            <TableCell>{item.item}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.total}</TableCell>
                        </TableRow>)}                       
                    </TableBody>}
                      {receipt.account ==='Domid I' && <TableBody>{receipt.receipt.map((item, i) =>  <TableRow key={i}>
                            <TableCell>{item.totalKg}</TableCell>
                            <TableCell>{item.numberOfBottles}</TableCell>
                            <TableCell>{item.unitCostPrice}</TableCell>
                            <TableCell>{item.unitSalePrice}</TableCell>
                            <TableCell>{item.cashGiven}</TableCell>
                            <TableCell>{item.cashPaid}</TableCell>
                            <TableCell>{item.profit}</TableCell>
                        </TableRow>)}                       
                    </TableBody>}
                      {receipt.account ==='Domid II' && <TableBody>{receipt.receipt.map((item, i) =>  <TableRow key={i}>
                            <TableCell>{item.customerName}</TableCell>
                            <TableCell>{item.totalKg}</TableCell>
                            <TableCell>{item.numberOfBottles}</TableCell>
                            <TableCell>{item.unitCostPrice}</TableCell>
                            <TableCell>{item.unitSalePrice}</TableCell>
                            <TableCell>{item.cashGiven}</TableCell>
                            <TableCell>{item.cashPaid}</TableCell>
                            <TableCell>{item.profit}</TableCell>
                        </TableRow>)}                       
                    </TableBody>}
                      {receipt.account ==='Cylinder Gas' && <TableBody>{receipt.receipt.map((item, i) =>  <TableRow key={i}>
                            
                            <TableCell>{item.totalKg}</TableCell>
                            <TableCell>{item.gasFilled}</TableCell>
                            <TableCell>{item.gasDispensed }</TableCell>
                            <TableCell>{item.costPrice}</TableCell>
                            <TableCell>{item.salePrice}</TableCell>
                            <TableCell>{item.saleAmount}</TableCell>
                            <TableCell>{item.purchaseAmount}</TableCell>
                            <TableCell>{item.profit}</TableCell>
                        </TableRow>)}                       
                    </TableBody>}
                </Table>
            </TableContainer>
            <p style={{fontWeight:'700'}}>Grand Total:<span style={{fontWeight:'200'}}> ₦{receipt.grandTotal}</span></p>
        </Paper>)}</Box></Box>)}
    </Box>
  )
}

export default Receipts