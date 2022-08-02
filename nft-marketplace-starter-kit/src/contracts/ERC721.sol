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
    mapping(uint256 => address) private _tokenApprovals;

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

    function _transferFrom(address from, address to, uint256 tokenId) internal {
        require(from != address(0x0), "ERC721: transfer to the zero address");
        require(ownerOf(tokenId) == from, "ERC721: You are not the owner");

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to] += 1;
        _ownedTokensCount[from] -= 1;

        emit Transfer(from, to, tokenId);
    }

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
    function ownerOf(uint256 _tokenId) public view returns (address) {
        require(_exists(_tokenId), "ERC721: token is not minted");

        address owner = _tokenOwner[_tokenId];
        return owner;
    }

    // @notice Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
    ///  TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE
    ///  THEY MAY BE PERMANENTLY LOST
    /// @dev Throws unless `msg.sender` is the current owner, an authorized
    ///  operator, or the approved address for this NFT. Throws if `_from` is
    ///  not the current owner. Throws if `_to` is the zero address. Throws if
    ///  `_tokenId` is not a valid NFT.
    /// @param _from The current owner of the NFT
    /// @param _to The new owner
    /// @param _tokenId The NFT to transfer
    function transferFrom(address _from, address _to, uint256 _tokenId) public {
        _transferFrom(_from, _to, _tokenId);
    }
}