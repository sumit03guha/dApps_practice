// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyContract is ERC721, ERC721URIStorage {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    struct Auction {
        address owner;
        uint auctionId;
        uint tokenId;
        uint deadline;
        uint startingPrice;
        bool cancelled;
        bool ended;
    }
    
    struct Bid {
        address bidder;
        uint amount;
    }
    
    Bid[] public bids;
    mapping(uint => Auction) public auctions;

    constructor() ERC721("NFT Token", "NFT") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://www.google.com/";
    }

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
    
    function createAuction(uint _auctionId, uint _tokenId, uint _deadline, uint _startingPrice) public {
        require(_exists(_tokenId));
        require(ownerOf(_tokenId) == msg.sender);
        require(_deadline > block.timestamp);
        require(_startingPrice >= 0);
        
        Auction memory newAuction;
        newAuction.owner = msg.sender;
        newAuction.tokenId = _tokenId;
        newAuction.deadline = _deadline;
        newAuction.startingPrice = _startingPrice;
        newAuction.cancelled = false;
        newAuction.ended = false;

        auctions[_auctionId] = newAuction;
    }
    
    function bidAuction(uint _auctionId) public payable {
        Auction memory auction = auctions[_auctionId];
        
        require(auction.owner != msg.sender);
        require(msg.value >= auction.startingPrice);
        require(block.timestamp < auction.deadline);
        require(!(auction.cancelled || auction.ended));
        
        Bid memory lastBid;
        if (bids.length >= 1) {
            lastBid = bids[bids.length - 1];
        }
        require(msg.value > lastBid.amount);
        assert(payable(lastBid.bidder).send(lastBid.amount));
        
        Bid memory newBid;
        newBid.bidder = msg.sender;
        newBid.amount = msg.value;
        
        bids.push(newBid);
    }
    
    function finalizeAuction(uint _auctionId) public {
        Auction memory auction = auctions[_auctionId];
        
        require(auction.owner == msg.sender);
        require(!auction.cancelled);
        require(!auction.ended);
        
        Bid memory lastBid;
        lastBid = bids[bids.length - 1];
        _transfer(msg.sender, lastBid.bidder, auction.tokenId);
        
        auction.ended = true;
    }
    
    function cancelAuction(uint _auctionId) public {
        Auction memory auction = auctions[_auctionId];
        
        require(msg.sender == auction.owner);
        require(!(auction.cancelled || auction.ended));
        
        Bid memory lastBid;
        if (bids.length >= 1) {
            lastBid = bids[bids.length - 1];
        }
        assert(payable(lastBid.bidder).send(lastBid.amount));
        
        auction.cancelled = true;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}