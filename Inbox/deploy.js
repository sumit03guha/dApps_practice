import truffle from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import creds from './credentials.js';
const mnemonic = creds.mnemonicPhrase;
const providerOrUrl = creds.url;

const provider = new truffle(mnemonic , providerOrUrl);
const web3 = new Web3(provider);

import compile from './compile.js';
const interface_abi = compile.contracts['Inbox.sol'].Inbox.abi;
const bytecode = compile.contracts['Inbox.sol'].Inbox.evm.bytecode.object;

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    const inbox = await new web3.eth.Contract(interface_abi)
    .deploy({data : bytecode , arguments : ['Heylo!']})
    .send({from : accounts[3] , gas: '1000000'});

    console.log("account address : " , accounts[3]);
    console.log("contract deployed from : " , inbox.options.address);
}

deploy();