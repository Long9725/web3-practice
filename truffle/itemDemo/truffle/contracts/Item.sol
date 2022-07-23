pragma solidity ^0.8.14;

import './ItemManager.sol';

contract Item {
    uint public priceInWei;
    uint public pricePaid;
    uint public index;

    ItemManager parentContract;

    constructor(ItemManager _parentContract, uint _priceInWei, uint _index) {
        priceInWei = _priceInWei;
        index = _index;
        parentContract = _parentContract;
    }

    receive() external payable {
        /*
            address(parentContract).transfer(msg.value);

            위 코드는 ItemManager에서 어떤 아이템에 대한 돈을 보냈는지 알 수 없다.
        */
        require(pricePaid == 0, "Items is paid already");
        require(priceInWei == msg.value, "Only full payments allowed");
        pricePaid += msg.value;
        /*
            더 많은 가스를 얻기 위해서 저수준 함수를 사용하지만, 예외가 발생하더라도 문제를 발생시키지 않기 때문에 조심해야 한다.
            밑 코드의 원형은 (bool, returns of SignatureFunction) = address(address).call.value(value)(abi.encodeWithSignature(signature, parameters));
            인 것 같다.
        */
        (bool success, ) = address(parentContract).call{value: msg.value}(abi.encodeWithSignature("triggerPayment(uint256)", index));
        require(success, "The transaction wasn't successful, canceling");
    }

    fallback() external {

    }
}