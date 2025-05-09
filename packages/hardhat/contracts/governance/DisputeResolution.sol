// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/** 
* @title DisputeResolution contract 
* @author @0xJonaseb11
* @dev It handles and resolves disputes raised by supplychain members
* @dev It incorporates weighted voting to make sure that disputes are resolved in transparency 
* @notice Hard-to-resolve disputes are later on decided by the super admins for resolution
*/

import { MineralRegistry } from "../modules/MineralRegistry.sol";
import { TransactionLog } from "../logs/TransactionLog.sol";
import { RolesManager } from "../core/RolesManager.sol";

contract DisputeResolution is RolesManager {

    RolesManager private rolesManager;

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    
    event DisputeRaised(uint256 indexed disputeId, string mineralId, address indexed complainant, address defendant, string details, uint256 raisedAt);
    event DisputeResolved(uint256 indexed disputeId, string resolutionDetails, uint256 timestamp);
    event DisputeClosedUnresolved(address closedBy, uint256 disputeId, string mineralId, address complainant, address defendant, string details, uint256 closedUnresolvedAt);
    event DisputeEscalated(uint256 indexed disputeId, uint256 timestamp);
    event DisputeRejected(uint256 indexed disputeId, string reason, uint256 timestamp);

    /*//////////////////////////////////////////////////////////////
                            ENUM FOR STATUS
    //////////////////////////////////////////////////////////////*/
    enum DisputeStatus { Pending, Resolved, Rejected, Escalated }

    struct Dispute {
        uint256 disputeId;
        string mineralId;
        address complainant;
        address defendant;
        string details;
        string evidence;
        DisputeStatus status;
        uint256 createdAt;
        uint256 resolvedAt;
        uint256 approveVotes;
        uint256 rejectVotes;
        mapping(address => bool) hasVoted;
        uint256 votingDeadline;
    }

    mapping(uint256 => Dispute) public disputes;
    uint256 public disputeCount;
    uint256 public votingThreshold = 3; // Minimum votes required for resolution
    uint256 public votingDuration = 10 days;

    /**
    * @dev Events to enforce traceability
    */

    constructor() {}

    modifier onlyValidDisputeId(uint256 disputeId) {
        if (disputeId == 0 || disputes[disputeId].disputeId != disputeId)
        revert DisputeResolution__InvalidDisputeIdOrNotFound();
        _;
    }

    /**
    * @dev Registers a dispute
    * @param mineralId The ID of the mineral in question
    * @param defendant The address of the party being accused 
    * @param details The details of the dispute
    * @param evidence Evidence supporting the dispute
    */
    function raiseDispute(
        string memory mineralId,
        address defendant,
        string calldata details,
        string calldata evidence
    ) external {
        if (bytes(mineralId).length == 0) revert DisputeResolution__InvalidMineralIdOrNotFound();
        if (defendant == address(0)) revert DisputeResolution__InvalidDisputeDefendantAddress();
        if (bytes(details).length == 0) revert DisputeResolution__InvalidDisputeDetails();
        if (bytes(evidence).length == 0) revert DisputeResolution__InvalidDisputeEvidence();

        uint256 disputeId = disputeCount++;

        Dispute storage dispute = disputes[disputeId];
        dispute.disputeId = disputeId;
        dispute.mineralId = mineralId;
        dispute.complainant = msg.sender;
        dispute.defendant = defendant;
        dispute.details = details;
        dispute.evidence = evidence;
        dispute.status = DisputeStatus.Pending;
        dispute.createdAt = block.timestamp;
        dispute.resolvedAt = 0;
        dispute.approveVotes = 0;
        dispute.rejectVotes = 0;
        dispute.votingDeadline = block.timestamp + votingDuration;

        emit DisputeRaised(disputeId, mineralId, msg.sender, defendant, details, block.timestamp);
    }


    /**
    * @dev Voting mechanism for resolving disputes
    * @param disputeId The ID of the disputet to vote on
    * @param approve Whether the voter approves resoluction or rejects it
    */
    
    function voteOnDispute(uint256 disputeId, bool approve) external {
        Dispute storage dispute = disputes[disputeId];

        if (dispute.status != DisputeStatus.Pending) 
        revert DisputeResolution__DisputeStatusNotPending(disputeId);
        if (dispute.hasVoted[msg.sender]) revert DisputeResolution__AlreadyVoted(msg.sender);
        if (!hasRole(AUDITOR_ROLE, msg.sender) && !hasRole(INSPECTOR_ROLE, msg.sender) && !hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            revert DisputeResolution__NotEligibleToVote(msg.sender);
        }

        /**
        * check if voting period has expired, if yes -> Auto escalate
        */
        if (block.timestamp >= dispute.votingDeadline)  {
            dispute.status = DisputeStatus.Escalated;
            
            emit DisputeEscalated(disputeId, block.timestamp);
            revert DisputeResolution__DisputeEscalated_UnableToVote(disputeId);
        }

        dispute.hasVoted[msg.sender] == true;

        if (approve) {
            dispute.approveVotes++;
        } else {
            dispute.rejectVotes++;
        }

        if (dispute.approveVotes >= votingThreshold) {
            dispute.status = DisputeStatus.Resolved;
            dispute.resolvedAt = block.timestamp;
            
            emit DisputeResolved(disputeId, "Approved by majority voting", block.timestamp);
        } else if (dispute.rejectVotes >= votingThreshold) {
            dispute.status = DisputeStatus.Rejected;
            emit DisputeRejected(disputeId, "Rejected by majority voting", block.timestamp);
        }
    }

    /**
    * @dev Resolves a dispute
    * @param disputeId The ID of the dispute to resolve
    * @param resolutionDetails The details of the resolution
    * @notice Emits DisputeResolved event on successful dispute resolution
    */
    function resolveDispute(uint256 disputeId, string calldata resolutionDetails) external restrictedToRole(DEFAULT_ADMIN_ROLE) {
        Dispute storage dispute = disputes[disputeId];

        if (dispute.disputeId != disputeId) revert DisputeResolution__InvalidDisputeIdOrNotFound();
        if (bytes(resolutionDetails).length == 0) revert DisputeResolution__InvalidResolutionDetails();
        if (dispute.status != DisputeStatus.Pending || dispute.status != DisputeStatus.Escalated) 
        revert DisputeResolution__DisputeStatusNotPendingOrEscalated();

        dispute.status = DisputeStatus.Resolved;
        dispute.resolvedAt = block.timestamp;

        emit DisputeResolved(disputeId, resolutionDetails, block.timestamp);
    } 

    function resolveEscalatedDisputes(uint256 disputeId, string memory resolutionDetails) public restrictedToRole(DEFAULT_ADMIN_ROLE) {
        Dispute storage dispute = disputes[disputeId];

        if (dispute.status != DisputeStatus.Escalated)
        revert DisputeResolution__DisputeNotEscalated(disputeId);

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


        /**
        * @dev Anyone with role can call this to manually trigger escalation for expired disputes 
        * @dev Escalates a dispute to the super admin for final admin 
        */
        function checkAndEscalateDispute(uint256 disputeId) external {
            Dispute storage dispute = disputes[disputeId];

            if (dispute.status != DisputeStatus.Pending)
            revert DisputeResolution__DisputeStatusNotPending(disputeId);

            if (!hasRole(AUDITOR_ROLE, msg.sender) && !hasRole(INSPECTOR_ROLE, msg.sender)) {
               revert DisputeResolution__NotEligibleToVote(msg.sender);
            }

            if (block.timestamp < dispute.votingDeadline) 
            revert DisputeResolution__VotingPeriodStillActive();

            dispute.status = DisputeStatus.Escalated;

            emit DisputeEscalated(disputeId, block.timestamp);
        }

}
