import ganache from 'ganache-cli';
import assert from 'assert';
import mocha  from 'mocha';
import Web3 from 'web3';
const provider = ganache.provider();
const web3 = new Web3(provider);

import compiled_contract from '../compile.js';
const interface_abi = compiled_contract.contracts['Lottery.sol'].Lottery.abi;
const bytecode = compiled_contract.contracts['Lottery.sol'].Lottery.evm.bytecode.object;

let accounts;
let lottery;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(interface_abi)
    .deploy({data : bytecode})
    .send({from : accounts[5] , gas : '1000000'}); //acounts[5] is the manager
})

describe('Lottery test' , () => {
    it('Checking accounts' , () => {
        console.log(accounts);
    })

    it('Checks deployed address' , () => {
        assert.ok(lottery.options.address);
        console.log(lottery.options.address);
    })

    it('Registers multiple players' , async() => {
        try {
            await lottery.methods.register().send({
                from : accounts[0],
                value : web3.utils.toWei('10' , 'ether')})

            await lottery.methods.register().send({
                from : accounts[1],
                value : web3.utils.toWei('20' , 'ether')})

            await lottery.methods.register().send({
                from : accounts[2],
                value : web3.utils.toWei('0.0001' , 'ether')}) //fails: less than 0.01 ether

            const players = await lottery.methods.getPlayers().call({
                from : accounts[6]})
            console.log(players);
        }catch(err) {
            assert(err);
        }
        // assert(err);
    })
    
    it('Picks the winner' , async() => {
        await lottery.methods.register().send({
            from : accounts[0],
            value : web3.utils.toWei('10' , 'ether')})

        await lottery.methods.register().send({
            from : accounts[1],
            value : web3.utils.toWei('20' , 'ether')})

        await lottery.methods.register().send({
            from : accounts[2],
            value : web3.utils.toWei('30' , 'ether')})

        const players = await lottery.methods.getPlayers().call({
            from : accounts[6]})
        console.log(players);

        const winner = await lottery.methods.pickWinner().call({
            from : accounts[5]})
        console.log(winner);
    })
})
