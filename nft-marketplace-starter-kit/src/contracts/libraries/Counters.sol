// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './SafeMath.sol';

library Counters {
    using SafeMath for uint256;

    struct Counter {
        uint256 _value;
    }

    // memory keyword를 사용하면 함수가 끝날 때 메모리를 모두 지워버린다.
    // storage keyword를 사용하면 storage의 memory를 Counter에 계속해서 보관한다.
    function current(Counter storage counter) internal view returns(uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        counter._value = counter._value.add(1);
    }
    
    function decrement(Counter storage counter) internal {
        counter._value = counter._value.sub(1);
    }
}

