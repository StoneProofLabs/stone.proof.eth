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
import { Errors } from "../utils/Errors.sol";

contract RolesManager is AccessControl, Errors {
            /*/////////////////////////////////////////////////////
                           SUPPLYCHAIN ROLES
            /////////////////////////////////////////////////////*/
    bytes32 public constant MINER_ROLE = keccak256("MINER_ROLE");
    bytes32 public constant REFINER_ROLE = keccak256("REFINER_ROLE");
    bytes32 public constant TRANSPORTER_ROLE = keccak256("TRANSPORTER_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    bytes32 public constant INSPECTOR_ROLE = keccak256("INSPECTOR_ROLE");
    bytes32 public constant BUYER_ROLE = keccak256("BUYER_ROLE");

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
        uint256 weight,
        uint256 purityPercentage,
        address indexed miner,
        uint256 registeredAt
    );
    event MineralRefined(string mineralId, string refineryReport, address indexed refiner, uint256 refinedAt);
    event MineralTransported(
        string mineralId,
        address indexed transporter,
        address receivingParty,
        string origin,
        string destination,
        uint256 transportedAt
    );
    event MineralInspected(string mineralId, string mineralStatus, address indexed inspector, uint256 inspectedAt);
    event MineralAudited(string mineralId, string status, address indexed auditor, uint256 auditedAt);
    event MineralPurchased(string mineralId, address indexed buyer, uint256 purchasedAt);
    event MineralReadyToTrade(string mineralId, address indexed ApprovedBy, string status, uint256 inspectionDate);

    // For every assigned role
    event MinerRoleAssigned(address indexed assignee, uint256 timestamp);
    event RefinerRoleAssigned(address indexed assignee, uint256 timestamp);
    event TransporterRoleAssigned(address indexed assignee, uint256 timestamp);
    event AuditorRoleAssigned(address indexed assignee, uint256 timestamp);
    event InspectorRoleAssigned(address indexed assignee, uint256 timestamp);
    event BuyerRoleAssigned(address indexed assignee, uint256 timestamp);
    event AdminRoleAssigned(address indexed assignee, uint256 timestamp);
    // For every revoked role
    event MinerRoleRevoked(address indexed revokee, string reason, uint256 timestamp);
    event RefinerRoleRevoked(address indexed revokee, string reason, uint256 timestamp);
    event TransporterRoleRevoked(address indexed revokee, string reason, uint256 timestamp);
    event AuditorRoleRevoked(address indexed revokee, string reason, uint256 timestamp);
    event InspectorRoleRevoked(address indexed revokee, string reason, uint256 timestamp);
    event BuyerRoleRevoked(address indexed revokee, string reason, uint256 timestamp);
    event AdminRoleRevoked(address indexed revokee, string reason, uint256 timestamp);

    struct MineralDetails {
        string id;
        string name;
        string origin;
        string mineralType;
        uint256 weight;
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
        string id;
        string fieldChanged;
        string newValue;
        address updatedBy;
        uint256 timestamp;
    }

    uint256 private nonce = block.timestamp + block.number;
    mapping(string => MineralDetails) public mineralDetails;
    mapping(string => MineralHistory[]) public mineralHistories;
    mapping(bytes32 => uint256) public roleMemberCount;


    // Set the deployer as the admin
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        roleMemberCount[DEFAULT_ADMIN_ROLE] = 1;
        emit AdminRoleAssigned(msg.sender,block.timestamp);
        
        _setupRole(MINER_ROLE, msg.sender);
        roleMemberCount[MINER_ROLE] = 0;
        emit MinerRoleAssigned(msg.sender, block.timestamp);

        _setupRole(AUDITOR_ROLE, msg.sender);
        roleMemberCount[AUDITOR_ROLE] = 0;
        emit AuditorRoleAssigned(msg.sender, block.timestamp);

        _setupRole(INSPECTOR_ROLE, msg.sender);
        roleMemberCount[INSPECTOR_ROLE] = 0;
        emit InspectorRoleAssigned(msg.sender, block.timestamp);

        _setupRole(BUYER_ROLE, msg.sender);
        roleMemberCount[BUYER_ROLE] = 0;
        emit BuyerRoleAssigned(msg.sender, block.timestamp);

        _setupRole(REFINER_ROLE, msg.sender);
        roleMemberCount[REFINER_ROLE] = 0;
        emit RefinerRoleAssigned(msg.sender, block.timestamp);
        
        _setupRole(TRANSPORTER_ROLE, msg.sender);
         roleMemberCount[TRANSPORTER_ROLE] = 0;
         emit TransporterRoleAssigned(msg.sender, block.timestamp);

    }

    /**
     * @dev checks if sender has specific role
     */
    modifier restrictedToRole(bytes32 role) {
        if (!hasRole(role, msg.sender)) {
            revert InsufficientPermissionsToPerformAction(msg.sender);
        }
        _;
    }

    modifier onlyNonZeroAddress(address account) {
        if (account == address(0)) {
            revert InvalidAccountAddress();
        }
        _;
    }

    modifier onlyValidMineralId(string memory mineralId) {
        if (keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId))) {
            revert InvalidMineralIdOrNotFound(mineralId);
        }
        _;
    }

    /*//////////////////////////////////////////////////////////////
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
            ATTENTION HERE - CHECKING VALIDITY OF A MINERAL
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\        
    //////////////////////////////////////////////////////////////*/
    modifier onlyValidMineral(string memory mineralId) virtual {
        if (!isMineralRegistered(mineralId) || bytes(mineralId).length == 0) {
            revert InvalidMineralIdOrNotFound(mineralId);
        }
        _;
    }

    /*////////////////////////////////////////////////////
            =====================================================
            ///////// ROLE-BASED FUNCTIONALITY FUNCTIONS ////////
            ====================================================
            //////////////////////////////////////////////////*/

    /*//////////////////////////////////////////////////////////////
        ================================================================
                              MINING ENTERPRISE PORTAL
        =================================================================
       //////////////////////////////////////////////////////////////*/

    /**
     * @dev Register a new mineral - only by miner.
     * @dev Every mineral is assigned a unique mineralId.
     * @param _name Mineral name.
     * @param _mineralType The type of a mineral.
     * @param _weight Mineral weight in uint256.
     * @param _origin Mineral Origin.
     * @param _purityPercentage Mineral purity in percentage.
     * @param _storageConditions Mineral Storage conditions.
     * @notice Emits MineralRegistered event on successful registration.
     */
    function registerMineral(
        string memory _name,
        string memory _mineralType,
        uint256 _weight,
        string memory _origin,
        uint256 _purityPercentage,
        string memory _storageConditions
    ) external virtual restrictedToRole(MINER_ROLE) returns (string memory) {
        if (bytes(_name).length == 0) revert RolesManager__InvalidMineralName();
        if (bytes(_origin).length == 0) revert RolesManager__InvalidMineralOrigin();

        if (bytes(_mineralType).length == 0) revert RolesManager__InvalidMineralType();

        if (_weight == 0) revert RolesManager__InvalidMineralWeight();

        if (_purityPercentage == 0 || _purityPercentage > 100) revert RolesManager__InvalidMineralPurityPercentage();

        if (_purityPercentage <= 80) revert RolesManager__MineralPurityPercentageTooLowToRegister(_purityPercentage);

        if (bytes(_storageConditions).length == 0) revert RolesManager__InvalidMineralStorageConditions();

        string memory mineralId = _generateHashedMineralId(_mineralType);

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

        emit MineralRegistered(
            mineralId,
            _name,
            _mineralType,
            _origin,
            _weight,
            _purityPercentage,
            msg.sender,
            block.timestamp
        );

        return mineralId;
    }

        /*//////////////////////////////////////////////////////////////
        ===============================================================
                              PROCESSING ENTERPRISE
        ===============================================================                    
        //////////////////////////////////////////////////////////////*/

    /*///////////////////////////////////////////////
                              REFINER
        ///////////////////////////////////////////////*/

    /**
     * @dev only the refiner can refiner a mineral
     * @param mineralId The ID of the mineral under refinery
     * @notice Emits MineralRefined event on successfl refining process
     */
    function refineMineral(string memory mineralId, string memory report) public restrictedToRole(REFINER_ROLE) {
        // if (
        //     keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
        //     bytes(mineralId).length == 0
        // ) {
        //     revert RolesManager__InvalidMineralIdOrNotFound();
        // }

        if (mineralDetails[mineralId].isRefined == true) revert RolesManager__MineralAlreadyRefined(mineralId);

        mineralDetails[mineralId].isRefined = true;

        emit MineralRefined(mineralId, report,msg.sender, block.timestamp);
    }

    /*////////////////////////////////////////////////
                              TRANSPORTER
          ///////////////////////////////////////////////*/

    /**
     * @dev only the transporter can transport mineralDetails
     * @param mineralId The ID of the mineral under transportation
     * @param _receivingParty The address of the destination portal
     * @param _origin The Original location of the mineral under transportation
     * @param _destination The Destination area of the mineral(string)
     * @notice Emits MineralTransported on successful transportation
     */
    function transferMineral(
        string memory mineralId,
        address _receivingParty,
        string memory _origin,
        string memory _destination
    ) public virtual restrictedToRole(TRANSPORTER_ROLE) {
        // if (
        //     keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
        //     bytes(mineralId).length == 0
        // ) {
        //     revert RolesManager__InvalidMineralIdOrNotFound();
        // }

        if (_receivingParty == address(0)) revert RolesManager__InvalidReceivingPartyAddress();

        if (bytes(_origin).length == 0) revert RolesManager__InvalidMineralOrigin();

        if (bytes(_destination).length == 0) revert RolesManager__InvalidMineralDestination();

        if (mineralDetails[mineralId].isPurchased == true) revert RolesManager__MineralAlreadyPurchased(mineralId);

        mineralDetails[mineralId].currentHandler = msg.sender;

        emit MineralTransported(mineralId, msg.sender, _receivingParty, _origin, _destination, block.timestamp);
    }

    /*//////////////////////////////////////////////////////////////
        ===============================================================
                     SUPPLYCHAIN VALIDATION PORTAL
        ===============================================================
        //////////////////////////////////////////////////////////////*/

    /*///////////////////////////////////////////////
                               INSPECTOR
            ///////////////////////////////////////////////*/

    /**
     * @dev only the inspector can inspect mineralDetails
     * @param mineralId The ID of the mineral under inspection
     * @param report The inspection status report of the mineral under inspection
     * @notice Emits MineralInspected event on successful inspection
     * @dev Logs audit report on every successful inspection
     */
    function inspectMineral(string memory mineralId, string memory report) public restrictedToRole(INSPECTOR_ROLE) {
        // if (
        //     keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
        //     bytes(mineralId).length == 0
        // ) {
        //     revert RolesManager__InvalidMineralIdOrNotFound();
        // }

        if (mineralDetails[mineralId].isInspected == true) revert RolesManager__MineralAlreadyInspected(mineralId);

        mineralDetails[mineralId].isInspected = true;

        emit MineralInspected(mineralId, report, msg.sender, block.timestamp);

        /*//////////////////////////////////////////////////
                          HANDLE INSPECTION REPORTING
           ///////////////////////////////////////////////////*/
    }

    /*/////////////////////////////////////////////
                               AUDITOR
            ////////////////////////////////////////////*/

    /**
     * @dev only the auditor can audit mineralDetails.
     * @dev Logs audit report on every successful audit.
     * @param mineralId The ID of the mineral under audition.
     * @param report The audit status report of the mineral under audition.
     * @notice Emits MineralAudited event.
     */
    function _auditMineral(
        string memory mineralId,
        string memory report
    ) public /*virtual*/ restrictedToRole(AUDITOR_ROLE) {
        // if (
        //     keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
        //     bytes(mineralId).length == 0
        // ) {
        //     revert RolesManager__InvalidMineralIdOrNotFound();
        // }

        if (mineralDetails[mineralId].isAudited == true) revert RolesManager__MineralAlreadyAudited(mineralId);

        mineralDetails[mineralId].isAudited = true;

        emit MineralAudited(mineralId, report, msg.sender, block.timestamp);

        /*//////////////////////////////////////////////////
                          HANDLE AUDIT REPORTING
           ///////////////////////////////////////////////////*/
    }

    /**
     * @dev Only the buyer can purchase mineralDetails
     * @param mineralId The ID of the mineral under purchase
     * @notice Emits MineralPurchased event on successful purchase
     */
    function purchaseMineral(string memory mineralId) public restrictedToRole(BUYER_ROLE) {
        // if (
        //     keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
        //     bytes(mineralId).length == 0
        // ) {
        //     revert RolesManager__InvalidMineralIdOrNotFound();
        // }

        if (mineralDetails[mineralId].isPurchased == true) revert RolesManager__MineralAlreadyPurchased(mineralId);

        (bool isAudited, bool isInspected) = checkAuditAndInspectionStatus(mineralId);

        if (!(isAudited && isInspected)) revert RolesManager__MineralNotMarketReady(mineralId);

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

    ////////////////////////////////////////////////
    /////// ROLEMANAGEMENT FUNCTIONS ////////////////
    ////////////////////////////////////////////////

    /////////////////////////////////
    ////// ROLE GRANTING ////////////
    /////////////////////////////////

    /*////////////////////////////////////////////////////
                  ROLE MANAGEMENT FUNCTIONS
    ////////////////////////////////////////////////////*/

    function assignMiner(address account) external onlyNonZeroAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        if (hasMinerRole(account)) revert RolesManager__AccountAlreadyHasRole();
        _grantRole(MINER_ROLE, account);
        roleMemberCount[MINER_ROLE]++;
        emit MinerRoleAssigned(account, block.timestamp);
    }

    function assignRefiner(address account) external onlyNonZeroAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        if (hasRefinerRole(account)) revert RolesManager__AccountAlreadyHasRole();
        _grantRole(REFINER_ROLE, account);
        roleMemberCount[REFINER_ROLE]++;
        emit RefinerRoleAssigned(account, block.timestamp);
    }

    function assignTransporter(address account) external onlyNonZeroAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        if (hasTransporterRole(account)) revert RolesManager__AccountAlreadyHasRole();
        _grantRole(TRANSPORTER_ROLE, account);
        roleMemberCount[TRANSPORTER_ROLE]++;
        emit TransporterRoleAssigned(account, block.timestamp);
    }

    function assignAuditor(address account) external onlyNonZeroAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        if (hasAuditorRole(account)) revert RolesManager__AccountAlreadyHasRole();
        _grantRole(AUDITOR_ROLE, account);
        roleMemberCount[AUDITOR_ROLE]++;
        emit AuditorRoleAssigned(account, block.timestamp);
    }

    function assignInspector(address account) external onlyNonZeroAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        if (hasInspectorRole(account)) revert RolesManager__AccountAlreadyHasRole();
        _grantRole(INSPECTOR_ROLE, account);
        roleMemberCount[INSPECTOR_ROLE]++;
        emit InspectorRoleAssigned(account, block.timestamp);
    }

    function assignBuyer(address account) external onlyNonZeroAddress(account) onlyRole(DEFAULT_ADMIN_ROLE) {
        if (hasBuyerRole(account)) revert RolesManager__AccountAlreadyHasRole();
        _grantRole(BUYER_ROLE, account);
        roleMemberCount[BUYER_ROLE]++;
        emit BuyerRoleAssigned(account, block.timestamp);
    }


             /////////////////////////////////
             // ROLE REVOKATION /////////////
             ////////////////////////////////

    function revokeMiner(address account, string memory reason) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (!hasMinerRole(account)) revert RolesManager__AccountDoesNotHaveRole();
        revokeRole(MINER_ROLE, account);
        if (roleMemberCount[MINER_ROLE] > 0) {
        roleMemberCount[MINER_ROLE]--;

        }
        emit MinerRoleRevoked(account, reason, block.timestamp);
    }

    function revokeRefiner(address account, string memory reason) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (!hasRefinerRole(account)) revert RolesManager__AccountDoesNotHaveRole();
        revokeRole(REFINER_ROLE, account);
        
          if (roleMemberCount[REFINER_ROLE] > 0) {
        roleMemberCount[REFINER_ROLE]--;

        }
        emit RefinerRoleRevoked(account, reason, block.timestamp);
    }

    function revokeTransporter(address account, string memory reason) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (!hasTransporterRole(account)) revert RolesManager__AccountDoesNotHaveRole();
        revokeRole(TRANSPORTER_ROLE, account);
        if (roleMemberCount[TRANSPORTER_ROLE] > 0) {
            roleMemberCount[TRANSPORTER_ROLE]--;
        }
        emit TransporterRoleRevoked(account, reason, block.timestamp);
    }

    function revokeInspector(address account, string memory reason) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (!hasInspectorRole(account)) revert RolesManager__AccountDoesNotHaveRole();
        revokeRole(INSPECTOR_ROLE, account);
        if (roleMemberCount[INSPECTOR_ROLE] > 0) {
            roleMemberCount[INSPECTOR_ROLE]--;
        }
        emit InspectorRoleRevoked(account, reason, block.timestamp);
    }

    function revokeAuditor(address account, string memory reason) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (!hasAuditorRole(account)) revert RolesManager__AccountDoesNotHaveRole();
        revokeRole(AUDITOR_ROLE, account);
        if (roleMemberCount[AUDITOR_ROLE] > 0) {
            roleMemberCount[AUDITOR_ROLE]--;
        }
        emit AuditorRoleRevoked(account, reason, block.timestamp);
    }

    function revokeBuyer(address account, string memory reason) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (!hasBuyerRole(account)) revert RolesManager__AccountDoesNotHaveRole();
        revokeRole(BUYER_ROLE, account);
        if (roleMemberCount[BUYER_ROLE] > 0) {
            roleMemberCount[BUYER_ROLE]--;
        }
        emit BuyerRoleRevoked(account, reason, block.timestamp);
    }

    /*/////////////////////////////////////////////////////
                  NEW ROLE COUNT FUNCTIONS
    /////////////////////////////////////////////////////*/

    /**
     * @dev Returns the number of accounts that have a specific role
     * @param role The role to query member count for
     * @return count The number of accounts with the role
     */
    function getRoleMemberCount(bytes32 role) public view returns (uint256 count) {
        if (!isValidRole(role)) revert RolesManager__InvalidRole();
        return roleMemberCount[role];
    }

    /**
     * @dev Returns all role counts in a single call
     * @return minerCount Number of miners
     * @return refinerCount Number of refiners
     * @return transporterCount Number of transporters
     * @return auditorCount Number of auditors
     * @return inspectorCount Number of inspectors
     * @return buyerCount Number of buyers
     */
    function getAllRoleCounts() public view returns (
        uint256 minerCount,
        uint256 refinerCount,
        uint256 transporterCount,
        uint256 auditorCount,
        uint256 inspectorCount,
        uint256 buyerCount
    ) {
        return (
            roleMemberCount[MINER_ROLE],
            roleMemberCount[REFINER_ROLE],
            roleMemberCount[TRANSPORTER_ROLE],
            roleMemberCount[AUDITOR_ROLE],
            roleMemberCount[INSPECTOR_ROLE],
            roleMemberCount[BUYER_ROLE]
        );
    }

    // ... (keep all your existing functions below this point) ...
    // Only modification needed is to ensure the _setupRole function also increments counters:
    function _setupRole(bytes32 role, address account) internal  {
        _grantRole(role, account);

        roleMemberCount[role]++;
    }

    /**
     * @dev Revokes role from an account - onlydmin
     * @param account The address of the account to be revoked role by the admin
     * @notice Emits event of the revoked role
     */

   
    /*/////////////////////////////////////////////////////
   ====================================================
            HELPER FUNCTIONS SECTION
   ====================================================
   /////////////////////////////////////////////////////*/

    /////////////////////////////////////////////////
    //////// ROLE OWNERSHIP CHECKS //////////////////
    /////////////////////////////////////////////////


/**
 * @dev Returns all roles assigned to a given address
 * @param account The address to check roles for
 * @return roles An array of role names the address has
 */
function getRolesForAddress(address account) public view onlyNonZeroAddress(account) returns (string[] memory roles) {
    // Count how many roles the address has
    uint256 roleCount = 0;
    
    if (hasRole(DEFAULT_ADMIN_ROLE, account)) roleCount++;
    if (hasRole(MINER_ROLE, account)) roleCount++;
    if (hasRole(REFINER_ROLE, account)) roleCount++;
    if (hasRole(TRANSPORTER_ROLE, account)) roleCount++;
    if (hasRole(AUDITOR_ROLE, account)) roleCount++;
    if (hasRole(INSPECTOR_ROLE, account)) roleCount++;
    if (hasRole(BUYER_ROLE, account)) roleCount++;

    // Initialize array with the counted size
    roles = new string[](roleCount);
    uint256 index = 0;

    // Populate the array with role names
    if (hasRole(DEFAULT_ADMIN_ROLE, account)) {
        roles[index] = "ADMIN";
        index++;
    }
    if (hasRole(MINER_ROLE, account)) {
        roles[index] = "MINER";
        index++;
    }
    if (hasRole(REFINER_ROLE, account)) {
        roles[index] = "REFINER";
        index++;
    }
    if (hasRole(TRANSPORTER_ROLE, account)) {
        roles[index] = "TRANSPORTER";
        index++;
    }
    if (hasRole(AUDITOR_ROLE, account)) {
        roles[index] = "AUDITOR";
        index++;
    }
    if (hasRole(INSPECTOR_ROLE, account)) {
        roles[index] = "INSPECTOR";
        index++;
    }
    if (hasRole(BUYER_ROLE, account)) {
        roles[index] = "BUYER";
        index++;
    }

    return roles;
}



    // function _setupRole(bytes32 role, address account) internal virtual {
    //     __grantRole(role, account);
    // }

    /**
     ** @dev Roles helper functions
     * @dev checks if an account has a specific role
     * @param account The address of the account to checked with role association
     */
    function hasMinerRole(address account) public view returns (bool) {
        return hasRole(MINER_ROLE, account);
    }
    function hasRefinerRole(address account) public view returns (bool) {
        return hasRole(REFINER_ROLE, account);
    }
    function hasTransporterRole(address account) public view returns (bool) {
        return hasRole(TRANSPORTER_ROLE, account);
    }
    function hasInspectorRole(address account) public view returns (bool) {
        return hasRole(INSPECTOR_ROLE, account);
    }
    function hasAuditorRole(address account) public view returns (bool) {
        return hasRole(AUDITOR_ROLE, account);
    }
    function hasBuyerRole(address account) public view returns (bool) {
        return hasRole(BUYER_ROLE, account);
    }
    function hasAdminRole(address account) public view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    // Helper function to validate the role
    function isValidRole(bytes32 role) private pure returns (bool) {
        return
            role == MINER_ROLE ||
            role == REFINER_ROLE ||
            role == TRANSPORTER_ROLE ||
            role == AUDITOR_ROLE ||
            role == INSPECTOR_ROLE ||
            role == BUYER_ROLE;
    }

    /**
    * @dev checks audit and inspection status
    * @param mineralId The ID of the mineral to check for audit and inspection status

    * Returns (isValid, isInspected) statuses of both audit and inspection of mineral according to mineralId
    */
    function checkAuditAndInspectionStatus(
        string memory mineralId
    ) public virtual restrictedToRole(DEFAULT_ADMIN_ROLE) returns (bool isAudited, bool isInspected) {
        if (
            keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
            bytes(mineralId).length == 0
        ) {
            revert RolesManager__InvalidMineralIdOrNotFound();
        }

        if (mineralDetails[mineralId].isAudited && mineralDetails[mineralId].isInspected) {
            emit MineralReadyToTrade(mineralId, msg.sender, "TradingReady", block.timestamp);
        } else {
            revert RolesManager__MineralNotMarketReady(mineralId);
        }

        isAudited = mineralDetails[mineralId].isAudited;
        isInspected = mineralDetails[mineralId].isInspected;

        return (isAudited, isInspected);
    }

    /*//////////////////////////////////////////////////////////////
                            GETTERS - For Traceability
    //////////////////////////////////////////////////////////////*/

    function getMineralHistory(string memory mineralId) public view virtual returns (MineralHistory[] memory) {
        if (
            keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId)) ||
            bytes(mineralId).length == 0
        ) {
            revert RolesManager__InvalidMineralIdOrNotFound();
        }

        return mineralHistories[mineralId];
    }

    /*///////////////////////////////////////////////////////////////
    ===============================================================
         MINERAL REGISTRATION HELPER FUNCTIONS SECTION
    ===============================================================
    ////////////////////////////////////////////////////////////////*/

    /**
     * @dev checks if a mineral with the given ID is registered
     * @param mineralId the ID of the mineral to check
     * @return A boolean indicating whether the mineral is registered or not
     */
    function isMineralRegistered(string memory mineralId) public  virtual returns (bool) {
        if (bytes(mineralId).length == 0) {
            revert MineralRegistry__InvalidMineralIdOrNotFound(mineralId);
        }

        if (keccak256(bytes(mineralDetails[mineralId].id)) != keccak256(bytes(mineralId))) {
            revert MineralRegistry__MineralNotRegistered(mineralId);
        }

        return true;
    }

    //////////////////////////////////////////////////////
    //////// GENERATE HASHED MINERALID FOR UNIQUENESS/////
    //////////////////////////////////////////////////////
    function _generateHashedMineralId(string memory mineralType) internal returns (string memory) {
        bytes32 fullHash = keccak256(abi.encodePacked(mineralType, msg.sender, block.timestamp, nonce++));

        // Convert first 4 bytes (8 hex characters) into hex string with "0x"
        bytes memory shortHex = new bytes(10); // 2 for "0x", 8 for hex chars
        shortHex[0] = "0";
        shortHex[1] = "x";
        for (uint i = 0; i < 4; i++) {
            shortHex[2 + i * 2] = _nibbleToHexChar(uint8(fullHash[i] >> 4));
            shortHex[3 + i * 2] = _nibbleToHexChar(uint8(fullHash[i] & 0x0f));
        }

        return string(abi.encodePacked(mineralType, "-", string(shortHex)));
    }

    // helper: convert nibble to hex char (0-9, a-f)
    function _nibbleToHexChar(uint8 nibble) internal pure returns (bytes1) {
        return nibble < 10 ? bytes1(nibble + 0x30) : bytes1(nibble + 0x61 - 10);
    }


    ///////////////////////////////////////////////
    //////// getting all registered minerals /////
    //////////////////////////////////////////////
    function getAllRegisteredMineral() public view returns(MineralDetails[] memory mineralDetails) {
        return mineralDetails;

    }
}