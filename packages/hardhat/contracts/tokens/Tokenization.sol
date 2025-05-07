// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { RolesManager } from "../core/RolesManager.sol";

contract Tokenization is ERC721, RolesManager {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER");
    
    struct MineralToken {
        string mineralId;
        string details;
        address owner;
        uint8 flags; // bit 0: minted, 1: audited, 2: inspected, 3: purchased
    }

    uint256 private nextTokenId = 1;
    mapping(uint256 => MineralToken) private _tokens;
    mapping(string => uint256) public mineralToToken;

    event Minted(uint256 indexed tokenId, string mineralId, address indexed to);
    event Transferred(uint256 indexed tokenId, address indexed from, address indexed to);
    event Updated(uint256 indexed tokenId);
    event Revoked(uint256 indexed tokenId, string reason);
    event MetadataUpdated(uint256 indexed tokenId);

    constructor() ERC721("MineralToken", "MTKN") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }

    // Remove the onlyRole modifier since it's inherited from AccessControl
    // Keep onlySpecificRole if needed from RolesManager

    function mintToken(address to, string calldata mineralId, string calldata details) external {
        require(hasRole(MINTER_ROLE, msg.sender), "Unauthorized");
        uint256 tokenId = nextTokenId++;
        
        require(!_exists(tokenId), "Exists");
        require(mineralToToken[mineralId] == 0, "MineralUsed");
        
        _mint(to, tokenId);
        
        _tokens[tokenId] = MineralToken({
            mineralId: mineralId,
            details: details,
            owner: msg.sender,
            flags: 0x01
        });

        mineralToToken[mineralId] = tokenId;
        emit Minted(tokenId, mineralId, to);
    }

    function updateToken(uint256 tokenId, string calldata, bool audited, bool inspected, bool purchased) external {
        address owner = ownerOf(tokenId);
        require(
            owner == msg.sender || 
            getApproved(tokenId) == msg.sender || 
            isApprovedForAll(owner, msg.sender),
            "NotOwner"
        );
        
        MineralToken storage t = _tokens[tokenId];
        t.flags = _setFlag(t.flags, 1, audited);
        t.flags = _setFlag(t.flags, 2, inspected);
        t.flags = _setFlag(t.flags, 3, purchased);
        
        emit Updated(tokenId);
    }

    function updateMetadata(uint256 tokenId, string calldata newDetails) external {
        address owner = ownerOf(tokenId);
        require(
            owner == msg.sender || 
            getApproved(tokenId) == msg.sender || 
            isApprovedForAll(owner, msg.sender),
            "NotOwner"
        );
        _tokens[tokenId].details = newDetails;
        emit MetadataUpdated(tokenId);
    }

    function transferOwnership(uint256 tokenId, address newOwner) external {
        require(hasRole(BUYER_ROLE, msg.sender), "Unauthorized");
        address owner = ownerOf(tokenId);
        require(
            owner == msg.sender || 
            getApproved(tokenId) == msg.sender || 
            isApprovedForAll(owner, msg.sender),
            "NotOwner"
        );
        
        _transfer(owner, newOwner, tokenId);
        _tokens[tokenId].owner = newOwner;
        
        emit Transferred(tokenId, owner, newOwner);
    }

    function revokeToken(uint256 tokenId, string calldata reason) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Unauthorized");
        require(_exists(tokenId), "Invalid");
        _burn(tokenId);
        delete _tokens[tokenId];
        emit Revoked(tokenId, reason);
    }

    function getTokenDetails(uint256 tokenId) external view returns(
        uint256 id,
        string memory mineralId,
        string memory details,
        bool isMinted,
        bool isAudited,
        bool isInspected,
        bool isPurchased,
        address owner
    ) {
        require(_exists(tokenId), "Invalid");
        MineralToken memory t = _tokens[tokenId];
        return (
            tokenId,
            t.mineralId,
            t.details,
            (t.flags & 0x01) != 0,
            (t.flags & 0x02) != 0,
            (t.flags & 0x04) != 0,
            (t.flags & 0x08) != 0,
            t.owner
        );
    }

    function _setFlag(uint8 flags, uint8 bit, bool value) private pure returns (uint8) {
        return value ? uint8(flags | (1 << bit)) : uint8(flags & ~(1 << bit));
    }

    function _exists(uint256 tokenId) internal view returns(bool) {
        return _tokens[tokenId].owner != address(0);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns(bool) {
        return super.supportsInterface(interfaceId);
    }

    function getTokenIdByMineralId(string calldata mineralId) external view returns (uint256) {
        uint256 tokenId = mineralToToken[mineralId];
        require(_exists(tokenId), "Invalid");
        return tokenId;
    }
}