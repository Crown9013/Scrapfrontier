//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TestScrapToken is ERC20 {
    constructor() ERC20("Test Scrap Token", "tScrapToken") {
        _mint(msg.sender, 10000000000000 ether);
    }
}