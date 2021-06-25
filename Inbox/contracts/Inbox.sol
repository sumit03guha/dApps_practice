// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.4;

contract Inbox {
    string private message;
    
    constructor(string memory initialMessage) {
        message = initialMessage;
    }
    
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
    
    function getMessage() public view returns (string memory) {
        return message;
    }
}