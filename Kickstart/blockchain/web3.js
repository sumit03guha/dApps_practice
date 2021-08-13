import Web3 from 'web3';
import credentials from './credentials';

let web3;
const providerURL = credentials.url;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(providerURL);
  web3 = new Web3(provider);
}

export default web3;
