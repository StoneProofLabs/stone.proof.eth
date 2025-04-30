// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


/**
* @title TransactionLog
* @author @0xJonaseb11
* It keeps track of all the operations, transactions perfomed in the whole supply chain
* Helps to keep track of actities in the chain to enforce traceability
*/
import { RolesManager } from "../core/RolesManager.sol";
import { Errors } from "../utils/Errors.sol";

contract TransactionLog is Errors, RolesManager {


    RolesManager private rolesManager;

    // events to enforce transparency n traceability
    event TransactionRecorded(
        uint256 indexed transactionId,
        address indexed sender,
        address indexed receiver,
        uint256 mineralId,
        uint256 timestamp,
        string transactionType
    );
    event OperationRecorded(
        address indexed actor, 
        string operationType, 
        uint256 indexed mineralId, 
        uint256 timestamp
    );


    struct Transaction {
        uint256 transactionId;
        address sender;
        address receiver;
        uint256 mineralId;
        uint256 timestamp;
        string transactionType;
    }

    /**
    * @dev operations to help in supplychainValidation contract
    */
    struct Operation {
        address actor;
        string operationType;
        uint256 mineralId;
        uint256 timestamp;
    }

    Operation[] private operations;
    


    mapping(uint256 => Transaction) private transactions;
    uint256 private nextTransactionId = 1;

    modifier onlyAuthorizedRoles() {

        if (
            !hasRole(MINER_ROLE, msg.sender) ||
            !hasRole(TRANSPORTER_ROLE, msg.sender) ||
            !hasRole(AUDITOR_ROLE, msg.sender) ||
            !hasRole(INSPECTOR_ROLE, msg.sender) || 
            !hasRole(DEFAULT_ADMIN_ROLE, msg.sender)
        )

        revert InsufficientPermissionsToPerformAction(msg.sender);
        _;
    }


    // setters

    /**
    * @dev records operation in the supply chain
    * @notice Emits OperationRecorded even on successful record 
    */
    function recordOperation(address actor, string memory operationType, uint256 mineralId) onlyAuthorizedRoles onlyNonZeroAddress(actor) onlyValidMineralId(mineralId) external {

        if (bytes(operationType).length == 0) 
        revert TransactionLog__InvalidOperationType();
         
        Operation memory newOperation = Operation({
            actor: actor,
            operationType: operationType,
            mineralId: mineralId,
            timestamp: block.timestamp
        });
        operations.push(newOperation);

        emit OperationRecorded(actor, operationType, mineralId, block.timestamp);
    }

    /**
    * @dev records a transaction
    * @notice Emits TransactionRecorded event on successful transaction recording
    */

    function recordTransaction(address receiver, uint256 mineralId, string memory transactionType) public onlyAuthorizedRoles onlyValidMineralId(mineralId) onlyNonZeroAddress(receiver) {

        if (bytes(transactionType).length == 0)
        revert TransactionLog__InvalidOperationType();
      
        uint256 transactionId = nextTransactionId++;
        transactions[transactionId] = Transaction({
            transactionId: transactionId,
            sender: msg.sender,
            receiver: receiver,
            mineralId: mineralId,
            timestamp: block.timestamp,
            transactionType: transactionType
        });

        emit TransactionRecorded(transactionId, msg.sender, receiver, mineralId, block.timestamp, transactionType);
    }

    // getters

    /**
    * @dev retrieves operations using operation index
    * Returns An arrray containing operation.actor, operationType, mineralId and timestamp
    */
function getOperation(uint256 index) external view returns (

    address actor, string memory operationType,
    uint256 mineralId, uint256 timestamp
) {
    if (index == 0 || index > operations.length) 
    revert TransactionLog__InvalidOperationIndex(index);

    Operation memory operation = operations[index];  // ✅ Now safe to access

    return (
        operation.actor,
        operation.operationType,
        operation.mineralId,
        block.timestamp
    );
}
    /**
    * @dev get track of number of operations done
    */
    function getOperationsCount() external view returns(uint256) {
        return operations.length;
    }



    /**
    * @dev retrieves transactions using transactionID
    * @return transactions using specified transactionId
    */
    function getTransaction(uint256 transactionId) public view returns(Transaction memory)  {

        if (transactions[transactionId].transactionId == transactionId || transactionId == 0)
        revert  TransactionLog__InvalidTransactionIdOrNotFound(transactionId);

        return transactions[transactionId];
    }

    /**
    * @dev retrieve transactions using mineralIDs
    * @return results of transactions with specified mineralIDs
    */
    function getTransactionsByMineral(uint256 mineralId) onlyValidMineralId(mineralId) public view returns(Transaction[] memory) {
        uint256 count = 0;

        for(uint256 i = 1; i < nextTransactionId; i++) {
            if (transactions[i].mineralId == mineralId) {
                count++;
            }
        }

        Transaction[] memory results = new Transaction[] (count);
        uint256 index = 0;
        for(uint256 i = 1; i < nextTransactionId; i++) {
            if (transactions[i].mineralId == mineralId) {
                results[index] = transactions[i];
                index++;
            }
        }
        return results;
    }
}