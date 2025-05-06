// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MineralID {

uint256 private nonce = 1;

function _generateHashedMineralId(string memory mineralType) internal returns (string memory) {
    bytes32 fullHash = keccak256(
        abi.encodePacked(mineralType, msg.sender, block.timestamp, nonce++)
    );

    // Convert hash to 8-character hex string
    bytes memory hashBytes = new bytes(8);
    for (uint i = 0; i < 8; i++) {
        uint8 nibble = uint8(fullHash[i]) & 0x0f;
        hashBytes[i] = _nibbleToHexChar(nibble);
    }

    return string(abi.encodePacked(mineralType, "-", string(hashBytes)));
}

// helper: convert nibble to hex char (0-9, a-f)
function _nibbleToHexChar(uint8 nibble) internal pure returns (bytes1) {
    return nibble < 10 ? bytes1(nibble + 0x30) : bytes1(nibble + 0x61 - 10);
}

}