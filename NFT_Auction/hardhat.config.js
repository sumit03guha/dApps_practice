require('@nomicfoundation/hardhat-toolbox');
require('hardhat-contract-sizer');

const secrets = require('./secrets.json');

const ETHERSCAN_API_KEY = secrets.ETHERSCAN_API_KEY;
const BSCSCAN_API_KEY = secrets.BSCSCAN_API_KEY;
const POLYGONSCAN_API_KEY = secrets.POLYGONSCAN_API_KEY;
const FTMSCAN_API_KEY = secrets.FTMSCAN_API_KEY;

module.exports = {
  solidity: {
    version: '0.8.16',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  /**
   * @abstract Configure the mocha test timeout for testing the contracts.
   * @description Most contract functions take a while to execute, especially when making
   * multiple calls, hence, increasing the timeout enables all the tests to reach completion.
   * @default 2000 ms
   */
  mocha: {
    timeout: 100000000,
  },
  networks: {
    hardhat: {
      /**
       * @see {@link https://hardhat.org/hardhat-network/reference/#allowunlimitedcontractsize}
       * @default false
       */
      allowUnlimitedContractSize: true,
    },

    localhost: {
      timeout: 1000000000,
    },

    /**
     * @summary Network to be used during the smart contract verification.
     */
    bsc: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
    },
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 4,
    },
    mumbai: {
      url: 'https://matic-mumbai.chainstacklabs.com',
      chainId: 80001,
    },

    /**
     * @description This is the default network for truffle dashboard.
     * There is no need to paste PRIVATE_KEY for deployment. This enables the connection to the
     * MetaMask wallet in the browser from where the contract deployment transcation can be signed.
     * @see {@link https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-dashboard/}
     */
    truffle: {
      url: 'http://localhost:24012/rpc',
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true,
    only: [],
    except: [],
  },
  /**
   * @description The following config requires the @param apiKey to be set
   * for the verification of the contracts.
   * */
  etherscan: {
    apiKey: BSCSCAN_API_KEY,
  },
};
