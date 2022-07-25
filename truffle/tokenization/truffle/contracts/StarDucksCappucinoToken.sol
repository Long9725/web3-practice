// contracts/MyToken.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StarDucksCappucinoToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    address public thisMinter;

    constructor(address minter, address burner) ERC20("StarDucksCappucinoToken", "CAPPU") public {
        _setupRole(MINTER_ROLE, minter);
        _setupRole(BURNER_ROLE, burner);

        thisMinter = minter;
    }

    function mint(address to, uint256 amount) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public {
        require(hasRole(BURNER_ROLE, msg.sender), "Caller is not a burner");
        _burn(from, amount);
    }

    function getMinter() public view returns(address) {
        return thisMinter;
    }
}