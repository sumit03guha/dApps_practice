// import logo from './logo.svg';
import './App.css';
import lottery from './lottery';
import { useState } from 'react';
import { useEffect } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import React from 'react';

const ABI = lottery.abi;
const address = lottery.address;

function App() {
  const [manager , setManager] = useState(null);
  const [contract , setContract] = useState(null);
  
  const loadweb3 = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      console.log('Ethereum successfully detected!');
 
  // provider === window.ethereum 
    
    const chainId = await provider.request({
      method: 'eth_chainId'
    })
    } else {
  // if the provider is not detected, detectEthereumProvider resolves to null
      console.log('Please install MetaMask!')
    }
    
    const web3 = new Web3(provider);
    console.log(await web3.eth.getAccounts()) //the account shows up fine that will be called to deploy the contract.
  }
  
  const loadBlockchain = async () => {
    await window.ethereum.send('eth_requestAccounts');
    const web3 = new Web3(window.ethereum);
    const contract = await new web3.eth.Contract(ABI , address);
    setContract(contract);
    console.log(await contract.methods.getManager());
    // the methods are showing up perfectly but whenever I access the getManager as shown in the managerAddress below it gives the error as shown
    // in the image.
    console.log("contract loaded");
  } 

  const managerAddress = async () => {
    const manager = await contract.methods.getManager().call(); // THIS IS WHERE THE ERROR OCCURS.
    setManager(manager); 
    console.log(manager);  
  }

  useEffect(()=>{
    (async () => {
      await loadweb3();
      await loadBlockchain();
      console.log('1');    
      // await managerAddress();
      // console.log('component mounted!');
    })()
  },[])

  useEffect(()=>{
    (async () => {
      // await loadweb3();
      // await loadBlockchain();
      if (contract != null) {
        console.log('1');    
        await managerAddress();
        console.log('component mounted!');
      }
      })()
  },[])
  
  return (
    <div>
      <h2>Lottery contract</h2> 
      <p>This contract is managed by {manager}</p>
    </div>
  );
}

// window.ethereum.request({ method: 'eth_accounts' }).then(console.log);

export default App;
