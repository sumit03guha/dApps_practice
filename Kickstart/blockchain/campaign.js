import compiledKickstarter from './build/Kickstarter.json';
import web3 from './web3';

export default (address) => {
  return new web3.eth.Contract(compiledKickstarter.abi, address);
};
