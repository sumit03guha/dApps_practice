// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameShop is ERC1155, Ownable {
    
    mapping(uint256 => uint256) private amounts;
    
    uint256 public constant id_DRESS_SKIN = 0;
    uint256 public constant id_CAR_SKIN = 1;
    uint256 public constant id_GUN_SKIN = 2;
    uint256 public constant id_SILVER_COINS = 3;
    uint256 public constant id_GOLD_COINS = 4;
    
    constructor() ERC1155("example-nft-game.io")
    {
        amounts[0] = 1;
        amounts[1] = 1;
        amounts[2] = 1;
        amounts[3] = 1000;
        amounts[4] = 100;
    }

    function setURI(string memory newuri)
    public
    onlyOwner
    {
        _setURI(newuri);
    }
    
    function getMaxMintAmount(uint _id)
    public
    view
    returns(uint)
    {
        return amounts[_id];
    }

    function mint(address account, uint256 id, uint256 _amount)
    public
    {
        require(_amount <= amounts[id], "cannot mint more than the assigned value of the item");
        _mint(account, id, _amount, "");
    }

    function mintBatch(address to, uint256[] memory _ids, uint256[] memory _amounts)
    public
    {
        preValidateMinting(_ids,_amounts);
        _mintBatch(to, _ids, _amounts, "");
    }
    
    function preValidateMinting(uint[] memory _ids, uint256[] memory _amounts)
    internal
    view
    {
        for(uint i=0; i < _ids.length; i++){
            require(_amounts[i] <= amounts[i], "cannot mint more than the assigned value of the item");
        }
    }
}