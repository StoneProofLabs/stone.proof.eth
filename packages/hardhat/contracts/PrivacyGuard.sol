// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


/**
* @title PrivacyGuard contract 
* @author @0xJongiaseb11
* It enforces privacy between the actors and also helps to keep sensitive data and activities safe from bad actors
*/
import { RolesManager } from "./RolesManager.sol";

contract PrivacyGuard is RolesManager {

    /*//////////////////////////////////////////////////////////////
                             CUSTOM ERRORS
    //////////////////////////////////////////////////////////////*/

    error PrivacyGuard__InvalidDataOrNotFound();
    error PrivacyGuard__AccessDenied();
    error PrivacyGuard__DataAlreadyExists();
    error PrivacyGuard__InvalidEncryptedContent();

    mapping(uint256 => string) private encryptedData;

    /**
    * Events for logging access attemps
    */
    event DataAccessAttempt(address indexed accessor, uint256 indexed dataId, bool success);
    event SensitiveDataAdded(uint256 indexed dataId, address indexed addedBy);
    event SensitiveDataDeleted(uint256 indexed dataId, address indexed deletedBy);

    /**
    * @dev Adds sensitive data to the system (only authorized roles)
    * @param dataId The unique identifier for the data
    * @param encryptedContent The encrypted content content of the data
    * @notice Emits DataAdded event on successful addition of sensitive data
    */
    function addSensitiveData(uint256 dataId, string memory encryptedContent) public onlyRole(AUDITOR_ROLE) {
        if (bytes(encryptedContent).length == 0)
        revert PrivacyGuard__InvalidEncryptedContent();
        
        // if (encryptedData[dataId]/*.id*/ == dataId)
        // revert PrivacyGuard__DataAlreadyExists();
        
        encryptedData[dataId] = encryptedContent;

        emit SensitiveDataAdded(dataId, msg.sender);
    }

    /**
    * @dev Retrieves sensitive data (Only authorized roles)
    * @param dataId The unique identifier for the data
    * @return The encrypted data content
    */
    function getSensitiveData(uint256 dataId) public returns(string memory) {

        if (!hasAccess(msg.sender))
        revert PrivacyGuard__AccessDenied();

        if (bytes(encryptedData[dataId]).length == 0) 
        revert PrivacyGuard__InvalidDataOrNotFound();

        emit DataAccessAttempt(msg.sender, dataId, true);

        return encryptedData[dataId];
    }

    /**
    * @dev Deletes sensitive data (Only admin or authorized roles)
    * @param dataId The unique identifier for the data
    */
    function deleteSensitiveData(uint256 dataId) public onlyRole(DEFAULT_ADMIN_ROLE) {
        if (bytes(encryptedData[dataId]).length == 0)
        revert PrivacyGuard__InvalidDataOrNotFound();

        delete encryptedData[dataId];
        emit SensitiveDataDeleted(dataId, msg.sender);
    }

    /**
    * @dev Checks if an account has access to sensitive data
    * @param account The address of the account
    * @return A boolean indicating access rights
    */
    function hasAccess(address account) internal view onlyNonZeroAddress(account) returns(bool) {
        return isMiner(account) || isAuditor(account) || isInspector(account);
    }
}