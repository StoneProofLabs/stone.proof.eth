// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Errors {

        /*//////////////////////////////////////////////////////////////
                        MINERALREGISTRY__CUSTOM ERRORS
        //////////////////////////////////////////////////////////////*/

    error MineralRegistry__MineralNotRegistered(uint256 mineralId);
    error MineralRegistry__MineralAlreadyPurchased();
    error MineralRegistry__MineralAlreadyAudited();
    error MineralRegistry__MineralAlreadyInspected();
    error MineralRegistry__MineralNotAudited();
    error MineralRegistry__MineralNotInspected();

    error MineralRegistry__InvalidMineralDetails();
    error MineralRegistry__InvalidMineralIdOrNotFound(uint256 mineralId);
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
    
    error MineralNotReadyToTrade(uint256 mineralId);


        /*//////////////////////////////////////////////////////////////
                            ROLESMANAGER__CUSTOM ERRORS
        //////////////////////////////////////////////////////////////*/
    error RolesManager__MineralAlreadyRefined(uint256 mineralId);
    error RolesManager__MineralAlreadyPurchased(uint256 mineralId);
    error RolesManager__MineralAlreadyInspected(uint256 mineralId);
    error RolesManager__MineralAlreadyAudited(uint256 mineralId);
    error RolesManager__NotTheAssignedBuyer(address caller);

    error RolesManager__InvalidMineralName();
    error RolesManager__InvalidMineralOrigin();
    error RolesManager__InvalidMineralDestination();

    error RolesManager__MineralNotMarketReady(uint256 mineralId);

    error RolesManager__InvalidMineralIdOrNotFound();
    error RolesManager__InvalidMineralType();
    error RolesManager__InvalidReceivingPartyAddress();
    error RolesManager__InvalidMineralStorageConditions();
    error RolesManager__InvalidMineralPurityPercentage();
    error RolesManager__MineralPurityPercentageTooLowToRegister(uint256 purityPercentage);
    error RolesManager__InvalidMineralWeight();

    error RolesManager__InvalidAddress();
    error RolesManager__InvalidRole();




        /*//////////////////////////////////////////////////////////////
                            DISPUTERESOLUTION__CUSTOM ERRORS
        //////////////////////////////////////////////////////////////*/
    error DisputeResolution__InvalidMineralIdOrNotFound();
    error DisputeResolution__InvalidDisputeDefendantAddress();
    error DisputeResolution__InvalidDisputeDetails();
    error DisputeResolution__InvalidDisputeEvidence();
    error DisputeResolution__InvalidDisputeIdOrNotFound();
    error DisputeResolution__InvalidResolutionDetails();
    error DisputeResolution__DisputeStatusNotPendingOrEscalated();
    error DisputeResolution__DisputeStatusNotPending(uint256 disputeId);
    error DisputeResolution__NotEligibleToVote(address caller);
    error DisputeResolution__AlreadyVoted(address caller);
    error DisputeResolution__DisputeEscalated_UnableToVote(uint256 disputeId);
    error DisputeResolution__VotingPeriodStillActive();
    error DisputeResolution__DisputeNotEscalated(uint256 disputeId);


        /*//////////////////////////////////////////////////////////////
                            MINERALWAREHOUSE__CUSTOM ERRORS
        //////////////////////////////////////////////////////////////*/

    error MineralWarehouse__InvalidTokenAddress(address tokenAddress);
    error MineralWarehouse__MineralNotRefined(uint256 mineralId);
    error MineralWarehouse__InvalidNumberOfPrices();
    error MineralWarehouse__UnacceptedToken(address tokenAddress);
    error MineralWarehouse__UnacceptedTokens(address[] tokenAddresses);
    error MineralWarehouse__MineralNotMarketReady(uint256 mineralId);
    error MineralWarehouse__InvalidMineralPrice();
    error MineralWarehouse__MineralAlreadySold(uint256 mineralId);
    error MineralWarehouse__UnauthorizedSeller(address seller);
    error MineralNotMarketReady(uint256 mineralId);
    error MineralWarehouse__IncorrectETHAmount();
    error MineralWarehouse__ETHTransferFailed();
    error MineralWarehouse__InvalidTokenPrice();
    
    error MineralWarehouse__MineralNotFoundInWarehouse(uint256 mineralId);


        /*//////////////////////////////////////////////////////////////
                            TOKENISATION__CUSTOM ERRORS
        //////////////////////////////////////////////////////////////*/

    error Tokenization__TokenAlreadyExists(uint256 tokenId);
    error Tokenization__TokenIsAlreadyMinted(uint256 tokenId);
    error Tokenization__InvalidTokenIdOrNotFound(uint256 tokenId);
    error Tokenization__CallerNotMineralTokenOwner(uint256 tokenId, address caller);
    error Tokenization__InvalidTokenId(uint256 tokenId);


        /*//////////////////////////////////////////////////////////////
                            TRANSACTIONlOG__CUSTOM ERRORS
       //////////////////////////////////////////////////////////////*/
    error TransactionLog__InvalidOperationType();
    error TransactionLog__InvalidOperationIndex(uint256 index);
    error TransactionLog__InvalidTransactionIdOrNotFound(uint256 transactionId);



        /*//////////////////////////////////////////////////////////////
                        SUPPLYCHAINVALIDATOR__CUSTOM ERRORS
        //////////////////////////////////////////////////////////////*/
    
    error SupplychainValidator__InvalidMineralIdOrNotFound(uint256 mineralId);
    error SupplychainValidator__InvalidMineralTransactionHistory();
    error SupplychainValidator__InvalidMineralOwnershipChain();


    /*//////////////////////////////////////////////////////////////
                             GLOBAL ERRORS
    //////////////////////////////////////////////////////////////*/
    error InvalidAccountAddress();
    error ERC20TokenTransferFailed(address token, uint256 tokenAmount);
    error InvalidPaymentMethods();
    error InvalidMineralIdOrNotFound(uint256 mineralId);
    error InsufficientPermissionsToPerformAction(address caller);
    
}