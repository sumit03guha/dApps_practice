const path = require('path');
const fs = require('fs');
const solc = require('solc');

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
module.exports = compile;