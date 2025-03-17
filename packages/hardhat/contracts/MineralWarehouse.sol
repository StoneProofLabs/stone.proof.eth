// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
* @title MineralWarehouse contract 
* @author @0xJonaseb11
* This contract acts as a storage facility for minerals, allowing authorized buyers to purchase them.
*/

import { RolesManager } from "./RolesManager.sol";
import { MineralRegistry } from "./MineralRegistry.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

contract MineralWarehouse is RolesManager, MineralRegistry {

    /*//////////////////////////////////////////////////////////////
                             CUSTOM ERRORS
    //////////////////////////////////////////////////////////////*/

    error MineralWarehouse__InvalidTokenAddress(address tokenAddress);
    error MineralWarehouse__MineralNotRefined(uint256 mineralId);
    error MineralWarehouse__InvalidNumberOfPrices();
    error MineralWarehouse__UnacceptedToken(address tokenAddress);
    error MineralWarehouse__UnacceptedTokens(address[] tokenAddresses);
    error MineralWarehouse__MineralNotMarketReady(uint256 mineralId);
    error MineralWarehouse__InvalidMineralPrice();
    error MineralWarehouse__MineralAlreadySold(uint256 mineralId);
    error MineralWarehouse__UnauthorizedSeller(address seller);
    error MineralNotMarketReady(uint256 mineralId);
    error MineralWarehouse__IncorrectETHAmount();
    error MineralWarehouse__ETHTransferFailed();
    error MineralWarehouse__InvalidTokenPrice();
    error InvalidPaymentMethods();
    error MineralWarehouse__MineralNotFoundInWarehouse(uint256 mineralId);
    error ERC20TokenTransferFailed(address token, uint256 tokenAmount);

    RolesManager private rolesManager;
    MineralRegistry private mineralRegistry;

    enum PaymentMethod { ETH, TOKEN}

    struct StoredMineral {
        uint256 mineralId;
        address refiner;
        uint256 storedAt;
        uint256 soldAt;
        bool isStored;
        bool isSold;
        bool isForSale;
        address buyer;
        string price;
        uint256 priceETH;
        mapping(address => uint256) tokenPrices;

        // store market ready mineral
        mapping(uint256 => bool) isMarketReady;
       
    }
    
    mapping(uint256 => mapping(address => uint256)) public tokenPrices;

    mapping(uint256 => StoredMineral) private warehouse;
    uint256[] private storedMineralIds;
    mapping(address => bool) public acceptedTokens;




    // events for transparency
    event MineralStored(uint256 indexed mineralId, address indexed refiner, uint256 storedAt);
    event MineralListedForSale(uint256 indexed mineralId, string price, address indexed lister);
    event MineralSold__Purchase(uint256 indexed mineralId, address indexed buyer, address seller, uint256 soldAt);

    constructor(address rolesManagerAddress, address mineralRegistryAddress) MineralRegistry(rolesManagerAddress)  {
        rolesManager = RolesManager(rolesManagerAddress);
        mineralRegistry = MineralRegistry(mineralRegistryAddress);
    }


    /**
    * @dev Asds a new erc-20 token to the accepted list 
    */
    function addAcceptedToken(address _token) external restrictedToRole(DEFAULT_ADMIN_ROLE) {
        if (_token == address(0)) revert MineralWarehouse__InvalidTokenAddress(_token);
        acceptedTokens[_token] = true;
    }

    /**
    * @dev stores a refined mineral  into the warehouse - only refiners can do this 
    */
    function store_refined_mineral_to_warehouse(
        uint256 _mineralId, 
        uint256 _priceETH, 
        address[] memory tokens, 
        uint256[] memory prices
        ) public restrictedToRole(REFINER_ROLE) {

        StoredMineral storage mineral = warehouse[_mineralId];
        (bool isAudited, bool isInspected) = checkAuditAndInspectionStatus(_mineralId);

        if (getMineralDetails(_mineralId).isRefined == false) revert MineralWarehouse__MineralNotRefined(_mineralId);
        if (!isAudited || !isInspected) revert MineralWarehouse__MineralNotMarketReady(_mineralId);
        if (_priceETH == 0 || tokens.length == 0) revert MineralWarehouse__InvalidNumberOfPrices();


        mineral.isMarketReady[_mineralId] = true;

        mineral.mineralId = _mineralId;
        mineral.refiner = msg.sender;
        mineral.isStored = true;
        mineral.storedAt = block.timestamp;
        mineral.soldAt = 0;
        mineral.isSold = false;
        mineral.priceETH = _priceETH;

        // for (uint256 i = 0; i < tokens.length; i++) {
        //     require(acceptedTokens[tokens[i]], "MineralWarehouse: Token not accepted!!");
        //     mineral.tokenPrices[tokens[i]] =  _priceETH/*prices[i]*/;
        // }

        for (uint256 i = 0; i < tokens.length; i++) {
            if (!acceptedTokens[tokens[i]]) revert MineralWarehouse__UnacceptedTokens(tokens);
            tokenPrices[_mineralId][tokens[i]] = prices[i];  // Store correctly
        }

   

        storedMineralIds.push(_mineralId);

        emit MineralStored(_mineralId, msg.sender, block.timestamp);
    }

    ////////////////////////////////////////////////
    //////// SELLING MINERALS - FROM REFINING ENTERPRISE //////////////
    ///////////////////////////////////////////////
    
    /**
    * @dev Lists a stored mineral for sale with a set price - only the refiner(owner) can do this 
    * @param _mineralId the ID of the mineral at sale
    * @param _price The selling pice (in WEI)
    * @notice Emits MineralListedForSale event to indicate that a mineral is for sale to buyers

    */
    function list_Mineral_ForSale(uint256 _mineralId, string memory _price) public restrictedToRole(REFINER_ROLE) {
        StoredMineral storage mineral = warehouse[_mineralId];
        address seller = msg.sender;

        if (mineral.isMarketReady[_mineralId] == false) revert MineralWarehouse__MineralNotMarketReady(_mineralId);
        if (bytes(_price).length == 0) revert MineralWarehouse__InvalidMineralPrice();
        if (mineral.isSold == true) revert MineralWarehouse__MineralAlreadySold(_mineralId);
        if (seller != mineral.refiner) revert MineralWarehouse__UnauthorizedSeller(seller);

        mineral.price = _price;
        mineral.isForSale = true;

        emit MineralListedForSale(_mineralId, _price, seller);
    }

      /**
    * @dev Allows buyers to purchase minerals with ETH or an accepted ERC-20 token
    */
    function purhase_mineral(uint256 _mineralId, PaymentMethod method, address token) public payable  restrictedToRole(BUYER_ROLE) {
        StoredMineral storage mineral = warehouse[_mineralId];
        address seller = mineral.refiner;
        address buyer = mineral.buyer;

        if(mineral.isStored == false) revert MineralWarehouse__MineralNotFoundInWarehouse(_mineralId);
        if (mineral.isSold == true) revert MineralWarehouse__MineralAlreadySold(_mineralId);
        if (seller != msg.sender) revert MineralWarehouse__UnauthorizedSeller(seller);

        // make sure to sell market ready minerals only
        (bool isAudited, bool isInspected) = checkAuditAndInspectionStatus(_mineralId);
        if (!isAudited || !isInspected) revert MineralNotMarketReady(_mineralId);

        if (method == PaymentMethod.ETH) {
            if (msg.value != mineral.priceETH) revert MineralWarehouse__IncorrectETHAmount();
            (bool success, ) = seller.call{value: msg.value}("");
            if (!success) revert MineralWarehouse__ETHTransferFailed();
        } else if (method == PaymentMethod.TOKEN) {
            if (!acceptedTokens[token]) revert MineralWarehouse__UnacceptedToken(token);
            if (mineral.tokenPrices[token] == 0) revert MineralWarehouse__InvalidTokenPrice();

            uint256 tokenAmount = mineral.tokenPrices[token];
            if (!IERC20(token).transferFrom(msg.sender, seller, tokenAmount)) revert ERC20TokenTransferFailed(token, tokenAmount);
        } else {
            revert InvalidPaymentMethods();
        }
        // mineral.price = _price;
        mineral.isSold = true;
        mineral.isForSale = false;
        mineral.soldAt = block.timestamp;
        mineral.buyer = msg.sender;

        // mineral.isForSale = true;

        // emit MineralListedForSale(_mineralId, _price, msg.sender);
        emit MineralSold__Purchase(_mineralId, msg.sender, seller, block.timestamp);

    }

    
    /**
    * @dev Allows an authorized buyer to purchase minerals from the warehouse listed for sale
    * @param _mineralId The ID of the mineral
    * @notice Emits MineralSold event to indicate completion of agreement btn seller and buyer
    */

    // function purchase_mineral(uint256 _mineralId) public restrictedToRole(rolesManager.BUYER_ROLE()) {
    //     StoredMineral storage mineral = warehouse[_mineralId];

    //     require(mineral.isStored, "MineralWarehouse: Mineral with specified ID is not found in the warehouse!!!");
    //     require(mineral.isForSale, "MineralWarehouse: Mineral with specified ID is not listed for sale!!");
    //     require(!mineral.isSold, "MineralWarehouse: Mineral is already sold!!");
    //     require(msg.value == mineral.price, "MineralWarehouse: Incorrect payment amount!");

    //     address seller = mineral.refiner;
    //     mineral.isSold = true;
    //     mineral.buyer = msg.sender;
    //     mineral.isForSale = false;

    //     // Payment transfer - the right way
    //     (bool success, ) = seller.call{value: msg.value}("");
    //     require(success, "MineralWarehouse: Payment transfer failed!!");


    //     emit MineralSold(_mineralId, msg.sender, seller/*"Warehouse Manager"*/, block.timestamp);
    // }

    /**
    * @dev Retrieves the details of a stored mineral 
    */
function get_stored_mineral_by_Id(uint256 _mineralId) 
    public returns (
        uint256, 
        address, 
        uint256, 
        uint256,
        bool, 
        bool, 
        bool, 
        address, 
        string memory, 
        uint256
    ) 
{
    if (warehouse[_mineralId].isStored = false) 
    revert MineralWarehouse__MineralNotFoundInWarehouse(_mineralId);

    StoredMineral storage mineral = warehouse[_mineralId];

    return (
        mineral.mineralId,
        mineral.refiner,
        mineral.storedAt,
        mineral.soldAt,
        mineral.isStored,
        mineral.isSold,
        mineral.isForSale,
        mineral.buyer,
        mineral.price, 
        mineral.priceETH
    );
}

    /**
    * @dev Retrieves all stored minerals in the warehouse 
    * @notice This function can be much-gas-consuming! Should be executed economically
    */
// function get_all_stored_minerals() public view returns (StoredMineral[] memory) {
//     StoredMineral[] memory minerals = new StoredMineral[](storedMineralIds.length);

//     for (uint256 i = 0; i < storedMineralIds.length; i++) {
//         uint256 mineralId = storedMineralIds[i];
//         StoredMineral storage mineral = warehouse[mineralId];

//         minerals[i] = StoredMineral ({
//             mineralId: mineral.mineralId,
//             refiner: mineral.refiner,
//             storedAt: mineral.storedAt,
//             soldAt: mineral.soldAt,
//             isStored: mineral.isStored,
//             isSold: mineral.isSold,
//             isForSale: mineral.isForSale,
//             buyer: mineral.buyer,
//             price: mineral.price,
//             priceETH: mineral.priceETH
//         });
//     }
//     return minerals;
// }


    /**
    * @dev Checks the price of a mineral in a given ERC-20 token 
    */
function getMineralPriceInToken(uint256 _mineralId, address token) public view returns(uint256) {

    if (!acceptedTokens[token]) revert MineralWarehouse__UnacceptedToken(token);
    return tokenPrices[_mineralId][token];
}


    function isMineralMarketReady(uint256 _mineralId) public  view returns (bool) {
        return warehouse[_mineralId].isMarketReady[_mineralId];
    }

    // function getTokenPrice(uint256 _mineralId, address _token) public view returns (uint256) {
    // return warehouse[_mineralId].tokenPrices[_token];
//  }


}