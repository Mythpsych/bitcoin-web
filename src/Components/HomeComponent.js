import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardComponent } from "./CardComponent";
import { BankingComponent } from "./BankingComponent";
import { BitcoinComponent } from "./BitcoinComponent";
import { Alert, Container } from "@mui/material";
import "./homeComponent.css";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function HomeComponent() {
  const [amount, setAmount] = useState(75000);
  const [bitcoinAmount, setBitcoinAmount] = useState(0.03555379853912609);
  const [bitcoinWallet, setBitcoinWallet] = useState(4);
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  // Functions for handling payments
  const handleCardPayment = () => {
    // Perform card payment validation and processing (mock)
    if (validateCardPayment()) {
      // Payment successful
      setPaymentStatus("Card payment successful!");
    } else {
      // Payment failed
      setPaymentStatus("Card payment failed.");
    }
  };

  const handleNetBankingPayment = () => {
    // Perform net banking payment processing (mock)
    // Simulate a successful payment
    setPaymentStatus("Net banking payment successful!");
  };

  const handleBitcoinPayment = () => {
    // Perform bitcoin payment validation and processing (mock)
    if (validateBitcoinPayment()) {
      // Payment successful
      setPaymentStatus("Bitcoin payment successful!");
      // Deduct bitcoinAmount from wallet (mock)
      setBitcoinWallet((prevAmount) => (prevAmount - bitcoinAmount).toFixed(8));
    } else {
      // Payment failed
      setPaymentStatus("Bitcoin payment failed.");
    }
  };

  // Payment validation functions
  const validateCardPayment = () => {
    return true; // Add your validation logic here
  };

  const validateBitcoinPayment = () => {
    return !!walletAddress && bitcoinAmount > 0;
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPaymentStatus("");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom>
          Payment portal
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Typography variant="h6">Bitcoin wallet: {bitcoinWallet}</Typography>
          <Typography variant="h6">Amount: {amount}</Typography>
        </Box>
      </Container>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Card" {...a11yProps(0)} />
          <Tab label="Net Banking" {...a11yProps(1)} />
          <Tab label="Bitcoin" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CardComponent handleCardPayment={handleCardPayment} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BankingComponent
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          handleNetBankingPayment={handleNetBankingPayment}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <BitcoinComponent
          bitcoinAmount={bitcoinAmount}
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          handleBitcoinPayment={handleBitcoinPayment}
        />
      </CustomTabPanel>
      <>
        {paymentStatus !== "" && (
          <>
            {paymentStatus.indexOf("successful") > 0 ? (
              <Alert severity="success">Payment Successful</Alert>
            ) : (
              <Alert severity="error">Payment Failed</Alert>
            )}
          </>
        )}
      </>
    </Box>
  );
}
