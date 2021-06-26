const ganache = require('ganache-cli');
const mocha = require('mocha');
const assert = require('assert');
const Web3 = require('web3');
provider = ganache.provider();
const web3 = new Web3(provider);

const compile_contract = require('../compile.js');
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
    it('Checking account address' , () => {
        //the account addresses are ok
        assert.ok(inbox.options.address);
    })

    it('Checking getter method' , async () => {
        message = await inbox.methods.getMessage().call();
        assert.equal(message , 'Hello!');
    })

    it('Checking setter method' , async () => {
        await inbox.methods.setMessage('Bye!').send({from : accounts[0] , gas : '1000000'});
        message = await inbox.methods.getMessage().call();
        assert.equal(message , 'Bye!');
    })
})