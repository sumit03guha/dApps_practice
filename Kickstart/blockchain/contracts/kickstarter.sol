// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.4;

contract FactoryKickstarter {
    
    address[] private deployedAddresses;
    
    function getDeployedAdresses() public view returns(address[] memory) {
        return deployedAddresses;
    }
    
    function createKickstarter(uint minimum) public{
        address newKickstarter = address(new Kickstarter(minimum, msg.sender));
        deployedAddresses.push(newKickstarter);
    }
}

contract Kickstarter {
    
    struct Requests {
        string description;
        uint value;
        address recepient;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount;
    }
    
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public contributors;
    uint public contributorsCount;
    Requests[] public requests;
    
    modifier onlyManager {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum , address creator) {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable{
        require(msg.value > minimumContribution);
        contributors[msg.sender] = true;
        contributorsCount++;
    }
    
    function createRequest(string memory d, uint v, address r) public onlyManager {
        Requests storage newRequest = requests.push();
        newRequest.description = d;
        newRequest.value = v;
        newRequest.recepient = r;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }
    
    function approveRequest(uint index) public {
        Requests storage request = requests[index];
        require(contributors[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public onlyManager {
        Requests storage request = requests[index];
        require(!request.complete);
        request.complete = true;
        require(request.approvalCount > (contributorsCount / 2));
        payable(request.recepient).transfer(request.value);
    }
    
    function getTotalContribution() public view returns(uint) {
        return address(this).balance;
    }
}