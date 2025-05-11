// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MineralRegistry contract
 * @author @0xJonaseb11
 * @dev It is a mineral factory contract. It is where new minerals are registered, updated and gotten till next step
 * @dev Minerals are gotten from mineral registry contract and all other operations proceed right from there!!
 * @notice It is the base contract of the supplychain
 */

import { RolesManager } from "../core/RolesManager.sol";

contract MineralRegistry is RolesManager {
    RolesManager private rolesManager;
    // uint256 private nextMineralId = 1;

    // Events for transparency
    event MineralUpdated(
        string mineralId,
        string updatedField,
        string newValue,
        address indexed updatedBy,
        uint256 updatedAt
    );
    event MineralLocationUpdated(
        string mineralId,
        string previousLocation,
        string newLocation,
        address indexed tranporter
    );

    /**
     * @dev connects RolesManager contract
     */
    constructor(address rolesManagerAddress) {
        rolesManager = RolesManager(rolesManagerAddress);
    }

    /**
     * @dev Restrict actions to specific roles
     */
    modifier onlyAuthorized(bytes32 role) {
        if (!hasRole(role, msg.sender)) {
            revert InsufficientPermissionsToPerformAction(msg.sender);
        }
        _;
    }

    /**
     * @dev Updates mineral details - only by authorized roles
     * @param mineralId The ID of the mineral under update
     * @param newStatus New status of the mineral
     * @notice Emits MineralUpdated event on successful updation
     */
    function updateMineralStatus(string memory mineralId, string memory newStatus) public {
        if (
            keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
            bytes(mineralId).length == 0
        ) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }
        if (bytes(newStatus).length == 0) revert MineralRegistry__InvalidMineralStatus();

        if (
            !hasRole(REFINER_ROLE, msg.sender) ||
            !hasRole(TRANSPORTER_ROLE, msg.sender) ||
            !hasRole(AUDITOR_ROLE, msg.sender) ||
            !hasRole(INSPECTOR_ROLE, msg.sender)
        ) {
            revert InsufficientPermissionsToPerformAction(msg.sender);
        }

        mineralDetails[mineralId].currentStatus = newStatus;
        mineralDetails[mineralId].timestamp = block.timestamp;

        // record mineral history
        mineralHistories[mineralId].push(
            MineralHistory({
                id: mineralId,
                fieldChanged: "Status",
                newValue: newStatus,
                updatedBy: msg.sender,
                timestamp: block.timestamp
            })
        );

        emit MineralUpdated(mineralId, "Status", newStatus, msg.sender, block.timestamp);
    }

    /*////////////////////////////////////////////////////////////
        =============================================================
                       TRANSPORTATION ENTERPRISE
        =============================================================               
        ////////////////////////////////////////////////////////////*/

    /**
     * @dev updates the location of the mineral
     * @param mineralId the ID of the mineral to update
     * @param newLocation The new location of the mineral
     * @notice Emits MineralLocationUpdated event on successful location update!
     */
    function updateMineralLocation(
        string memory mineralId,
        string memory newLocation
    ) public onlyAuthorized(TRANSPORTER_ROLE) {
        // custom error handling

        if (
            keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
            bytes(mineralId).length == 0
        ) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }

        if (bytes(newLocation).length == 0) {
            revert MineralRegistry__InvalidMineralLocation();
        }

        string memory previousLocation = mineralDetails[mineralId].currentLocation;
        mineralDetails[mineralId].currentLocation = newLocation;

        emit MineralLocationUpdated(mineralId, previousLocation, newLocation, msg.sender);
    }

    /*//////////////////////////////////////////////////////////////
        ===============================================================
                     SUPPLYCHAIN VALIDATION PORTAL
        ===============================================================
        //////////////////////////////////////////////////////////////*/

    /**
     * @dev retrieves mineral details of specified mineralId
     * @return mineral details of specified mineralId
     */
    function getMineralDetails(string memory mineralId) public view virtual returns (MineralDetails memory) {
        if (
            keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
            bytes(mineralId).length == 0
        ) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }
        return mineralDetails[mineralId];
    }

    /**
     * @dev retrieves fll history of a mineral (for audit retail)
     * @return history of specified mineral sing its mineralId
     */
    function _getMineralHistory(string memory mineralId /*override*/) public view returns (MineralHistory[] memory) {
        if (
            keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
            bytes(mineralId).length == 0
        ) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }
        return mineralHistories[mineralId];
    }

    /**
     * @dev checks if a mineral with the given ID is registered
     * @param mineralId the ID of the mineral to check
     * @return A boolean indicating whether the mineral is registered or not
     */

    function isMineralAudited(string memory mineralId) public view returns (bool) {
        if (
            keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
            bytes(mineralId).length == 0
        ) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }

        return mineralDetails[mineralId].isAudited;
    }

    function isMineralInspected(string memory mineralId) public view returns (bool) {
        if (
            keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
            bytes(mineralId).length == 0
        ) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }

        return mineralDetails[mineralId].isInspected;
    }

    /*///////////////////////////////////////////////
                         AUDITOR
        ///////////////////////////////////////////////*/

    /**
     * @dev enables an auditor to audit a mineral
     * @notice Emits MineralAudited event on successful auditing of a mineral
     */

    /*///////////////////////////////////////////////////////
                          INSPECTOR
        ///////////////////////////////////////////////////////*/

    /**
     * @dev enables only the inspector to audit a mineralDetails
     * @notice Emits MineralInspected even
     */

    /**
     * @dev checks audit and inspection status
     * Returns the status of both audit and inspection of mineral according to mineralId
     */
    function _checkAuditAndInspectionStatus(
        string memory mineralId
    ) public /*override*/ onlyAuthorized(DEFAULT_ADMIN_ROLE) returns (bool isAudited, bool isInspected) {
        if (
            keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
            bytes(mineralId).length == 0
        ) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }

        if (mineralDetails[mineralId].isAudited && mineralDetails[mineralId].isInspected) {
            emit MineralReadyToTrade(mineralId, msg.sender, "TradingReady", block.timestamp);
        } else {
            revert MineralNotReadyToTrade(mineralId);
        }

        // explicitly return audit and inspection results
        return (mineralDetails[mineralId].isAudited, mineralDetails[mineralId].isInspected);
    }

    /*//////////////////////////////////////////////////////////////
                            HELPER FUNCTIONS
        //////////////////////////////////////////////////////////////*/

    /**
     * @dev helper function to convert address to string
     * @return string of address
     */
    function addressToString(address _address) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_address)));
        bytes memory characters = "ABACDEFGHIJ1245678909876";

        bytes memory str = new bytes(42);
        str[0] = "0";
        str[1] = "x";

        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = characters[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = characters[uint8(value[i + 12] & 0x0f)];
        }

        return string(str);
    }
}
