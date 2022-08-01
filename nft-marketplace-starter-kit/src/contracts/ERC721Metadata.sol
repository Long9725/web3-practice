// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721Metadata {
    string private _name;
    string private _symbol;

    constructor(string memory named, string memory symbolified) {
        _name = named;
        _symbol = symbolified;
    }

    /// @notice A descriptive name for a collection of NFTs in this contract
    function name() external view returns(string memory) {
        return _name;
    }

    /// @notice An abbreviated name for NFTs in this contract
    function symbol() external view returns(string memory) {
        return _symbol;
    }
}