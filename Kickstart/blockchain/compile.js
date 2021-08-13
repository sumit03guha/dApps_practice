import fs from 'fs-extra';
import path from 'path';
import solc from 'solc';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const buildPath = path.resolve(__dirname, 'build');

fs.removeSync(buildPath);

const kickstarterPath = path.resolve(__dirname, 'contracts', 'kickstarter.sol');
const source = fs.readFileSync(kickstarterPath, 'utf-8');

var input = {
  language: 'Solidity',
  sources: {
    'kickstarter.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const compile = JSON.parse(solc.compile(JSON.stringify(input)));
const output = compile.contracts['kickstarter.sol'];

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract + '.json'),
    output[contract]
  );
}

export default output;
