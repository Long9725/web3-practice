// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Metadata.sol';

/// @title ERC-721 Non-Fungible Token Standard
/// @dev See https://eips.ethereum.org/EIPS/eip-721
///  Note: the ERC-165 identifier for this interface is 0x80ac58cd.
contract ERC721 {

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    mapping(uint256 => address) private _tokenOwner;

    mapping(address => uint256) private _ownedTokensCount;

    /// @notice Count all NFTs assigned to an owner
    /// @dev NFTs assigned to the zero address are considered invalid, and this
    ///  function throws for queries about the zero address.
    /// @param _owner An address for whom to query the balance
    /// @return The number of NFTs owned by `_owner`, possibly zero
    function balanceOf(address _owner) public view returns (uint256) {
        require(_owner != address(0x0), "ERC721: owner query for non-existent token");

        uint256 balanceOfOwner = _ownedTokensCount[_owner];
        return balanceOfOwner;
    }

    /// @notice Find the owner of an NFT
    /// @dev NFTs assigned to zero address are considered invalid, and queries
    ///  about them do throw.
    /// @param _tokenId The identifier for an NFT
    /// @return The address of the owner of the NFT
    function ownerOf(uint256 _tokenId) external view returns (address) {
        require(!_exists(_tokenId), "ERC721: token already minted");

        address owner = _tokenOwner[_tokenId];
        return owner;
    }

    function _exists(uint256 tokenId) internal view returns(bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0x0);
    }

    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0x0), "ERC721: minting to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to] += 1;
        
        emit Transfer(msg.sender, to, tokenId);
    }
}