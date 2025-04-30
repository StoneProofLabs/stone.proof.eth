// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StonepProofEvents {

            /*//////////////////////////////////////////////////////
                             EVENTS
        //////////////////////////////////////////////////////*/
    event RoleAssigned(address indexed account, bytes32 indexed role, uint256 roleAssignedAt);
    event RoleRevoked(bytes32 role, address account, address revoker, uint256 roleRevokedAt);

    event MineralRegistered(uint256 indexed mineralId, string mineralName, string mineralType, string origin, string weight, uint256 purityPercentage, address indexed miner, uint256 registeredAt);
    event MineralRefined(uint256 indexed mineralId, address indexed refiner, uint256 refinedAt);
    event MineralTransported(uint256 indexed mineralId, address indexed transporter, address receivingParty, string origin, string destination, uint256 transportedAt);
    event MineralInspected(uint256 indexed mineralId, string mineralStatus, address indexed inspector, uint256 inspectedAt);
    event MineralAudited(uint256 indexed mineralId, bytes32 status, address indexed auditor, uint256 auditedAt);
    event MineralPurchased(uint256 indexed mineralId, address indexed buyer, uint256 purchasedAt);
    event MineralReadyToTrade(uint256 indexed mineralId, address inspector_Auditor, string status, uint256 inspectionDate);


    // For every assigned role
    event MinerRoleAssigned(address assignee, block.timestamp);
    event RefinerRoleAssigned(address assignee, block.timestamp);
    event TransporterRoleAssigned(address assignee, block.timestamp);
    event AuiditorRoleRevoked(address assignee, block.timestamp);
    event InspectorRoleAssigned(address assignee, block.timestamp);
    event BuyerRoleAssigned(address assignee, block.timestamp);
    event AdminRoleAssigned(address assignee, block.timestamp);
    // For every revoked role
    event MinerRoleRevoked(address revokee, uint256 timestamp);
    event RefinerRoleRevoked(address revokee, uint256 timestamp);
    event TransporterRoleRevoked(address revokee, uint256 timestamp);
    event AuditorRoleRevoked(address revokee, uint256 timestamp);
    event InspectorRoleRevoked(address revokee, uint256 timestamp);
    event BuyerRoleRevoked(address revokee, uint256 timestamp);
    event AdminRoleRevoked(address revokee, uint256 timestamp);

}