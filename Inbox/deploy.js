const truffle = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const creds = require('./credentials');
const mnemonic = creds.mnemonicPhrase;
const providerOrUrl = creds.url;

const provider = new truffle(mnemonic , providerOrUrl);
web3 = new Web3(provider);

const compile_contract = require('./compile.js');
const interface_abi = compile_contract.contracts['Inbox.sol'].Inbox.abi;
const bytecode = compile_contract.contracts['Inbox.sol'].Inbox.evm.bytecode.object;

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    const inbox = await new web3.eth.Contract(interface_abi)
    .deploy({data : bytecode , arguments : ['Heylo!']})
    .send({from : accounts[3] , gas: '1000000'});

    console.log("account address : " , accounts[3]);
    console.log("contract deployed from : " , inbox.options.address);
}

deploy();