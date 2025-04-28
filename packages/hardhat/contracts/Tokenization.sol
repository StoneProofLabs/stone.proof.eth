// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
* @title Tokenization contract
* @author @0xJonaseb11
* It is where the mineral tokenization operation is conducted
* It is where tokens are created and tokens are transferred to minerals by authorized actors 
*/

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

import { RolesManager } from "./RolesManager.sol";
import { Errors } from "./Errors/Errors.sol";


contract Tokenization is ERC721, ERC721URIStorage, RolesManager {


    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    struct MineralToken {
        uint256 tokenId;
        uint256 mineralId;
        string details;
        bool isMinted;
        bool isAudited;
        bool isInspected;
        bool isPurchased;
        address currentOwner;
    }


    uint256 private nextTokenId = 1;
    mapping(uint256 => MineralToken) private tokenData;
    mapping(uint256 => bool) private _tokenExists;
    mapping(uint256 => MineralToken) private mineralTokens;


        /*//////////////////////////////////////////////////////////////
                                 EVENTS
        //////////////////////////////////////////////////////////////*/
    event MineralTokenMinted(uint256 indexed tokenId, uint256 mineralId, string metadata, address  minter, address indexed mintedTo);
    event OwnershipTransferred(uint256 indexed tokenId, address indexed oldOwner, address indexed newOwner);
    event MineralTokenUpdated(uint256 indexed tokenId, string action, address updater);
    event MineralTokenRevoked(uint256 indexed tokenId, address indexed revoker, string reason);
    event MetadataUpdated(uint256 indexed tokenId, string newDetails, address updater);


    constructor() ERC721("MineralToken", "MTKN") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }

    /**
    * @dev restrit access to onlyAuthorized roles
    */
    modifier onlyAuthorizedRoles() {
        if (
            !hasRoleAssigned(msg.sender, MINTER_ROLE) ||
            !hasRoleAssigned(msg.sender, AUDITOR_ROLE) ||
            !hasRoleAssigned(msg.sender, INSPECTOR_ROLE) ||
            !hasRoleAssigned(msg.sender, BUYER_ROLE)
        ) 
        revert InsufficientPermissionsToPerformAction(msg.sender);
        _;
    }

    modifier  onlySpecificRole(bytes32 role) {
        if (!hasRole(role, msg.sender))
        revert InsufficientPermissionsToPerformAction(msg.sender);
        _;
    } 

        /*/!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        !!!      ALL THE FUNCTIONS BELOW NEED VERY GOOD ATTENTION  !!!!!
        !!!          THEY CONTAIN MANY POTENTIAL VUNERABILITIES    !!!!!
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

    /**
    * @dev Mints token to a mineral with mineral ID mineralId
    * MineralToken is minted to the current owner of the mineral - msg.sender
    * @notice Emits MineralTokenMinted event on successful minting 
    */
    function mintToken(address to, uint256 mineralId, string memory details) public  onlyNonZeroAddress(to) onlySpecificRole(MINTER_ROLE) {
        uint256 tokenId = nextTokenId++;

        if (_exists(tokenId))
        revert Tokenization__TokenAlreadyExists(tokenId);
        
        if (mineralTokens[tokenId].isMinted == true)
        revert Tokenization__TokenIsAlreadyMinted(tokenId);

        if (mineralDetails[mineralId].id != mineralId)
        revert InvalidMineralIdOrNotFound(mineralId);

        _mint(to, tokenId);
        
        _tokenExists[tokenId] = true;
        tokenData[tokenId] = MineralToken({
            tokenId: tokenId,
            mineralId: mineralId,
            details: details,
            isMinted: false,
            isAudited: false,
            isInspected: false,
            isPurchased: false,
            currentOwner: msg.sender
        });

        mineralTokens[tokenId].isMinted = true;

        emit MineralTokenMinted(tokenId, mineralId, details, msg.sender, to);
    }

    /**
    * @dev updates mineralToken 
    * Only current owner can do update the token
    * @notice Emits MineralTokenUpdate event
    */
    function updateToken(uint256 tokenId, string memory action, bool isAudited, bool isInspected, bool isPurchased) public onlyAuthorizedRoles {

        if (!_exists(tokenId) || tokenId == 0)
        revert Tokenization__InvalidTokenIdOrNotFound(tokenId);

        if (ownerOf(tokenId) != msg.sender)
        revert Tokenization__CallerNotMineralTokenOwner(tokenId, msg.sender);

        MineralToken storage token = tokenData[tokenId];
        token.isAudited = isAudited;
        token.isInspected = isInspected;
        token.isPurchased = isPurchased;

        emit MineralTokenUpdated(tokenId, action, msg.sender);
    } 


        /*//////////////////////////////////////////////////////////////
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                  THIS FUNCTION REQUIRES ATTENTION
                THE WAY WE HANDLE UPDATION OF TOKEN METADATA
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //////////////////////////////////////////////////////////////*/

    /**
    * @dev updates mineralToken metadata
    * @notice Emits MetadataUpdated event on successful updation of metadata
    */
    function updateMetadata(uint256 tokenId, string memory newDetails) public onlyAuthorizedRoles {

        if (!_exists(tokenId) || tokenId == 0)
        revert Tokenization__InvalidTokenIdOrNotFound(tokenId);

        if (
            ownerOf(tokenId) != msg.sender ||
            hasRole(AUDITOR_ROLE, msg.sender) ||
            hasRole(INSPECTOR_ROLE, msg.sender) ||
            hasRole(MINTER_ROLE, msg.sender)
           )

           revert InsufficientPermissionsToPerformAction(msg.sender);

        MineralToken storage token = tokenData[tokenId];
        token.details =  newDetails;

        emit MetadataUpdated(tokenId, newDetails, msg.sender);
    }

    /**
    * @dev transfers ownership of a mineral token - from oldOwner to newOwner
    * @notice Emits OwnershipTransferred event on successful transfer
    */
    function transferOwnership(uint256 tokenId, address newOwner) public onlyNonZeroAddress(newOwner)  onlySpecificRole(BUYER_ROLE) {

        if (!_exists(tokenId))
        revert Tokenization__TokenAlreadyExists(tokenId);
        
        if (ownerOf(tokenId) != msg.sender)
        revert Tokenization__CallerNotMineralTokenOwner(tokenId, msg.sender);
        
        address oldOwner = msg.sender;
        _transfer(oldOwner, newOwner, tokenId);

        MineralToken storage token = tokenData[tokenId];
        token.currentOwner = newOwner;

        emit OwnershipTransferred(tokenId, oldOwner, newOwner);
    }

    /**
    * @dev user with Admin role revokes token when certain instances occur
    * like, fraudulent minerals, invalidMineral ID, unAudited, unInspected, counterfeit, etc
    * @notice Emits MineralToken event on successful revokation of mineral token
    */
    function revokeToken(uint256 tokenId, string memory _reason) public  onlySpecificRole(DEFAULT_ADMIN_ROLE) {

        if (!_exists(tokenId) || tokenId == 0)
        revert Tokenization__InvalidTokenIdOrNotFound(tokenId);

       _burn(tokenId);
        delete tokenData[tokenId];
        _tokenExists[tokenId] = false;

        emit MineralTokenRevoked(tokenId, msg.sender, _reason);
    }

    /**
    * @dev Retrieves token mineralToken details for a specified mineral
    * @return tokenData[tokenId] token data of specified tokenID
    */
    function getTokenDetails(uint256 tokenId) public view returns(MineralToken memory) {
        if (!_exists(tokenId) || tokenId == 0)
        revert Tokenization__InvalidTokenIdOrNotFound(tokenId);
       
        return tokenData[tokenId];
    }

    /**
    * @dev burn token after being claimed
    * @notice deletes tokenData of a specified tokenId
    */
    function burn(uint256 tokenId) internal {

        if (!_exists(tokenId) || tokenId == 0)
        revert Tokenization__InvalidTokenIdOrNotFound(tokenId);

        super._burn(tokenId);
        delete tokenData[tokenId];
    }

    /**
    * @dev get tokenURI of specified token
    * @return tokenURI[tokenId] token URI of specifiec tokenId
    */
    function tokenURI(uint256 tokenId) public view override (ERC721, ERC721URIStorage) returns (string memory) {

        if (!_exists(tokenId)|| tokenId == 0)
        revert Tokenization__InvalidTokenIdOrNotFound(tokenId);

        return super.tokenURI(tokenId);
    }

    /**
    * @dev checks if token with specified tokenId exists
    */
    function _exists(uint256 tokenId) internal view returns(bool) {
        if (tokenId == 0)
        revert Tokenization__InvalidTokenId(tokenId);
        return _tokenExists[tokenId];
    }

    /**
    * @dev Override supportsInterface() explicitly to resolve ambiguity
    * Resolves ambiguity
    */
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, AccessControl) returns(bool) {
        return super.supportsInterface(interfaceId);

    }    
}