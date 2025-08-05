// src/StoreProvider.js
import React, { useState } from 'react';
import { StoreContext } from './StoreContext';

export const StoreProvider = ({ children }) => {
   
 
  const [accessoryData, setAccessoryData] = useState([]);
  const [ledgerData, setLedgerData]= useState([]);
  const [receiptTotal, setReceiptTotal]= useState([]);
    //get date
const today = new Date();
  const day = today.getDate(); // No leading zero
const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero
const year = today.getFullYear();

const formatted = `${day}/${month}/${year}`;



 
  return (
    <StoreContext.Provider value={{ accessoryData, setAccessoryData,
     formatted, ledgerData,
      setLedgerData,
      receiptTotal, setReceiptTotal
       }}>
      {children}
    </StoreContext.Provider>
  );
};
