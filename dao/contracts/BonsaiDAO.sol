// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BonsaiDAO {
    address public owner;
    uint256 public quorum;
    uint256 public totalVotes;
    mapping(address => bool) public members;
    mapping(uint256 => bool) public proposals;

    event ProposalCreated(uint256 proposalId);

    constructor(uint256 _quorum) {
        owner = msg.sender;
        quorum = _quorum;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyMember() {
        require(members[msg.sender], "Only members can call this function");
        _;
    }

    function addMember(address member) public onlyOwner {
        members[member] = true;
    }

    function removeMember(address member) public onlyOwner {
        members[member] = false;
    }

    function createProposal(uint256 proposalId) public onlyMember {
        require(!proposals[proposalId], "Proposal with this ID already exists");
        proposals[proposalId] = true;
        totalVotes++;
        emit ProposalCreated(proposalId);
    }
}



