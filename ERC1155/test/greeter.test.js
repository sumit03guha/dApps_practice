const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Greeter', async () => {
  // ----------------- MODIFIED FOR FETCHING HARDHAT SIGNERS ----------------- //

  let Greeter, greeter;
  let owner, user1, user2, user3;

  /**
   * @summary Hardhat signers are used to deploy and test the contract.
   * @see {@link https://docs.ethers.io/v5/api/signer/}
   * Look into the .connect() method in line 28 below.
   */

  before(async () => {
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    user1 = accounts[1];
    user2 = accounts[2];
    user3 = accounts[2];
  });

  // -------------------------------------------------------------------------- //

  it("Should return the new greeting once it's changed", async () => {
    Greeter = await ethers.getContractFactory('Greeter');
    greeter = await Greeter.connect(owner).deploy('Hello, world!');

    await greeter.deployed();

    expect(await greeter.greet()).to.equal('Hello, world!');

    const setGreetingTx = await greeter.setGreeting('Hola, mundo!');

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal('Hola, mundo!');
  });
});
