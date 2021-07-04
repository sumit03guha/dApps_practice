// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.4;

contract Lottery {
    
    address public manager;
    address[] public players;
    
    constructor () {
        manager = msg.sender;
    }
    
    modifier _onlyManager() {
        require(msg.sender == manager);
        _;
    }
    
    function register() public payable{
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
        
    }
    
    function random() private view returns(uint) {
        return uint(sha256(abi.encodePacked(block.difficulty , block.timestamp , players)));
    }
    
    function pickWinner() public _onlyManager returns(uint){
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
        return index;
    }
    
    function getPlayers() public view returns(address[] memory) {
        return players;
    }
}
