import web3 from './web3';
import compiledFactoryContract from './build/FactoryKickstarter.json';
import credentials from './credentials';

const address = credentials.contractAddress;

const instance = new web3.eth.Contract(compiledFactoryContract.abi, address);

export default instance;
