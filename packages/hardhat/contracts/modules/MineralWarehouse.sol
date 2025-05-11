// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @author @0xJonaseb11
 * title MineralWarehouse contract
 * @dev It is a mineral warehouse contract. Minerals are stored here after refinery and can be listed for sale
 * @notice It is the base contract of the supplychain
 */
import { RolesManager } from "../core/RolesManager.sol";
import { MineralRegistry } from "../modules/MineralRegistry.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

contract MineralWarehouse is RolesManager, MineralRegistry {
    MineralRegistry private mineralRegistry;
    RolesManager private rolesManager;

    enum PaymentMethod {
        ETH,
        TOKEN
    }

    struct MineralSaleInfo {
        string price;
        uint256 priceETH;
        mapping(address => uint256) tokenPrices;
    }

    struct StoredMineral {
        string mineralId;
        address refiner;
        uint256 storedAt;
        uint256 soldAt;
        bool isStored;
        bool isSold;
        bool isForSale;
        address buyer;
        bool isMarketReady;
        MineralSaleInfo saleInfo;
    }

    mapping(string => StoredMineral) private warehouse;
    string[] private storedMineralIds;
    mapping(address => bool) public acceptedTokens;

    event MineralStored(string mineralId, address indexed refiner, uint256 storedAt);
    event MineralListedForSale(string mineralId, string price, address indexed lister);
    event MineralSold(string mineralId, address indexed buyer, address seller, uint256 soldAt);

    constructor(address rolesManagerAddress, address mineralRegistryAddress) MineralRegistry(rolesManagerAddress) {
        rolesManager = RolesManager(rolesManagerAddress);
        mineralRegistry = MineralRegistry(mineralRegistryAddress);
    }

    function addAcceptedToken(address _token) external restrictedToRole(DEFAULT_ADMIN_ROLE) {
        require(_token != address(0), "Invalid token address");
        acceptedTokens[_token] = true;
    }

    function store_refined_mineral_to_warehouse(
        string memory _mineralId,
        uint256 _priceETH,
        address[] memory tokens,
        uint256[] memory prices
    ) public restrictedToRole(REFINER_ROLE) {
        require(getMineralDetails(_mineralId).isRefined, "Mineral not refined");
        require(tokens.length == prices.length, "Mismatched arrays");
        require(_priceETH > 0, "Invalid ETH price");

        StoredMineral storage mineral = warehouse[_mineralId];
        mineral.mineralId = _mineralId;
        mineral.refiner = msg.sender;
        mineral.isStored = true;
        mineral.storedAt = block.timestamp;
        mineral.isMarketReady = true;
        mineral.saleInfo.priceETH = _priceETH;

        for (uint256 i = 0; i < tokens.length; i++) {
            require(acceptedTokens[tokens[i]], "Token not accepted");
            mineral.saleInfo.tokenPrices[tokens[i]] = prices[i];
        }

        storedMineralIds.push(_mineralId);
        emit MineralStored(_mineralId, msg.sender, block.timestamp);
    }

    function list_Mineral_ForSale(
        string memory _mineralId,
        string memory _price
    ) public restrictedToRole(REFINER_ROLE) {
        StoredMineral storage mineral = warehouse[_mineralId];
        require(mineral.isStored, "Mineral not stored");
        require(!mineral.isSold, "Already sold");
        require(msg.sender == mineral.refiner, "Not owner");
        require(mineral.isMarketReady, "Not market ready");

        mineral.isForSale = true;
        mineral.saleInfo.price = _price;
        emit MineralListedForSale(_mineralId, _price, msg.sender);
    }

    function purchase_mineral(
        string memory _mineralId,
        PaymentMethod method,
        address token,
        uint256 amount
    ) public payable restrictedToRole(BUYER_ROLE) {
        StoredMineral storage mineral = warehouse[_mineralId];

        // require(mineral.isStored, "Mineral not found");
        require(!mineral.isSold, "Already sold");
        // require(mineral.isForSale, "Not for sale");
        // require(mineral.isMarketReady, "Not market ready");

        if (method == PaymentMethod.ETH) {
            require(msg.value == mineral.saleInfo.priceETH, "Incorrect ETH amount");
            payable(mineral.refiner).transfer(msg.value);
        } else {
            // require(acceptedTokens[token], "Token not accepted");
            require(amount == mineral.saleInfo.tokenPrices[token], "Incorrect token amount");
            IERC20(token).transferFrom(msg.sender, mineral.refiner, amount);
        }

        mineral.isSold = true;
        mineral.isForSale = false;
        mineral.soldAt = block.timestamp;
        mineral.buyer = msg.sender;

        emit MineralSold(_mineralId, msg.sender, mineral.refiner, block.timestamp);
    }

    function getMineralPriceInToken(string memory _mineralId, address token) public view returns (uint256) {
        require(acceptedTokens[token], "Token not accepted");
        return warehouse[_mineralId].saleInfo.tokenPrices[token];
    }

    function isMineralMarketReady(string memory _mineralId) public view returns (bool) {
        return warehouse[_mineralId].isMarketReady;
    }
}
