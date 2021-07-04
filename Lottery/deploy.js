import truffle from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import compiledContract from './compile.js';
import creds from './Credentials.js';

const mnemonic = creds.mnemonicPhrase;
const providerOrUrl = creds.url;

const provider = new truffle(mnemonic , providerOrUrl);
const web3 = new Web3(provider);

const interface_abi = compiledContract.contracts['Lottery.sol'].Lottery.abi;
const bytecode = compiledContract.contracts['Lottery.sol'].Lottery.evm.bytecode.object;

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const lottery = await new web3.eth.Contract(interface_abi)
    .deploy({data : bytecode}).send({from : accounts[3]});

    console.log("account address : " , accounts[3]);
    console.log("contract deployed from : " , lottery.options.address);
}

deploy();
