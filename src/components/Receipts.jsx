import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, CircularProgress } from "@mui/material"
import { useContext, useState, useEffect } from "react"
import { StoreContext } from "./StoreContext"
import axios from 'axios';

const Receipts = ({heading}) => {
    const {ledgerData, setLedgerData}=useContext(StoreContext);
    const [loading, setLoading] = useState(true); // loading state

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
    <Box>
        <Typography sx={heading}>Receipts</Typography>
        {hasEmpty? (<p>Enter Receipt</p>) : (<Box  sx={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
            {ledgerData.map((receipt, index) =>
        <Paper sx={{padding:'15px', gap:'15px', width:'43%', margin:'15px'}} elevation={3} key={index}>
            <Box sx={{display:'flex', gap:'10px'}} className="receiptBox">
            <p>Acc: <span style={{color:'#FF7601'}}>{receipt.account}</span></p>
            <p>Date: <span> {receipt.date}</span></p>
            <p>Invoice No: <span>{receipt.invoiceNo}</span></p>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ '& th': { fontWeight: 'bold' } }} >
                            <TableCell >Item</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{receipt.receipt.map((item, i) =>  <TableRow key={i}>
                            <TableCell>{item.item}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.total}</TableCell>
                        </TableRow>)}                       
                    </TableBody>
                </Table>
            </TableContainer>
            <p style={{fontWeight:'700'}}>Grand Total:<span style={{fontWeight:'200'}}>{receipt.grandTotal}</span></p>
        </Paper>)}</Box>)}
    </Box>
  )
}

export default Receipts