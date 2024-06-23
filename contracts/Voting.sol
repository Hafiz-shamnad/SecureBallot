// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Voter {
        bool voted;
        uint vote;
        bool isRegistered;
    }

    struct Proposal {
        string name;
        uint voteCount;
    }

    address public admin;
    mapping(address => Voter) public voters;
    Proposal[] public proposals;

    constructor(string[] memory proposalNames) {
        admin = msg.sender;
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function.");
        _;
    }

    function registerVoter(address voter) public onlyAdmin {
        require(!voters[voter].isRegistered, "Voter is already registered.");
        voters[voter].isRegistered = true;
    }

    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.isRegistered, "Voter is not registered.");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;
        proposals[proposal].voteCount += 1;
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    function getWinner() public view returns (uint winnerProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winnerProposal_ = p;
            }
        }
    }
}
