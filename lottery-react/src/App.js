// import logo from './logo.svg';
import './App.css';
import lottery from './lottery';
import { useState } from 'react';
import { useEffect } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

const ABI = lottery.abi;
const address = lottery.address;

function App() {
  const [manager , setManager] = useState();
  const [contract , setContract] = useState();
  
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
    const web3 = new Web3(window.ethereum);
    const contract1 = await new web3.eth.Contract(ABI , address);
    setContract(contract1);
    console.log(await new web3.eth.Contract(ABI , address).methods);
    // the methods are showing up perfectly but whenever I access the getManager as shown in the managerAddress below it gives the error as shown
    // in the image.
    console.log("contract loaded");
  } 

  const managerAddress = async () => {
    const manager1 = await contract.methods.getManager().call(); // THIS IS WHERE THE ERROR OCCURS.
    setManager(manager1); 
    console.log(manager);  
  }

  useEffect(()=>{
    loadweb3();
    loadBlockchain();
    console.log('1');    
    managerAddress();
    console.log('component mounted!'); 
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
