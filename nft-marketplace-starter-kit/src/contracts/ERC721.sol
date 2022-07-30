// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Metadata.sol';

/*
    minting 함수를 만드는 데 고려할 것
        a. nft가 한 address를 향해야 한다.
        b. token ids를 기록해야 한다.
        c. token ids에 대한 token owner의 address를 기록해야 한다.
        d. owner address는 얼마나 많은 양의 token을 가질 수 있는지 기록해야 한다.
        e. transfer log를 기록하고 event로 알려줘야 한다.
*/

contract ERC721 {

    event Transfer(address from, address to, uint256 tokenId);
    mapping(uint256 => address) private _tokenOwner;

    mapping(address => uint256) private _ownedTokensCount;
    
    function _exists(uint256 tokenId) internal view returns(bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0x0);
    }

    function _mint(address to, uint256 tokenId) internal {
        require(to != address(0x0), "ERC721: minting to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to] += 1;
        
        emit Transfer(msg.sender, to, tokenId);
    }
}