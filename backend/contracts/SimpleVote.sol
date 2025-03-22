//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleVote {

    address public owner;
    uint256 public nextVoteID = 0;
    mapping(uint256 => Vote) public votes;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event VoteCreated(uint256 voteId, string election, uint256 deadline);
    event Voted(uint256 voteId, address voter, bool choice);
    event VoteClosed(uint256 voteId);

    enum VoteState {
        ACTIVE,
        CLOSED,
        PAUSED
    }

    struct Vote {
        uint id;
        address owner;
        string election;
        uint256 votesYes;
        uint256 votesNo;
        VoteState state;
        uint256 deadline;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    } 

    constructor() {
        owner = msg.sender;
    }

    function createVote(string memory _election, uint256 _durationInDays) public {
        Vote memory vote_instance = Vote(
            nextVoteID,
            msg.sender,
            _election, 
            0,
            0,
            VoteState.ACTIVE,
            block.timestamp + (_durationInDays * 1 days)
        );
        votes[nextVoteID] = vote_instance;
        nextVoteID++;
        emit VoteCreated(nextVoteID, _election, block.timestamp + (_durationInDays * 1 days));
    }

    function vote(uint _voteId, bool _choice) public {
        require(votes[_voteId].state == VoteState.ACTIVE, "Sorry, the vote is closed!");
        require(hasVoted[_voteId][msg.sender] == false, "Sorry, You have already voted!");
        _choice ? votes[_voteId].votesYes += 1 : votes[_voteId].votesNo += 1;
        hasVoted[_voteId][msg.sender] = true;
        emit Voted(_voteId, msg.sender, _choice);
    }

    function checkUpdateVoteActive(uint _voteId) public returns (bool) {
        if(votes[_voteId].deadline <= block.timestamp) {
            votes[_voteId].state = VoteState.CLOSED;
            return false;
        } else {
            return true;
        }
    }

    function getVote(uint _voteId) public view returns (Vote memory) {
        return votes[_voteId];
    }

}