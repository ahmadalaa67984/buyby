// import jsSHA256 from "jssha"
// const test = new jsSHA256("SHA-256", "TEXT")
// // console.log(test.getHash("HEX"))

function generateBase64(input) {
  // Convert the input to a Base64-encoded string
  const encodedString = btoa(input);
  return encodedString;
}

const input = 'BuybyApp:BuybyApp123';
const encodedBase64 = generateBase64(input);
// console.log(encodedBase64);
