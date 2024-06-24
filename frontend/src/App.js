import React, { useEffect, useState } from 'react';
import { web3, getVotingContract } from './web3/web3';

const App = () => {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [votingContract, setVotingContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        console.log('Accounts:', accounts);
        setAccounts(accounts);

        const votingInstance = await getVotingContract();
        setVotingContract(votingInstance);

        const proposals = await votingInstance.methods.getProposals().call();
        console.log('Proposals:', proposals);
        setProposals(proposals);
      } catch (error) {
        console.error('Error initializing app:', error);
        alert('Failed to connect to the blockchain. Please make sure Ganache is running and try again.');
      }
    };

    init();
  }, []);

  const handleVote = async () => {
    if (selectedProposal !== null && votingContract) {
      try {
        await votingContract.methods.vote(selectedProposal).send({ from: accounts[0] });
        alert('Vote cast successfully!');
        // Refresh proposals after voting
        const updatedProposals = await votingContract.methods.getProposals().call();
        setProposals(updatedProposals);
      } catch (error) {
        console.error('Error voting:', error);
        alert('Failed to cast vote. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>BlockVote</h1>
      <h2>Proposals</h2>
      <ul>
        {proposals.map((proposal, index) => (
          <li key={index}>
            {proposal.name} - {proposal.voteCount} votes
            <button onClick={() => setSelectedProposal(index)}>Vote</button>
          </li>
        ))}
      </ul>
      <button onClick={handleVote} disabled={selectedProposal === null}>
        Submit Vote
      </button>
    </div>
  );
};

export default App;
