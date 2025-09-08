import { InputAdornment, Box, Table, TableCell, TableContainer, TableHead, TableRow, Typography, FormControl, InputLabel,Select, MenuItem, TableBody, TextField, Button } from '@mui/material'
import { StoreContext } from './StoreContext';
import{ React, useContext, useState}from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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

const accessories=["Standard Valve", "Camping Valve", "Hose", "Hose Clip","Standard Regulator HP", "Standard Regulator LP"]


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
         {accessories.map((item, index) => <MenuItem key={index} name={item} value={item}>{item}</MenuItem>)} 
      
        </Select>
      </FormControl>
    </Box>
    <TableContainer sx={{marginTop:'10px'}}>    
    <Table>
      <TableHead>
        <TableRow>
          <TableCell> Item</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell><TextField name='Item' value={accessoryItem}/></TableCell>
          <TableCell><TextField  onChange={handleChange} name='Quantity' value={accessoryInput.Quantity} type='number'/></TableCell>
          <TableCell><TextField onChange={handleChange} name='Price' value={accessoryInput.Price}  slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">₦</InputAdornment>,
            }}}/></TableCell>
          <TableCell><TextField onChange={handleChange} name='Total' value={accessoryInput.Total}  InputProps={{ readOnly: true }} slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">₦</InputAdornment>,
            }}}/></TableCell>
        </TableRow>
       
      </TableBody>
    </Table>
    </TableContainer>

            <Fab onClick={handleSave} sx={{ backgroundColor:'white', color:'#F97A00', margin:'10px'}} ><AddIcon /></Fab>
    

  </Box>
    
  )
}

export default AccessoryInvoice