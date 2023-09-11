import React from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
export const CardComponent = ({handleCardPayment}) => {
    return(
        <>
        <Box marginRight={2}>
          <Typography variant="subtitle1">Card payment</Typography>
          <TextField label="Card Number" fullWidth variant="outlined" margin="normal" />
          <TextField label="Month" fullWidth variant="outlined" margin="normal" />
          <TextField label="Year" fullWidth variant="outlined" margin="normal" />
          <TextField label="CVV" fullWidth variant="outlined" margin="normal" />
          <Button variant="contained" color="primary" onClick={handleCardPayment}>
            Make Payment
          </Button>
        </Box></>
    )
}