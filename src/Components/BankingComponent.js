import React from 'react';
import {
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
export const BankingComponent = ({selectedBank, setSelectedBank, handleNetBankingPayment}) => {
    return(
        <>
        <Box marginRight={2}>
          <Typography variant="subtitle1">Net banking</Typography>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Select Bank</InputLabel>
            <Select
              label="Select Bank"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <MenuItem value="bank1">Bank 1</MenuItem>
              <MenuItem value="bank2">Bank 2</MenuItem>
              <MenuItem value="bank3">Bank 3</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleNetBankingPayment}>
            Make Payment
          </Button>
        </Box></>
    )
}