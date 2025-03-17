// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/** 
* @title DisputeResolution contract 
* @author @0xJonaseb11
* It handles and resolves disputes raised by supplychain members
* It incorporates weighted voting to make sure that disputes are resolved in transparency 
* Hard-to-resolve disputes are later on decided by the super admins for resolution
*/

import { MineralRegistry } from "./MineralRegistry.sol";
import { TransactionLog } from "./TransactionLog.sol";
import { RolesManager } from "./RolesManager.sol";

contract DisputeResolution is RolesManager {

    RolesManager private rolesManager;

    /*//////////////////////////////////////////////////////////////
                             CUSTOM ERRORS
    //////////////////////////////////////////////////////////////*/
    error DisputeResolution__InvalidMineralIdOrNotFound();
    error DisputeResolution__InvalidDisputeDefendantAddress();
    error DisputeResolution__InvalidDisputeDetails();
    error DisputeResolution__InvalidDisputeEvidence();
    error DisputeResolution__InvalidDisputeIdOrNotFound(uint256 disputeId);
    error DisputeResolution__InvalidResolutionDetails();
    error DisputeResolution__DisputeStatusNotPending();

    /*//////////////////////////////////////////////////////////////
                            ENUM FOR STATUS
    //////////////////////////////////////////////////////////////*/
    enum DisputeStatus { Pending, Resolved, Rejected, Escalated }

    struct Dispute {
        uint256 disputeId;
        uint256 mineralId;
        address complainant;
        address defendant;
        string details;
        string evidence;
        DisputeStatus status;
        uint256 createdAt;
        uint256 resolvedAt;
    }

    mapping(uint256 => Dispute) public disputes;
    uint256 public disputeCount;

    /**
    * @dev Events to enforce traceability
    */
    event DisputeRaised(uint256 indexed disputeId, uint256 mineralId, address indexed complainant, address defendant, string details, uint256 raisedAt);
    event DisputeResolved(uint256 indexed disputeId, string resolutionDetails, uint256 timestamp);
    event DisputeClosedUnresolved(address closedBy, uint256 disputeId, uint256 mineralId, address complainant, address defendant, string details, uint256 closedUnresolvedAt);

    constructor() {}

    /**
    * @dev Registers a dispute
    * @param mineralId The ID of the mineral in question
    * @param defendant The address of the party being accused 
    * @param details The details of the dispute
    * @param evidence Evidence supporting the dispute
    */
    function raiseDispute(
        uint256 mineralId,
        address defendant,
        string calldata details,
        string calldata evidence
    ) external {
        if (mineralId == 0) revert DisputeResolution__InvalidMineralIdOrNotFound();
        if (defendant == address(0)) revert DisputeResolution__InvalidDisputeDefendantAddress();
        if (bytes(details).length == 0) revert DisputeResolution__InvalidDisputeDetails();
        if (bytes(evidence).length == 0) revert DisputeResolution__InvalidDisputeEvidence();

        uint256 disputeId = disputeCount++;

        disputes[disputeId] = Dispute({
            disputeId: disputeId,
            mineralId: mineralId,
            complainant: msg.sender,
            defendant: defendant,
            details: details,
            evidence: evidence,
            status: DisputeStatus.Pending,
            createdAt: block.timestamp,
            resolvedAt: 0
        });

        emit DisputeRaised(disputeId, mineralId, msg.sender, defendant, details, block.timestamp);
    }

    /**
    * @dev Resolves a dispute
    * @param disputeId The ID of the dispute to resolve
    * @param resolutionDetails The details of the resolution
    * @notice Emits DisputeResolved event on successful dispute resolution
    */
    function resolveDispute(uint256 disputeId, string calldata resolutionDetails) external restrictedToRole(AUDITOR_ROLE) {
        Dispute storage dispute = disputes[disputeId];

        if (dispute.disputeId != disputeId) revert DisputeResolution__InvalidDisputeIdOrNotFound(disputeId);
        if (bytes(resolutionDetails).length == 0) revert DisputeResolution__InvalidResolutionDetails();
        if (dispute.status != DisputeStatus.Pending) revert DisputeResolution__DisputeStatusNotPending();

        dispute.status = DisputeStatus.Resolved;
        dispute.resolvedAt = block.timestamp;

        emit DisputeResolved(disputeId, resolutionDetails, block.timestamp);
    } 

        /*//////////////////////////////////////////////////////////////
                             REJECT DISPUTE 
        //////////////////////////////////////////////////////////////*/



        /*//////////////////////////////////////////////////////////////
                            ESCALATE DISPUTE
        //////////////////////////////////////////////////////////////*/

}
