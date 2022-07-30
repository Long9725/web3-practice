// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';
contract Kryptobird is ERC721Connector {
    
    // array to store our nfts
    string [] public kryptoBirdz;

    mapping(string => bool) _kryptoBirdzExists;

    function mint(string memory _kryptoBird) public {
        // this is deprecated on ^0.6.0 - uint256 _id = KryptoBirdz.push(_KryptoBird);
        // .push no longer returns the length but a ref the added element
        require(!_kryptoBirdzExists[_kryptoBird], "Error - kryptoBird already exists");

        kryptoBirdz.push(_kryptoBird);
        uint _id = kryptoBirdz.length - 1;

        _mint(msg.sender, _id);

        _kryptoBirdzExists[_kryptoBird] = true;
    }

    constructor() ERC721Connector('Kryptobird', 'KBIRDZ') {

    }
}