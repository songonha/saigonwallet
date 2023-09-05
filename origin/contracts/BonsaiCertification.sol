// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BonsaiCertification {
    string public bonsaiInfo;

    function updateBonsaiInfo(string memory newInfo) public {
        bonsaiInfo = newInfo;
    }
}
