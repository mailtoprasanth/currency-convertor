import { useEffect } from "react";
import { useState } from "react";
import CurrencyDropdown from "./currency-dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";
import Currency from "react-currency-formatter";
import { TbInfoTriangle } from "react-icons/tb";

const CurrencyConvertor = () => {
  // currencies URL
  const host = "https://api.frankfurter.app";
  const getCurrencies = "/currencies";

  const [error, setError] = useState("");
  const [amount, setAmount] = useState(1);
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);

  const favHandler = (currency) => {
    console.log(currency);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  const fetchCurrencies = async () => {
    try {
      const res = await fetch(`${host + getCurrencies}`);
      const currencyData = await res.json();
      setCurrencies(Object.keys(currencyData));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(currencies);
  useEffect(() => {
    fetchCurrencies();
  }, []);

  const convert = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `${host}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      console.log(data);
      setConvertedAmount(data.rates[toCurrency]);
      setError("");
    } catch (error) {
      setError(error?.message);
      console.log(error);
    } finally {
      setConverting(false);
    }
  };
  
  useEffect(() => {
    convert();
  }, [toCurrency]);

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-xl font-semibold text-gray-700  ">
        Currency Convertor
      </h2>
      {error && (
        <span className="flex justify-center gap-1 font-medium text-red-500">
          <TbInfoTriangle className=" text-xl" /> Please try with other currency
        </span>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          currencies={currencies}
          title="From"
          favHandler={favHandler}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
        />
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-green-200 rounded-full cursor-pointer hover:bg-green-300"
            type="button"
          >
            <HiArrowsRightLeft className="text-xl text-gray-900" />
          </button>
        </div>
        <CurrencyDropdown
          currencies={currencies}
          t
          title="To"
          favHandler={favHandler}
          currency={toCurrency}
          setCurrency={setToCurrency}
        />
      </div>
      <div className="mt-4 ">
        <label htmlFor="amount">Amount:</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          name="amount"
          className=" w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400  "
          id=""
        />
      </div>
      <div className="flex justify-end mt-5">
        <button
          onClick={convert}
          type="button"
          className={`py-2 px-6 bg-indigo-600 focus:outline-none focus:ring-indigo-950 focus:ring-2 text-white hover:bg-indigo-700 focus:ring-offset-1 rounded-lg ${
            converting ? "animate-pulse" : ""
          }`}
        >
          Convert
        </button>
      </div>
      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-gray-800">
          Converted amount:{" "}
          <span className=" text-red-700">
            <Currency quantity={convertedAmount} currency={toCurrency} />
          </span>
        </div>
      )}
    </div>
  );
};

export default CurrencyConvertor;
