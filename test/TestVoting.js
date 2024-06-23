const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  it("should register a voter", async () => {
    const instance = await Voting.deployed();
    await instance.registerVoter(accounts[1], { from: accounts[0] });
    const voter = await instance.voters(accounts[1]);
    assert(voter.isRegistered, "Voter was not registered.");
  });

  it("should allow a registered voter to vote", async () => {
    const instance = await Voting.deployed();
    await instance.registerVoter(accounts[1], { from: accounts[0] });
    await instance.vote(0, { from: accounts[1] });
    const proposal = await instance.proposals(0);
    assert(proposal.voteCount.toNumber() === 1, "Vote count did not increase.");
  });
});
