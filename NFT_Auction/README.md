# Basic Hardhat Project Boilerplate

## Prerequisites

- Install truffle : `npm i -g truffle`
- The latest version of truffle has issues with installation on Windows.
- To resolve the errors, go to [this page](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&channel=Release&version=VS2022&source=VSLandingPage&cid=2030&passive=false), download Microsoft Visual Studio 2022 and then install the Visual Studio Installer.
- Select Desktop Development with C++ and uncheck all the optional installation options.
- Once it is done, the truffle can be installed with `npm i -g truffle`

## Instructions and hardhat commands

- Install the boilerplate project dependencies. \
  This will install the packages mentioned inside the `package.json` file.

  ```shell
  npm i
  ```

- Compile the smart contracts.

  ```shell
  npx hardhat compile
  ```

- Compute the size of the smart contracts.

  ```shell
  npx hardhat size-contracts
  ```

- Instantiate the hardhat local node.

  ```shell
  npx hardhat node
  ```

- Run the boilerplate project tests using the local node.

  ```shell
  npx hardhat test --network localhost
  ```

- Generate the code coverage report. \
  After generating the report, you can open the `coverage/index.html` file to see the results.

  ```shell
  npx hardhat coverage
  ```

- Instantiate the truffle dashboard. \
  This lets you deploy the contracts without the need of pasting the private key anywhere in the project.

  ```shell
  truffle dashboard
  ```

- The browser will open up and then you have to connect with the MetaMask extension. Select the preferred network and the account to deploy the smart contract.

- Deploy the powercity project smart contracts using truffle dashboard network

  ```shell
  npx hardhat run .\scripts\DEPLOYMENT_SCRIPT --network truffle
  ```

- Switch to the browser and sign the deployment transaction from the MetaMask extension.

- After the succesful deployment of the smart contracts, a `build/deploy.json` file will be generated comprising the deployed addresse and the ABI of the smart contracts.

- Verify the smart contract using the network on which it was deployed and the smart contract address, alongwith the constructor arguments.

  ```shell
  npx hardhat verify --network NETWORK_NAME DEPLOYED_CONTRACT_ADDRESS "CONSTRUCTOR_ARGUMENTS"
  ```

## A typical top-level directory layout

```shell
.
├── artifacts             # hardhat deployment information [hardhat default]
├── build                 # deployed addresses and the ABI of the smart contract (scripts/deploy.js)
├── cache                 # hardhat deployment information [hardhat default]
├── contracts             # smart contracts solidity files
├── coverage              # coverage report (index.html) [gitignored]
├── node_modules          # npm dependencies [gitignored]
├── scripts               # deployment scripts (deploy.js) and other tasks [modified after hardhat default]
├── test                  # test scripts [modified after hardhat default]
├── .gitignore
├── coverage.json         # gitignored
├── hardhat-config.js     # hardhat configuration [modified after hardhat default]
├── package-lock.json     # gitignored
├── package.json          # project details and dependencies
├── README.md
└── secrets.json          # API keys of block explorers for smart contract verification [should be gitignored]
```

## Notes

- All the files and folders that have been [modified after hardhat default], as mentioned in the above directory layout, consists of well-commented codes in the respective places, regarding the modifications.
