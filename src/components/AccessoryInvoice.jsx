import { Box, Table, TableCell, TableContainer, TableHead, TableRow, Typography, FormControl, InputLabel,Select, MenuItem, TableBody, TextField, Button } from '@mui/material'
import { StoreContext } from './StoreContext';
import{ React, useContext, useState}from 'react';


const AccessoryInvoice = ({heading, invoiceNo}) => {
   const {accessoryData, setAccessoryData, formatted} = useContext(StoreContext);
  
  const [accessoryItem, setAccessoryItem]= useState('');
   const[accessoryInput, setAccessoryInput] = useState({   
    invoiceNo:'', 
   Item:'',
  Quantity:'',
  Price:'',
  Total:''
   });

  const handleChange = (event) => {
    const {name, value}=event.target

     
      const input ={...accessoryInput, [name]:value, invoiceNo: invoiceNo};
      const PriceInput= parseFloat(input.Price || 0, 0);
      const QuantityInput = parseFloat(input.Quantity || 0, 0);
      const TotalInput = PriceInput * QuantityInput
       setAccessoryInput({...input, Total: TotalInput});
      
    
   
  };

  function handleAccessory(event) {
    setAccessoryItem(event.target.value);
    setAccessoryInput(prev => ({...prev, Item:event.target.value}))
  };

  //create a receipt
  function handleSave() {
const hasEmpty = Object.values(accessoryInput).some(val => String(val).trim() === '');// check for empty fields

    if (hasEmpty) {
      alert('enter all fields!')
    }else{ 
    setAccessoryData(prev => [...prev, accessoryInput]);
    setAccessoryInput({ Item:'',
  Quantity:'',
  Price:'',
Total:''});
setAccessoryItem('') 

  };
 
  
  }




  return (
     <Box sx={{padding:'10px'}}>
    <Typography sx={heading} textAlign='center'>Accessory Invoice</Typography >
  <Box sx={{ minWidth: 120 }}>
    <Box sx={{marginBottom:'45px'}}>
    <Typography gutterBottom>Date: {formatted}</Typography>
    <Typography gutterBottom>Invoice No: {invoiceNo}</Typography>
    </Box>
      <FormControl sx={{width:'9rem'}}>
        <InputLabel id="demo-simple-select-label">Accessory</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={accessoryItem}
          label="Accessory"
          onChange={handleAccessory}
        >
          <MenuItem name='Hose' value='Hose'>Hose</MenuItem>
          <MenuItem name='CampingValve' value='Camping Valve'>Camping Valve</MenuItem>
          <MenuItem name='StandardValve' value='Standard Valve'>StandardValve</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <TableContainer>    
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>item</TableCell>
          <TableCell>quantity</TableCell>
          <TableCell>price</TableCell>
          <TableCell>total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell><TextField name='Item' value={accessoryItem}/></TableCell>
          <TableCell><TextField  onChange={handleChange} name='Quantity' value={accessoryInput.Quantity}/></TableCell>
          <TableCell><TextField onChange={handleChange} name='Price' value={accessoryInput.Price}/></TableCell>
          <TableCell><TextField onChange={handleChange} name='Total' value={accessoryInput.Total}  InputProps={{ readOnly: true }}/></TableCell>
        </TableRow>
       
      </TableBody>
    </Table>
    </TableContainer> <Button onClick={handleSave}>save</Button>
  </Box>
    
  )
}

export default AccessoryInvoice