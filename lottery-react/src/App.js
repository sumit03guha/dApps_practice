// import logo from './logo.svg';
import './App.css';
import lotteryAbi from './lottery';
import { useState } from 'react';
import { useEffect } from 'react';
import Web3 from 'web3';

function App() {
  const [manager , setManager] = useState();
  const [contract , setContract] = useState();

  const loadBlockchain = async () => {
    // await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);
    const contract1 = await new window.web3.eth.Contract(lotteryAbi , '0xBC3ec9Fd4C34cAA40a934703E825Ee058C2D9570');
    // console.log(await new window.web3.eth.Contract(lotteryAbi , '0xBC3ec9Fd4C34cAA40a934703E825Ee058C2D9570'));
    setContract(contract1);
    console.log("blockchain")
  } 

  const managerAddress = async () => {
    const manager1 = await contract.methods.getManager().call();
    setManager(manager1); 
    console.log("man");  
  }

  useEffect(()=>{
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
