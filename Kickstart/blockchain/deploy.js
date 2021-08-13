import truffle from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import creds from './credentials.js';

import compiledFactoryContract from './build/FactoryKickstarter.json';

const mnemonic = creds.mnemonicPhrase;
const providerOrUrl = creds.url;

const provider = new truffle(mnemonic, providerOrUrl);
const web3 = new Web3(provider);

const interface_abi = compiledFactoryContract.abi;
const bytecode = compiledFactoryContract.evm.bytecode.object;

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('account address : ', accounts[0]);

  const factory = await new web3.eth.Contract(interface_abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0] });

  console.log('contract deployed from : ', factory.options.address);
};

deploy();
