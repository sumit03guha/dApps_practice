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
        address recipient;
        bool complete;
        mapping(address => bool) approvers;
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
        require(msg.value >= minimumContribution);
        contributors[msg.sender] = true;
        contributorsCount++;
    }
    
    function createRequest(string memory d, uint v, address r) public onlyManager {
        Requests storage newRequest = requests.push();
        newRequest.description = d;
        newRequest.value = v;
        newRequest.recipient = r;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }
    
    function approveRequest(uint index) public {
        Requests storage request = requests[index];
        require(contributors[msg.sender]);
        require(!request.approvers[msg.sender]);
        request.approvers[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public onlyManager {
        Requests storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (contributorsCount / 2));
        require(address(this).balance >= request.value);
        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }
    
    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            contributorsCount,
            manager
            );
    }
    
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

}