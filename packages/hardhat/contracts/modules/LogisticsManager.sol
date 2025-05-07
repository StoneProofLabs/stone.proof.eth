// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { RolesManager } from  "../core/RolesManager.sol";


contract LogisticsManager is RolesManager {
    /*////////////////////////////////////////////////
                        EVENTS
    ////////////////////////////////////////////////*/
    event TransportRequestCreated(
        string  mineralId,
        address indexed requester,
        string origin,
        string destination,
        uint256 estimatedDeparture,
        uint256 requestTimestamp
    );
    
    event TransportAssigned(
        string  mineralId,
        address indexed transporter,
        uint256 assignedAt
    );
    
    event TransportCompleted(
        string  mineralId,
        address indexed transporter,
        uint256 completedAt
    );

    event TransportStatusChanged(
        string mineralId,
        string newStatus,
        uint256 updatedAt
    );

    /*////////////////////////////////////////////////
                        STRUCTS
    ////////////////////////////////////////////////*/
    struct TransportDetails {
        string mineralId;
        address requester;
        address transporter;
        string origin;
        string destination;
        uint256 estimatedDeparture;
        uint256 actualDeparture;
        uint256 estimatedArrival;
        uint256 actualArrival;
        string currentStatus; // "REQUESTED", "ASSIGNED", "IN_TRANSIT", "DELIVERED", "CANCELLED"
        string transportConditions;
    }

    /*////////////////////////////////////////////////
                        STORAGE
    ////////////////////////////////////////////////*/
    mapping(string => TransportDetails) public transportDetails;
    mapping(address => string[]) public transporterAssignments;

    /*////////////////////////////////////////////////
                        MODIFIERS
    ////////////////////////////////////////////////*/
    modifier onlyTransporterOrAdmin() {
        if (!hasRole(TRANSPORTER_ROLE, msg.sender) && !hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            revert InsufficientPermissionsToPerformAction(msg.sender);
        }
        _;
    }

    modifier onlyValidTransportRequest(string memory mineralId) {
        if (bytes(transportDetails[mineralId].mineralId).length == 0) {
            revert InvalidMineralIdOrNotFound(mineralId);
        }
        _;
    }

    /*////////////////////////////////////////////////
                    CORE FUNCTIONS
    ////////////////////////////////////////////////*/
    /**
     * @dev Create a new transport request (Miner or Admin only)
     */
    function createTransportRequest(
        string memory mineralId,
        string memory origin,
        string memory destination,
        uint256 estimatedDeparture,
        string memory transportConditions
    ) external onlyRole(MINER_ROLE) {
        if (bytes(mineralId).length == 0) revert InvalidMineralIdOrNotFound(mineralId);
        if (transportDetails[mineralId].requester != address(0)) {
            revert TransportRequestAlreadyExists(mineralId);
        }

        transportDetails[mineralId] = TransportDetails({
            mineralId: mineralId,
            requester: msg.sender,
            transporter: address(0),
            origin: origin,
            destination: destination,
            estimatedDeparture: estimatedDeparture,
            actualDeparture: 0,
            estimatedArrival: 0,
            actualArrival: 0,
            currentStatus: "REQUESTED",
            transportConditions: transportConditions
        });

        emit TransportRequestCreated(
            mineralId,
            msg.sender,
            origin,
            destination,
            estimatedDeparture,
            block.timestamp
        );
    }

    /**
     * @dev Assign transporter to a request (Admin only)
     */
    function assignTransporter(
        string memory mineralId,
        address transporter,
        uint256 estimatedArrival
    ) external onlyRole(DEFAULT_ADMIN_ROLE) onlyValidTransportRequest(mineralId) {
        if (!hasRole(TRANSPORTER_ROLE, transporter)) {
            revert AddressDoesNotHaveRequiredRole(transporter, TRANSPORTER_ROLE);
        }

        TransportDetails storage details = transportDetails[mineralId];
        details.transporter = transporter;
        details.estimatedArrival = estimatedArrival;
        details.currentStatus = "ASSIGNED";

        transporterAssignments[transporter].push(mineralId);

        emit TransportAssigned(mineralId, transporter, block.timestamp);
        emit TransportStatusChanged(mineralId, "ASSIGNED", block.timestamp);
    }

    /**
     * @dev Start transport (Transporter only)
     */
    function startTransport(string memory mineralId) 
        external 
        onlyTransporterOrAdmin
        onlyValidTransportRequest(mineralId) 
    {
        TransportDetails storage details = transportDetails[mineralId];
        if (details.transporter != msg.sender && !hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            revert NotAssignedTransporter(mineralId, msg.sender);
        }

        details.actualDeparture = block.timestamp;
        details.currentStatus = "IN_TRANSIT";

        emit TransportStatusChanged(mineralId, "IN_TRANSIT", block.timestamp);
    }

    /**
     * @dev Complete transport (Transporter only)
     */
    function completeTransport(string memory mineralId) 
        external 
        onlyTransporterOrAdmin
        onlyValidTransportRequest(mineralId) 
    {
        TransportDetails storage details = transportDetails[mineralId];
        if (details.transporter != msg.sender && !hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            revert NotAssignedTransporter(mineralId, msg.sender);
        }

        details.actualArrival = block.timestamp;
        details.currentStatus = "DELIVERED";

        // Update mineral location in parent contract
        _updateMineralLocation(mineralId, details.destination);

        emit TransportCompleted(mineralId, msg.sender, block.timestamp);
        emit TransportStatusChanged(mineralId, "DELIVERED", block.timestamp);
    }

    /*////////////////////////////////////////////////
                    INTERNAL FUNCTIONS
    ////////////////////////////////////////////////*/
    function _updateMineralLocation(string memory mineralId, string memory newLocation) internal {
        // This would call a function in RolesManager to update mineral location
        // Implementation depends on your base contract structure
    }

    /*////////////////////////////////////////////////
                    VIEW FUNCTIONS
    ////////////////////////////////////////////////*/
    function getTransportDetails(string memory mineralId) 
        public 
        view 
        returns (TransportDetails memory) 
    {
        return transportDetails[mineralId];
    }

    function getTransporterAssignments(address transporter) 
        public 
        view 
        returns (string[] memory) 
    {
        return transporterAssignments[transporter];
    }

    function getTransportStatus(string memory mineralId) 
        public 
        view 
        returns (string memory) 
    {
        return transportDetails[mineralId].currentStatus;
    }
}