import React from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
export const BitcoinComponent = ({bitcoinAmount, walletAddress, setWalletAddress, handleBitcoinPayment}) => {
    return(
        <>
        <Box>
          <Typography variant="subtitle1">Bitcoin payment</Typography>
          <Typography variant="body1">Bitcoin Amount: {bitcoinAmount}</Typography>
          <TextField
            label="Wallet Address"
            fullWidth
            variant="outlined"
            margin="normal"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleBitcoinPayment}>
            Make Payment
          </Button>
        </Box>
        </>
    )
}