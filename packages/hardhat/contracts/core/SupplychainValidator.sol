// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


/**
* @title SupplychainValidator cotnract 
* @author 0xJonaseb11
* It handles all the logic related to validating the activites done in the supplychain to enforce transparency and integrity
* Helps to make sure that no bad actors done or corruption involved in the chain
*/

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { RolesManager } from "./RolesManager.sol";
import { MineralRegistry } from "../modules/MineralRegistry.sol";
import { PrivacyGuard } from "../core/PrivacyGuard.sol";
import { Tokenization } from "../tokens/Tokenization.sol";
import { TransactionLog } from "../logs/TransactionLog.sol";
import { LogisticsManager } from "../modules/LogisticsManager.sol";

contract SupplychainValidator is RolesManager, MineralRegistry {


    RolesManager private rolesManager;
    MineralRegistry private mineralRegistry;
    PrivacyGuard private privacyGuard;
    Tokenization private tokenization;
    TransactionLog private transactionLog;
    LogisticsManager private logisticsManager;

    /**
    * @dev Events for traceability
    */
    event OperationValidated(address indexed actor, string operation, uint256 timestamp);
    event SupplychainValidated(address indexed validator, bool isValid, string mineralId);


    modifier onlyAuthorizedActor(bytes32 role) {

        if (!hasRole(role, msg.sender)) {
            revert InsufficientPermissionsToPerformAction(msg.sender);
        }
        _;
    }

    constructor(
        address _rolesManager,
        address _mineralRegistry,
        address _privacyGuard,
        address _tokenization,
        address _transactionLog,
        address _logisticsManager
    ) MineralRegistry(_rolesManager){
        rolesManager = RolesManager(_rolesManager);
        mineralRegistry = MineralRegistry(_mineralRegistry);
        privacyGuard = PrivacyGuard(_privacyGuard);
        tokenization = Tokenization(_tokenization);
        transactionLog = TransactionLog(_transactionLog);
        logisticsManager = LogisticsManager(_logisticsManager);
    }

        /*//////////////////////////////////////////////////////////////
        ===============================================================
                              SUPPLYCHAIN VALIDATION PORTAL
        ===============================================================
        //////////////////////////////////////////////////////////////*/


            /*/////////////////////////////////////////
                              MINER
            /////////////////////////////////////////*/

    /**
    * @dev validates mining operation
    * @notice Emits OperationValidated event fon successful operation validation
    */
    function validateMiningOperation(string memory mineralId) external onlyAuthorizedActor(MINER_ROLE) onlyValidMineral(mineralId) {
        transactionLog.recordOperation(msg.sender, "Mining", mineralId);

        emit OperationValidated(msg.sender, "Mining", block.timestamp);
    }


            /*/////////////////////////////////////////
                              REFINER
            /////////////////////////////////////////*/

    /**
    * @dev validates refining operation
    * @notice Emits OperationValidated even on successful validation
    */
    function validateRefiningOperation(string memory mineralId) external onlyAuthorizedActor(REFINER_ROLE) onlyValidMineral(mineralId) {
        transactionLog.recordOperation(msg.sender, "Refining", mineralId);

        emit
         OperationValidated(msg.sender, "Refining", block.timestamp);
    }



            /*/////////////////////////////////////////
                              TRASPORTER
            /////////////////////////////////////////*/

    /**
    * @dev validates transportation operation
    * @notice Emits OperationValidated even on successful validation
    */
function validateTransportationOperation(string memory mineralId, address to) 
    external 
    onlyAuthorizedActor(TRANSPORTER_ROLE) 
    onlyValidMineral(mineralId)
{
    uint256 tokenId = tokenization.getTokenIdByMineralId(mineralId);

    tokenization.safeTransferFrom(msg.sender, to, tokenId);

    transactionLog.recordOperation(msg.sender, "Transportation", mineralId);

    emit OperationValidated(msg.sender, "Transportation", block.timestamp);
}




            /*/////////////////////////////////////////
                              BUYER
            /////////////////////////////////////////*/

    /**
    * @dev validate purchase operation
    * @notice Emits OperationValidated event on success validation
    */
function validatePurchaseOperation(string memory mineralId, address buyer) 
    external 
    onlyAuthorizedActor(BUYER_ROLE) 
    onlyValidMineral(mineralId) 
{
    uint256 tokenId = tokenization.getTokenIdByMineralId(mineralId);

    tokenization.safeTransferFrom(msg.sender, buyer, tokenId);
    transactionLog.recordOperation(msg.sender, "Purchase", mineralId);

    emit OperationValidated(msg.sender, "Purchase", block.timestamp);
}



            /*/////////////////////////////////////////
                              INSPECTOR
            /////////////////////////////////////////*/

    /**
    * @dev validates Inspection operation
    * @notice Emits OperationValidated event on successfl validataion
    */
    function validateInspectionOperation(string memory mineralId, address inspector) external onlyAuthorizedActor(INSPECTOR_ROLE) onlyValidMineral(mineralId) {
        transactionLog.recordOperation(inspector, "Inspection", mineralId);

        emit OperationValidated(inspector, "Inspector", block.timestamp);
    }

    /**
    * @dev Validates the supply chain of a mineral
    * @param mineralId The ID of the mineral to validate
    * @return isValid Indicates whether the supply chain is valid
    * @return validationReason A string describing the validation result
     */

     function validateSupplychain(string memory mineralId) public returns(bool isValid, string memory validationReason) {
        MineralRegistry.MineralDetails memory details = mineralRegistry.getMineralDetails(mineralId);

        (bool isAudited, bool isInspected) = mineralRegistry.checkAuditAndInspectionStatus(mineralId);

        if (!isAudited) {
            return (false, "Mineral is not audited!!");
        } 
        if (!isInspected) {
            return (false, "Mineral is not inspected!!");
        }

        // check for mineral transaction history
        TransactionLog.Transaction[] memory transactions = transactionLog.getTransactionsByMineral(mineralId);
        if (transactions.length == 0) {
            // revert SupplychainValidator__InvalidMineralTransactionHistory();
            return (false, "No transaction history found for specified mineral");
        }

        // validate ownership chain in transactions
        address currentOwner = details.currentHandler;
        for (uint256 i = transactions.length; i > 0; i--) {
            TransactionLog.Transaction memory transaction = transactions[i - 1];
            if (transaction.receiver != currentOwner) {
                // revert SupplychainValidator__InvalidMineralOwnershipChain();
                return (false, "Invalid ownership chain in transactions!!");

            }
            currentOwner = transaction.sender;
        }

        if (currentOwner != details.registeredBy) {
            // revert SupplychainValidator__InvalidMineralOwnershipChain();
            return(false, "Ownership chain does not lead back to the original registrant!!");
        }

        // validation passed
        return (true, "Supplychain is Valid!!");
     }

     /**
     * @dev Logs validation results for specified mineral
     * @notice Emits SupplychainValidated, an event with the validation reason of the mineral supplychain
     * @param mineralId The ID of the mineral to validate 
     */
     function logValidationResult(string memory mineralId) public returns(bool, string memory) {

        if (bytes(mineralId).length == 0 || !isMineralRegistered(mineralId)) {
         revert SupplychainValidator__InvalidMineralIdOrNotFound(mineralId);
        }
        (bool isValid, string memory validationReason) = validateSupplychain(mineralId);

        emit SupplychainValidated(msg.sender, isValid, mineralId);

        return(isValid, validationReason);
     }

}