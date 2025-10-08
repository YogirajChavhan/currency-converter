const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.ConvertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const ToCurrencyElement = document.querySelector('.ToCurrency');
const resultElement = document.querySelector('.result');

// Array to populate the select tags with these currencies
const countries = [
  { code: "USD", name: "United States Dollar" },
  { code: "INR", name: "Indian Rupee" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "NZD", name: "New Zealand Dollar" }
];

// Showing countries from array to select tag
countries.forEach(country => {
  const option1 = document.createElement('option');
  const option2 = document.createElement('option');

  option1.value = option2.value = country.code;
  option1.textContent = option2.textContent = `${country.code} (${country.name})`;

  fromCurrencyElement.appendChild(option1);
  ToCurrencyElement.appendChild(option2);
});

//  Set default values of select tags (outside the loop)
fromCurrencyElement.value = "USD";
ToCurrencyElement.value = "INR";

//function to get exchange rate using API
const getExchangeRate = async () => {
    const amount =parseFloat(fromAmountElement.value);
    const fromCurrency =fromCurrencyElement.value;
    const ToCurrency =ToCurrencyElement.value;

    //fetch data from API
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();

    const conversionRate = data.rates[ToCurrency];
    const convertedAmount = (amount * conversionRate);

    convertedAmountElement.value=convertedAmount;
    resultElement.textContent = `${amount} ${fromCurrency} =${convertedAmount} ${ToCurrency}`
}
// featching exchange rate when user input the amount 
fromAmountElement.addEventListener('input',getExchangeRate);
fromCurrencyElement.addEventListener('change',getExchangeRate);
ToCurrencyElement.addEventListener('change',getExchangeRate);
window.addEventListener('load',getExchangeRate);