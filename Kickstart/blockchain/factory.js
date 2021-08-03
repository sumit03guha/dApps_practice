import web3 from './web3';
import compiledFactoryContract from './build/FactoryKickstarter.json';

const instance = new web3.eth.Contract(
  compiledFactoryContract.abi,
  '0x33697eC35146ceA6e13EF8df13518A4Af85AFd1f'
);

export default instance;
