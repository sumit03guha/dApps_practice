import { react, useState, useEffect } from 'react';
import * as solanaWeb3 from '@solana/web3.js';

const App = () => {
  const NETWORK = solanaWeb3.clusterApiUrl('devnet');
  const connection = new solanaWeb3.Connection(NETWORK);

  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState();
  const [user, setUser] = useState('Not Connected');
  const [transactionHash, setTransactionHash] = useState();

  const init = () => {
    window.onload = () => {
      if (window.solana && window.solana.isPhantom) setConnected(true);
    };
  };

  const connectHandler = async () => {
    if (connected) {
      const response = await window.solana.connect();
      console.log(response.publicKey.toString());
      setUser(response.publicKey.toString());
      setProvider(window.solana);
    } else {
      console.log('No Provider');
      window.alert('No Provider');
    }
  };

  const disconnectHandler = async () => {
    const response = await window.solana.disconnect();
    setUser('NOT CONNECTED');
    setProvider(null);
  };

  const createTransferTransaction = async (destAddr, amount) => {
    if (!provider.publicKey) return;
    const destination = new solanaWeb3.PublicKey(destAddr);
    let transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: destination,
        lamports: solanaWeb3.LAMPORTS_PER_SOL * amount,
      })
    );
    transaction.feePayer = provider.publicKey;
    console.log('Getting recent blockhash');
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    return transaction;
  };

  const sendTransaction = async (e) => {
    e.preventDefault();
    const destAddr = e.target[0].value;
    const amount = e.target[1].value;
    try {
      const transaction = await createTransferTransaction(destAddr, amount);
      if (!transaction) return;
      let signed = await provider.signTransaction(transaction);
      console.log('Got signature, submitting transaction');
      let signature = await connection.sendRawTransaction(signed.serialize());
      console.log(
        'Submitted transaction ' + signature + ', awaiting confirmation'
      );
      await connection.confirmTransaction(signature);
      console.log('Transaction ' + signature + ' confirmed');
      setTransactionHash(`https://solscan.io/tx/${signature}?cluster=devnet`);
    } catch (err) {
      console.warn(err);
      console.log('[error] sendTransaction: ' + JSON.stringify(err));
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div>PROVIDER : {connected ? 'True' : 'False'}</div>
      <br />
      <div>ADDRESS : {user}</div>
      <br />
      <button onClick={connectHandler}>CONNECT</button>
      <br />
      <button onClick={disconnectHandler} disabled={!provider}>
        DISCONNECT
      </button>
      <br />
      <br />
      <form onSubmit={sendTransaction}>
        <label>
          TRANSFER:
          <br />
          DESTINATON:
          <input type='text' name='id' />
          <br />
          AMOUNT:
          <input name='number' />
        </label>
        <input type='submit' value='Submit' disabled={!provider} />
      </form>
      <br />
      <a href={transactionHash}>TRANSACTION HASH : {transactionHash}</a>
    </>
  );
};

export default App;
