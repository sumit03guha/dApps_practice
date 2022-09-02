const hre = require('hardhat');
const fs = require('fs');

const main = async () => {
  await hre.run('compile');

  const Greeter = await hre.ethers.getContractFactory('Greeter');
  const greeter = await Greeter.deploy('Hello, Hardhat!');

  await greeter.deployed();

  console.log('Greeter deployed to:', greeter.address);

  // ----------------- MODIFIED FOR SAVING DEPLOYMENT DATA ----------------- //

  /**
   * @summary A build folder will be created in the root directory of the project
   * where the ABI, bytecode and the deployed address will be saved inside a JSON file.
   */

  const address = greeter.address;
  const abi = JSON.parse(greeter.interface.format('json'));

  const output = {
    address,
    abi,
  };

  fs.mkdir('./build', { recursive: true }, (err) => {
    if (err) console.error(err);
  });

  fs.writeFileSync('./build/deploy.json', JSON.stringify(output), (err) => {
    if (err) console.error(err);
  });

  // ----------------------------------------------------------------------- //
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
