import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./Home.scss";
import { Button } from "@mui/material";
export default function Home() {
  const [allData, setAllData] = useState([]);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [btcValue, setBtcValue] = useState(0);
  const [enteredINR, setEnteredINR] = useState(0);
  const [bitcoinEquivalent, setBitCoinEquivalent] = useState(0);
  const currencyConversions = {
    usd: 1,
    inr: 82,
    eur: 0.91,
    kd: 0.31,
  };

  useEffect(() => {
    getAllRates();
  }, []);
  const getAllRates = async () => {
    axios
      .get(`http://localhost:4000/getBitcoinPrice`)
      .then((response) => {
        if (response.status === 200) {
          let processedJson = response.data.data.map((v) => {
            return {
              label: v.name,
              symbol: v.symbol,
              price: v.quote.USD.price,
              convertedPrice: v.quote.USD.price,
            };
          });
          // console.log(response.data.data[0].quote.USD.price);
          setBtcValue(
            response.data.data[0].quote.USD.price * currencyConversions["inr"]
          );
          setAllData(processedJson);
        } else if (response.status === 429) {
          setError("limit exceeded");
        } else {
          setError("Please try again later");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event, value) => {
    setSelectedOptions(value);
    console.log(value);
  };

  const handleSetCurrency = (currency) => {
    setSelectedCurrency(currency);
    setSelectedOptions({
      ...selectedOptions,
      convertedPrice: selectedOptions.price * currencyConversions[currency],
    });
    // console.log(selectedOptions );
  };
  const handleTextChange = (e) => {
    let value = e.target.value;
    setEnteredINR(value === "" ? 0 : parseInt(value));
    setBitCoinEquivalent(value / btcValue);
  };

  return (
    <>
      <div className="body">
        <div className="title">Bitcoin Estimation</div>
        <div
          className="title-payment"
          onClick={() => window.location.replace("/reg")}
        >
          Make Payment
        </div>
        <div className="input-block">
          <Autocomplete
            disablePortal
            forcePopupIcon={false}
            closeText=""
            id="combo-box-demo"
            options={allData}
            sx={{ width: 300 }}
            onChange={handleChange}
            fullWidth
            renderInput={(params) => (
              <TextField
                sx={{
                  "& fieldset": { border: "none" },
                }}
                {...params}
              />
            )}
          />
        </div>

        {selectedOptions && (
          <>
            <div className="symbol">{`Symbol: ${selectedOptions.symbol}`}</div>
            <div className="price">{`Price: ${Math.round(
              selectedOptions.convertedPrice
            )} ${selectedCurrency.toUpperCase()}`}</div>
            <div className="currencyParent">
              <div
                className="currencyChild"
                style={{
                  backgroundColor: selectedCurrency === "usd" && "grey",
                }}
                onClick={() => handleSetCurrency("usd")}
              >
                USD
              </div>
              <div
                className="currencyChild"
                style={{
                  backgroundColor: selectedCurrency === "inr" && "grey",
                }}
                onClick={() => handleSetCurrency("inr")}
              >
                INR
              </div>
              <div
                className="currencyChild"
                style={{
                  backgroundColor: selectedCurrency === "eur" && "grey",
                }}
                onClick={() => handleSetCurrency("eur")}
              >
                EUR
              </div>
              <div
                className="currencyChild"
                style={{ backgroundColor: selectedCurrency === "kd" && "grey" }}
                onClick={() => handleSetCurrency("kd")}
              >
                KD
              </div>
            </div>
          </>
        )}
        <div className="input-block-text">
          <TextField
            type="number"
            onChange={(e) => handleTextChange(e)}
            sx={{
              "& fieldset": { border: "none" },
            }}
            style={{ marginLeft: -50, fontSize: 10 }}
            placeholder="Enter INR value"
          />
        </div>
        {enteredINR !== 0 && (
          <div className="input-block-text-res">
            <span>{`Bitcoin Value for ₹${enteredINR} is ${bitcoinEquivalent}`}</span>
          </div>
        )}

        <div className="gradient"></div>
      </div>
    </>
  );
}
