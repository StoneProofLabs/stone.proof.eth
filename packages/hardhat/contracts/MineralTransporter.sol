// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
* @title MineralTransporter contract
* @author 0xJonaseb11 
* Handles the mineral transportation logic - from one place to another with the process
* of handing and handling exchange of mineral through different stages
*/

import { RolesManager } from "./RolesManager.sol";
import { MineralRegistry } from "./MineralRegistry.sol";
import { TransactionLog } from "./TransactionLog.sol";
import { Tokenization } from "./Tokenization.sol";
import { SupplychainValidator } from "./SupplychainValidator.sol";

contract MineralTransporter is RolesManager {

    /*//////////////////////////////////////////////////////////////
                             CUSTOM ERRORS
    //////////////////////////////////////////////////////////////*/

    error MineralTransporter__InvalidMineralLocation();


    MineralRegistry private mineralRegistry;
    TransactionLog private transactionLog;
    Tokenization private tokenization;
    SupplychainValidator private supplychainValidator;
    RolesManager private rolesManager;

    /**
    * @dev Events for traceability
    */
    event MineralTransferred(uint256 indexed mineralId, address indexed from, address indexed to, string previousLocation, string newLocation, uint256 timestamp);
    event OperationValidated(address indexed actor, string operationType, uint256 mineralId, uint256 timestamp);

    constructor(
        address _rolesManager,
        address _mineralRegistry,
        address _transactionLog,
        address _tokenization,
        address _supplychainValidator
    ) RolesManager() {
        rolesManager = RolesManager(_rolesManager);
        mineralRegistry = MineralRegistry(_mineralRegistry);
        transactionLog = TransactionLog(_transactionLog);
        tokenization = Tokenization(_tokenization);
        supplychainValidator = SupplychainValidator(_supplychainValidator);
    }


    /**
    * @dev Validates and executes the transfer of minerals from one location to another
    * @param mineralId The ID of the mineral being transferred
    * @param to The address receiving the mineral (e.g., refining_center, warehouse, or export destination)
    * @param newLocation The new location (e.g., refining_center, warehouse, or export destination)
    */
    function transportMineral(uint256 mineralId, address to, string memory newLocation)  
       external 
       restrictedToRole(TRANSPORTER_ROLE)
       onlyValidMineral(mineralId)
       {

        if (mineralDetails[mineralId].id != mineralId)
        revert InvalidMineralIdOrNotFound(mineralId);
        
        if (bytes(newLocation).length == 0)
        revert MineralTransporter__InvalidMineralLocation();

        
        mineralRegistry.updateMineralLocation(mineralId, newLocation);
        transactionLog.recordOperation(msg.sender, "Transportation", mineralId);
        tokenization.safeTransferFrom(msg.sender, to, mineralId);

        emit MineralTransferred(mineralId, msg.sender, to, "previousLocation", newLocation, block.timestamp);

        /////////////////////////////////////////////////////////////////////
        ///// Implement Operation validation before emiting this event///////
        /////////////////////////////////////////////////////////////////////
        emit OperationValidated( msg.sender, "Transportation", mineralId, block.timestamp);
       }
       
}