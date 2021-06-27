import ganache from 'ganache-cli';
import assert from 'assert';
import mocha  from 'mocha';
import Web3 from 'web3';
const provider = ganache.provider();
const web3 = new Web3(provider);

import compile_contract from '../compile.js';
const interface_abi = compile_contract.contracts['Inbox.sol'].Inbox.abi;
const bytecode = compile_contract.contracts['Inbox.sol'].Inbox.evm.bytecode.object;

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(interface_abi)
    .deploy({data: bytecode , arguments: ['Hello!']})
    .send({from : accounts[0] , gas: "1000000"});
})

describe('Inbox' , () => {
    it('Checking deployed address' , () => {
        assert.ok(inbox.options.address);
    })

    it('Checking getter method' , async () => {
        const message = await inbox.methods.getMessage().call();
        assert.equal(message , 'Hello!');
    })

    it('Checking setter method' , async () => {
        await inbox.methods.setMessage('Bye!').send({from : accounts[0] , gas : '1000000'});
        const message = await inbox.methods.getMessage().call();
        assert.equal(message , 'Bye!');
    })
})