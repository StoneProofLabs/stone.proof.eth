// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
* @title MineralRegistry contract
* @author @0xJonaseb11 
* It is a mineral factory contract. It is where new minerals are registered, updated and gotten till next step
* Minerals are gotten from mineral registry contract and all other operations proceed right from there!!
* It is the base contract of the supplychain
*/

import { RolesManager } from "./RolesManager.sol";

contract MineralRegistry is RolesManager {

    /*//////////////////////////////////////////////////////////////
                              CUSTOM ERRORS
    //////////////////////////////////////////////////////////////*/

    error MineralRegistry__InvalidMineralDetails();
    error MineralRegistry__InvalidMineralIdOrNotFound(uint256 mineralId); // InvalidMineralIdLength

    error MineralRegistry__MineralNotRegistered(uint256 mineralId);
    error MineralRegistry__MineralAlreadyPurchased();
    error MineralRegistry__MineralAlreadyAudited();
    error MineralRegistry__MineralAlreadyInspected();
    error MineralRegistry__MineralNotAudited();
    error MineralRegistry__MineralNotInspected();

    error MineralRegistry__InvalidMineralStatus();
    error MineralRegistry__InvalidMineralName();
    error MineralRegistry__InvalidMineralOrigin();
    error MineralRegistry__InvalidMineralType();
    error MineralRegistry__InvalidMineralWeight();
    error MineralRegistry__InvalidMineralPurityPercentage();
    error MineralRegistry__InvalidMineralStorageConditions();
    error MineralRegistry__InvalidMineralLocation();
    error MineralRegistry__InvalidReceivingPartyAddress();
    error MineralRegistry__InvalidMineralDestination();
    

    error MineralNotReadyToTrade();



    RolesManager private rolesManager;

    // Events for transparency
    event MineralUpdated(uint256 indexed mineralId, string updatedField, string newValue, address indexed updatedBy, uint256 updatedAt);
    event MineralLocationUpdated(uint256 mineralId, string previousLocation, string newLocation, address indexed tranporter);


    uint256 private nextMineralId = 1;

    /**
    * @dev connects RolesManager contract
    */
    constructor(address rolesManagerAddress)  {
        rolesManager = RolesManager(rolesManagerAddress);

    }

    /**
    * @dev Restrict actions to specific roles
    */
    modifier onlyAuthorized(bytes32 role) {
        if (!hasRoleAssigned(msg.sender, role)) {
            revert InsufficientPermissionsToPerfomAction(msg.sender);
        }
        _;
    }

        /*//////////////////////////////////////////////////////////////
                          MINER ROLE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
    * @dev Register a new mineral - only by miner
    * @notice Emits MineralRegistered event on successful registration
    */
    function registerMineral(
        string memory _name, 
        string memory _origin, 
        string memory _mineralType, 
        string memory _weight, 
        uint256 _purityPercentage, 
        string memory _storageConditions
        ) external  override onlyAuthorized(MINER_ROLE) {

            // custom error handling

            if (bytes(_name).length == 0) {
                revert MineralRegistry__InvalidMineralName();
            }
            if (bytes(_origin).length == 0) {
                revert MineralRegistry__InvalidMineralOrigin();
            }

            if (bytes(_mineralType).length == 0) {
                revert MineralRegistry__InvalidMineralType();
            }
            
            if (bytes(_weight).length == 0) {
                revert MineralRegistry__InvalidMineralWeight();
            }

            if (_purityPercentage == 0) {
                revert MineralRegistry__InvalidMineralPurityPercentage();
            }

            if (bytes(_storageConditions).length == 0) {
                revert MineralRegistry__InvalidMineralStorageConditions();
            }

        uint256 mineralId = nextMineralId++;
        mineralDetails[mineralId] = MineralDetails({
            id: mineralId,
            name: _name,
            origin: _origin,
            mineralType: _mineralType,
            weight: _weight,
            purityPercentage: _purityPercentage,
            storageConditions: _storageConditions,
            registeredBy: msg.sender,
            currentStatus: "Raw",
            currentLocation: "Mining Center",
            currentHandler: msg.sender,
            isPurchased: false,
            isRefined: false,
            isAudited: false,
            isInspected: false,
            timestamp: block.timestamp
        });

    // record initial mineral history
    mineralHistories[mineralId].push(
        MineralHistory({
            id: mineralId,
            fieldChanged: "Mineral Registry",
            newValue: string(abi.encodePacked("Origin: ", _origin)),
            updatedBy: msg.sender,
            timestamp: block.timestamp
        })
    );

    emit MineralRegistered(mineralId, _name, _origin, _mineralType, _weight, _purityPercentage, msg.sender, block.timestamp);
    
    }

 

    /**
    * @dev Updates mineral details - only by authorized roles
    * @notice Emits MineralUpdated event on successful updation
    */
    function updateMineralStatus(uint256 mineralId, string memory newStatus) public {

        // custom error handling

        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }

        if (bytes(newStatus).length == 0) {
            revert MineralRegistry__InvalidMineralStatus();
        }

        if (
            !hasRoleAssigned(msg.sender, REFINER_ROLE) ||
            !hasRoleAssigned(msg.sender, TRANSPORTER_ROLE) ||
            !hasRoleAssigned(msg.sender, AUDITOR_ROLE) ||
            !hasRoleAssigned(msg.sender, INSPECTOR_ROLE)
        ) {
            revert InsufficientPermissionsToPerfomAction(msg.sender);
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

        /*//////////////////////////////////////////////////////////////
                       TRANSPORTATION ENTERPRISE
    //////////////////////////////////////////////////////////////*/

    /**
    * @dev updates the location of the mineral
    * @param mineralId the ID of the mineral to update
    * @param newLocation The new location of the mineral
    * @notice Emits MineralLocationUpdated event on successful location update!
    */
    function updateMineralLocation(uint256 mineralId, string memory newLocation) public onlyAuthorized(TRANSPORTER_ROLE) {

        // custom error handling
        
        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }

        if (bytes(newLocation).length == 0) {
            revert MineralRegistry__InvalidMineralLocation();
        }

        string memory previousLocation = mineralDetails[mineralId].currentLocation;
        mineralDetails[mineralId].currentLocation = newLocation;

        emit MineralLocationUpdated(mineralId, previousLocation, newLocation, msg.sender);
    }

    /**
    * @dev Transfers ownership - only by the transporter
    * @notice Emits MineralTransported on successful transfer 
    */
    function transferMineral(uint256 mineralId, address _receivingParty, string memory _origin, string memory _destination) public override onlyAuthorized(TRANSPORTER_ROLE) {

        // custom error handling
        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        } 

        if (_receivingParty == address(0)) {
            revert MineralRegistry__InvalidReceivingPartyAddress();
        }

        if (bytes(_origin).length == 0) {
            revert MineralRegistry__InvalidMineralOrigin();
        }

        if (bytes(_destination).length == 0) {
            revert MineralRegistry__InvalidMineralDestination();
        }

        address previousOwner = mineralDetails[mineralId].currentHandler;
        previousOwner == msg.sender;
        mineralDetails[mineralId].currentHandler = _receivingParty;
        mineralDetails[mineralId].timestamp = block.timestamp;

        // record mineral history
        mineralHistories[mineralId].push(
            MineralHistory({
                id: mineralId,
                fieldChanged: "Ownership",
                newValue: string(abi.encodePacked("New Owner:", addressToString(_receivingParty))),
                updatedBy: msg.sender,
                timestamp: block.timestamp
            })
        );

        emit MineralTransported(mineralId, previousOwner, _receivingParty, _origin, _destination , block.timestamp);
    }


        /*//////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ////////   SUPPLYCHAIN VALIDATION ENTERPRISE  ////////////////
        //////  //////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////*/

    /**
    * @dev retrieves mineral details of specified mineralId
    * @return mineral details of specified mineralId
    */
    function getMineralDetails(uint256 mineralId) public virtual view returns(MineralDetails memory) {

        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
       }
        return mineralDetails[mineralId];
    }    


    /**
    * @dev retrieves fll history of a mineral (for audit retail)
    * @return history of specified mineral sing its mineralId
    */
    function getMineralHistory(uint256 mineralId) public override view returns(MineralHistory[] memory) {

        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }
        return mineralHistories[mineralId];

    }

    /**
    * @dev checks if a mineral with the given ID is registered
    * @param mineralId the ID of the mineral to check
    * @return A boolean indicating whether the mineral is registered or not
    */
    function isMineralRegistered(uint256 mineralId) public view returns(bool) {

        if (mineralId == 0) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }

        if (mineralDetails[mineralId].id != mineralId) {
            revert MineralRegistry__MineralNotRegistered(mineralId);
        }
        return mineralDetails[mineralId].id == mineralId;
    }

    function isMineralAudited(uint256 mineralId) public view returns(bool) {

        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }
        return mineralDetails[mineralId].isAudited;
    }

    function isMineralInspected(uint256 mineralId) public view returns(bool) {

        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }
        return mineralDetails[mineralId].isInspected;
    }




    /*//////////////////////////////////////////////////////////////
                         AUDITOR FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
    * @dev enables an auditor to audit a mineral 
    * @notice Emits MineralAudited event on successful auditing of a mineral
    */
    function auditMineral(uint256 mineralId) public override onlyAuthorized(AUDITOR_ROLE) {

        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }

        if (mineralDetails[mineralId].isAudited == true) {
            revert MineralRegistry__MineralAlreadyAudited();
        }

        mineralDetails[mineralId].isAudited = true;

        emit MineralAudited(mineralId, msg.sender, block.timestamp);
    }

        /*//////////////////////////////////////////////////////////////
                          INSPECTOR FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
    * @dev enables only the inspector to audit a mineralDetails
    * @notice Emits MineralInspected even
    */
    function inspectMineral(uint256 mineralId) public onlyAuthorized(INSPECTOR_ROLE) {

        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }

        if (mineralDetails[mineralId].isInspected == true) {
            revert MineralRegistry__MineralAlreadyInspected();
        }

        mineralDetails[mineralId].isInspected = true;

        emit MineralInspected(mineralId, msg.sender, "status", block.timestamp);
    }

    /**
    * @dev checks audit and inspection status
    * Returns the status of both audit and inspection of mineral according to mineralId
    */
    function checkAuditAndInspectionStatus(uint256 mineralId) public override onlyAuthorized(DEFAULT_ADMIN_ROLE) returns(bool isAudited, bool isInspected) {

        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }

        if (mineralDetails[mineralId].isAudited && mineralDetails[mineralId].isInspected) {
            emit MineralReadyToTrade(mineralId, msg.sender, "TradingReady", block.timestamp);

        } else {
            revert MineralNotReadyToTrade();
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
    function addressToString(address _address) internal pure returns(string memory) {
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