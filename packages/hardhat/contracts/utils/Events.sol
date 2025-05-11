// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StonepProofEvents {
    /*//////////////////////////////////////////////////////
                             EVENTS
        //////////////////////////////////////////////////////*/
    event RoleAssigned(address indexed account, bytes32 indexed role, uint256 roleAssignedAt);
    event RoleRevoked(bytes32 role, address account, address revoker, uint256 roleRevokedAt);

    event MineralRegistered(
        string mineralId,
        string mineralName,
        string mineralType,
        string origin,
        string weight,
        uint256 purityPercentage,
        address indexed miner,
        uint256 registeredAt
    );
    event MineralRefined(uint256 indexed mineralId, address indexed refiner, uint256 refinedAt);
    event MineralTransported(
        string mineralId,
        address indexed transporter,
        address receivingParty,
        string origin,
        string destination,
        uint256 transportedAt
    );
    event MineralInspected(string mineralId, string mineralStatus, address indexed inspector, uint256 inspectedAt);
    event MineralAudited(string mineralId, bytes32 status, address indexed auditor, uint256 auditedAt);
    event MineralPurchased(string mineralId, address indexed buyer, uint256 purchasedAt);
    event MineralReadyToTrade(string mineralId, address inspector_Auditor, string status, uint256 inspectionDate);

    // For every assigned role
    event MinerRoleAssigned(address assignee, uint256 timestamp);
    event RefinerRoleAssigned(address assignee, uint256 timestamp);
    event TransporterRoleAssigned(address assignee, uint256 timestamp);
    event AuiditorRoleRevoked(address assignee, uint256 timestamp);
    event InspectorRoleAssigned(address assignee, uint256 timestamp);
    event BuyerRoleAssigned(address assignee, uint256 imestamp);
    event AdminRoleAssigned(address assignee, uint256 timestamp);
    // For every revoked role
    event MinerRoleRevoked(address revokee, uint256 timestamp);
    event RefinerRoleRevoked(address revokee, uint256 timestamp);
    event TransporterRoleRevoked(address revokee, uint256 timestamp);
    event AuditorRoleRevoked(address revokee, uint256 timestamp);
    event InspectorRoleRevoked(address revokee, uint256 timestamp);
    event BuyerRoleRevoked(address revokee, uint256 timestamp);
    event AdminRoleRevoked(address revokee, uint256 timestamp);
}
