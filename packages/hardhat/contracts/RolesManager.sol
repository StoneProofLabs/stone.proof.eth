// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
* @title RolesManager contract
* @author @0xJonaseb11 
* It acts as the factory of all the roles in the whole supplychain
* It is where all the roles in the chain are assigned and granted. No any other contract can handle that
*
* It is a Modular contract
*/


import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { MineralRegistry } from "./MineralRegistry.sol";

contract RolesManager is AccessControl {

    MineralRegistry private  mineralRegistry;

        /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/
    error RolesManager__InvalidMineralIdOrNotFound(uint256 mineralId);
    error RolesManager__MineralAlreadyRefined(uint256 mineralId);
    error RolesManager__MineralAlreadyPurchased(uint256 mineralId);
    error RolesManager__MineralAlreadyInspected(uint256 mineralId);
    error RolesManager__MineralAlreadyAudited(uint256 mineralId);
    error RolesManager__NotTheAssignedBuyer(address caller);

    error RolesManager__InvalidMineralName();
    error RolesManager__InvalidMineralOrigin();
    error RolesManager__InvalidMineralDestination();

    error RolesManager__MineralNotMarketReady();

 
    error RolesManager__InvalidMineralType();
    error RolesManager__InvalidReceivingPartyAddress();
    error RolesManager__InvalidMineralStorageConditions();
    error RolesManager__InvalidMineralPurityPercentage();
    error RolesManager__MineralPurityPercentageTooLowToRegister(uint256 purityPercentage);
    error RolesManager__InvalidMineralWeight();

    error RolesManager__InvalidAddress();
    error RolesManager__InvalidRole();

    error InsufficientPermissionsToPerfomAction(address caller);



    // define roles
    bytes32 public constant MINER_ROLE = keccak256("MINER_ROLE");
    bytes32 public constant REFINER_ROLE = keccak256("REFINER_ROLE");
    bytes32 public constant TRANSPORTER_ROLE =  keccak256("TRANSPORTER_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    bytes32 public constant INSPECTOR_ROLE = keccak256("INSPECTOR_ROLE");
    bytes32 public constant BUYER_ROLE = keccak256("BUYER_ROLE");

    // Events for transparency - to log to blockchain
    event RoleAssigned(address indexed account, bytes32 indexed role, uint256 roleAssignedAt);
    event RoleRevoked(bytes32 role, address account, address revoker, uint256 roleRevokedAt);

    // role-centered events
    event MineralRegistered(uint256 indexed mineralId, string mineralName, string origin, string mineralType, string weight, uint256 purityPercentage, address indexed miner, uint256 registeredAt);
    event MineralRefined(uint256 indexed mineralId, address indexed refiner, uint256 refinedAt);
    event MineralTransported(uint256 indexed mineralId, address indexed transporter, address receivingParty, string origin, string destination, uint256 transportedAt);
    event MineralInspected(uint256 indexed mineralId, address indexed inspector, string status, uint256 inspectedAt);
    event MineralAudited(uint256 indexed mineralId, address indexed auditor, uint256 auditedAt);
    event MineralPurchased(uint256 indexed mineralId, address indexed buyer, uint256 purchasedAt);
    event MineralReadyToTrade(uint256 mineralId, address inspector_Auditor, string status, uint256 inspectionDate);


    struct MineralDetails {
        uint256 id;
        string name;
        string origin;
        string mineralType;
        string weight;
        uint256 purityPercentage;
        string storageConditions;
        address registeredBy;
        string currentStatus;
        string currentLocation;
        address currentHandler;
        
        bool isPurchased;
        bool isRefined;
        bool isAudited;
        bool isInspected;
        uint256 timestamp;
    }

    struct MineralHistory {
        uint256 id;
        string fieldChanged;
        string newValue;
        address updatedBy;
        uint256 timestamp;
    }



    mapping(uint256 => MineralDetails) public mineralDetails;
    mapping(uint256 => MineralHistory[]) public mineralHistories; 

    uint256 private nextMineralId = 1;

    // Set the deployer as the admin
    constructor () {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        // _setupRole(MINER_ROLE, msg.sender);
        // _setupRole(AUDITOR_ROLE, msg.sender);
        // _setupRole(INSPECTOR_ROLE, msg.sender);
        // _setsupRole(BUYER_ROLE, msg.sender);
        // _setupRole(REFINER_ROLE, msg.sender);
        // _setupRole(TRANSPORTER_ROLE, msg.sender);
        }

    /**
    * @dev checks if sender has specific role 
    */
    modifier restrictedToRole(bytes32 role) {
        if (!hasRoleAssigned(msg.sender, role)) {
            revert InsufficientPermissionsToPerfomAction(msg.sender);
        }
        _;
    } 

 

    /////////////////////////////////////////////////////
    ///////// Role-based functionality functions////////
    ///////////////////////////////////////////////////

    /**
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
        ) external virtual restrictedToRole(MINER_ROLE) {

            // custom error handling

            if (bytes(_name).length == 0) {
                revert RolesManager__InvalidMineralName();
            }
            if (bytes(_origin).length == 0) {
                revert RolesManager__InvalidMineralOrigin();
            }

            if (bytes(_mineralType).length == 0) {
                revert RolesManager__InvalidMineralType();
            }
            
            if (bytes(_weight).length == 0) {
                revert RolesManager__InvalidMineralWeight();
            }

            if (_purityPercentage == 0 || _purityPercentage > 100) {
                revert RolesManager__InvalidMineralPurityPercentage();
            }

            if (_purityPercentage <= 80) {
                revert RolesManager__MineralPurityPercentageTooLowToRegister(_purityPercentage);
            }

            if (bytes(_storageConditions).length == 0) {
                revert RolesManager__InvalidMineralStorageConditions();
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
            fieldChanged: "Registered",
            newValue: string(abi.encodePacked("Origin: ", _origin)),
            updatedBy: msg.sender,
            timestamp: block.timestamp
        })
    );

    emit MineralRegistered(mineralId, _name, _origin, _mineralType, _weight, _purityPercentage, msg.sender, block.timestamp);
    }
    
    
    /**
     * @dev only the refiner can refiner a mineral
     * @notice Emits MineralRefined event on successfl refining process
    */
    function refineMineral(uint256 mineralId) public restrictedToRole(REFINER_ROLE) {

        if (mineralDetails[mineralId].id != mineralId ||mineralId == 0) {
            revert RolesManager__InvalidMineralIdOrNotFound(mineralId);
        }

        if (mineralDetails[mineralId].isRefined == true) {
            revert RolesManager__MineralAlreadyRefined(mineralId);
        }

        mineralDetails[mineralId].isRefined = true;
        
        emit MineralRefined(mineralId, msg.sender, block.timestamp);
    }

    /**
    * @dev only the transporter can transport mineralDetails
    * @notice Emits MineralTransported on successful transportation
    */
    function transferMineral(uint256 mineralId, address _receivingParty, string memory _origin, string memory _destination) virtual public restrictedToRole(TRANSPORTER_ROLE) {

        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert RolesManager__InvalidMineralIdOrNotFound(mineralId);
        }

        if (_receivingParty == address(0)) {
            revert RolesManager__InvalidReceivingPartyAddress();
        }

        if (bytes(_origin).length == 0) {
            revert RolesManager__InvalidMineralOrigin();
        } 

        if (bytes(_destination).length == 0) {
            revert RolesManager__InvalidMineralDestination();
        }

        if (mineralDetails[mineralId].isPurchased == true) {
            revert RolesManager__MineralAlreadyPurchased(mineralId);
        }

        mineralDetails[mineralId].currentHandler = msg.sender;

        emit MineralTransported(mineralId, msg.sender, _receivingParty, _origin, _destination, block.timestamp);
    }

    /**
    * @dev only the inspector can inspect mineralDetails
    * @notice Emits MineralInspected event on successful inspection
    */
    function inspectMineral(uint256 mineralId, string memory status) public restrictedToRole(INSPECTOR_ROLE) {

        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert RolesManager__InvalidMineralIdOrNotFound(mineralId);
        }

        if (mineralDetails[mineralId].isInspected == true) {
            revert RolesManager__MineralAlreadyInspected(mineralId);
        }

        mineralDetails[mineralId].isInspected = true;

        emit MineralInspected(mineralId, msg.sender, status, block.timestamp);
    }

    /**
    * @dev only the auditor can audit mineralDetails
    * @notice Emits MineralAudited event
    */
    function auditMineral(uint256 mineralId) public virtual restrictedToRole(AUDITOR_ROLE) {

        if (mineralDetails[mineralId].id != mineralId || mineralId <= 0) {
            revert RolesManager__InvalidMineralIdOrNotFound(mineralId);
        }

        if (mineralDetails[mineralId].isAudited == true) {
            revert RolesManager__MineralAlreadyAudited(mineralId);
        }

        mineralDetails[mineralId].isAudited = true;

        emit MineralAudited(mineralId, msg.sender, block.timestamp);
    }

    /**
    * @dev Only the buyer can purchase mineralDetails
    * @notice Emits MineralPurchased even on successful purchase
    */
    function purchaseMineral(uint256 mineralId) public restrictedToRole(BUYER_ROLE) {

        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert RolesManager__InvalidMineralIdOrNotFound(mineralId);
        }

        if (mineralDetails[mineralId].isPurchased == true) {
            revert RolesManager__MineralAlreadyPurchased(mineralId);
        }

        (bool isAudited, bool isInspected) = checkAuditAndInspectionStatus(mineralId);


       if (!(isAudited && isInspected)) {
        revert RolesManager__MineralNotMarketReady();
       } 

        // require(mineralDetails[mineralId].currentHandler == msg.sender, "You are not the assigned buyer for this mineral!!");
        
        mineralDetails[mineralId].isPurchased = true;
        mineralDetails[mineralId].currentHandler = msg.sender;

        emit MineralPurchased(mineralId, msg.sender, block.timestamp);
    }


      /*//////////////////////////////////////////////////////////////
                     ROLESMANAGER HELPER FUNCTIONS
    //////////////////////////////////////////////////////////////*/


    /*//////////////////////////////////////////////////////////////
                            ADMIN FUNCTIONS
    //////////////////////////////////////////////////////////////*/



    // function _setupRole(bytes32 role, address account) internal  {
    //     _grantRole(role, account);
    // }


    /**
    * @dev assigns role to an account - only by admin
    * @notice Emits RoleAssigned event
    */
    function assignRole(address account, bytes32 role) public restrictedToRole(DEFAULT_ADMIN_ROLE) {
        if (account == address(0) || account.code.length != 0) {
            revert RolesManager__InvalidAddress();
        }
        if (role == 0 || !isValidRole(role)) {
            revert RolesManager__InvalidRole();
        }
        grantRole(role, account);
        emit RoleAssigned(account, role, block.timestamp);
    }


    /**
    * @dev Revokes to from an account - only admin 
    * @notice Emits RoleRevoked event
    */
    function revokeRole(address account, bytes32 role) public restrictedToRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(role, account);
        emit RoleRevoked(role, account, msg.sender, block.timestamp);
    }

    /**
    * @dev checks if an account has a specific role
    */
    function hasRoleAssigned(address account, bytes32 role) public view returns (bool) {
        return hasRole(role, account);
    }


        /**
    * @dev checks audit and inspection status
    * Returns the status of both audit and inspection of mineral according to mineralId
    */
    function checkAuditAndInspectionStatus(uint256 mineralId) public virtual  restrictedToRole(DEFAULT_ADMIN_ROLE) returns(bool isAudited, bool isInspected) {

        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert RolesManager__InvalidMineralIdOrNotFound(mineralId);
        }

        if (mineralDetails[mineralId].isAudited && mineralDetails[mineralId].isInspected) {
            emit MineralReadyToTrade(mineralId, msg.sender, "TradingReady", block.timestamp);

        } else {
            revert RolesManager__MineralNotMarketReady();
        }

        isAudited = mineralDetails[mineralId].isAudited;
        isInspected = mineralDetails[mineralId].isInspected;

        return (isAudited, isInspected);
    }

    /**
    * @dev Helper functions for each role
    * @notice These helper functions are for aiding in roles
    */
    function isMiner(address account) public view returns(bool) {
        return hasRole(MINER_ROLE, account);
    }

    function isRefiner(address account) public view returns(bool) {
        return hasRole(REFINER_ROLE, account);
    } 

    function isTransporter(address account) public view returns(bool) {
        return hasRole(TRANSPORTER_ROLE, account);
    }

    function isAuditor(address account) public view returns(bool) {
        return hasRole(AUDITOR_ROLE, account);
    }

    function isInspector(address account) public view returns(bool) {
        return hasRole(INSPECTOR_ROLE, account);
    }

    function isBuyer(address account) public view returns(bool) {
        return hasRole(BUYER_ROLE, account);
    }


    // Getters - for inspection purposes
        function getMineralHistory(uint256 mineralId) public virtual  view returns(MineralHistory[] memory) {

        if (mineralDetails[mineralId].id != mineralId || mineralId == 0) {
            revert RolesManager__InvalidMineralIdOrNotFound(mineralId);
        }
        return mineralHistories[mineralId];

    }





    // Helper function to validate the role
    function isValidRole(bytes32 role) private pure returns (bool) {
    return role == MINER_ROLE || 
           role == REFINER_ROLE || 
           role == TRANSPORTER_ROLE || 
           role == AUDITOR_ROLE || 
           role == INSPECTOR_ROLE || 
           role == BUYER_ROLE;
  }


}