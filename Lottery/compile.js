import path from 'path';
import fs from 'fs';
import solc from 'solc';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inboxPath = path.resolve(__dirname , 'contracts' , 'Lottery.sol');
const source = fs.readFileSync(inboxPath , 'utf-8');

var input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
}; 

const compile = JSON.parse(solc.compile(JSON.stringify(input)));
export default compile;