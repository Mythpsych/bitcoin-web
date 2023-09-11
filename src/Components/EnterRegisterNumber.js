import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

function InputCard() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.replace("/payment");
    // You can perform any necessary logic here with the input value.
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column", // Place items vertically
        alignItems: "center", // Center items horizontally
        justifyContent: "center",
        height: "100vh", // Adjust this to control the vertical centering
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Register Number
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="input-field"
              label="Enter the Register number"
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ marginTop: 20 }}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}
              >
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default InputCard;
