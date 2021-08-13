import ganache from 'ganache-cli';
import assert from 'assert';
import mocha from 'mocha';
import Web3 from 'web3';
import compiled_contract from '../blockchain/compile.js';

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let factory;
let kickstarter;
let kickstarterAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(
    compiled_contract['FactoryKickstarter'].abi
  )
    .deploy({
      data: compiled_contract['FactoryKickstarter'].evm.bytecode.object,
    })
    .send({ from: accounts[0], gas: '2000000' });

  await factory.methods.createKickstarter('100').send({
    from: accounts[0],
    gas: '2000000',
  });

  [kickstarterAddress] = await factory.methods.getDeployedAdresses().call();

  kickstarter = await new web3.eth.Contract(
    compiled_contract['Kickstarter'].abi,
    kickstarterAddress
  );
});

describe('Kickstarter', () => {
  it('checks factory address', () => {
    assert.ok(factory.options.address);
  });

  it('checks kickstarter address', () => {
    assert.ok(kickstarterAddress);
  });

  it('checks manager is the deployer', async () => {
    const manager = await kickstarter.methods.manager().call();
    assert.equal(manager, accounts[0]);
  });

  it('checks contributor', async () => {
    await kickstarter.methods.contribute().send({
      from: accounts[1],
      value: '200',
    });
    assert(kickstarter.methods.contributors(accounts[1]));
  });

  it('checks requests', async () => {
    await kickstarter.methods
      .createRequest('Buy battery', '59', accounts[5])
      .send({ from: accounts[0], gas: 2000000 });
    const request = await kickstarter.methods.requests(0).call();
    assert.equal('59', request.value);
  });
});
