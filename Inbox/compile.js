import path from 'path';
import fs from 'fs';
import solc from 'solc';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const inboxPath = path.resolve(__dirname , 'contracts' , 'Inbox.sol');
const source = fs.readFileSync(inboxPath , 'utf-8');

var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
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
//console.log(JSON.parse(solc.compile(JSON.stringify(input))));

const compile = JSON.parse(solc.compile(JSON.stringify(input)));
export default compile;