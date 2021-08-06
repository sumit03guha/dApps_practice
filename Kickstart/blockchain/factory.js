import web3 from './web3';
import compiledFactoryContract from './build/FactoryKickstarter.json';

const instance = new web3.eth.Contract(
  compiledFactoryContract.abi,
  '0xF92709C0607deb954610938E8Cf4892314d1F3a1'
);

export default instance;
