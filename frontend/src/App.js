import React, { useEffect, useState } from 'react';
import web3 from './web3/web3';
import voting from './contracts/voting';

const App = () => {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState('');
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const init = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);

      const proposals = await voting.methods.getProposals().call();
      setProposals(proposals);
    };

    init();
  }, []);

  const handleVote = async () => {
    await voting.methods.vote(selectedProposal).send({ from: accounts[0] });
    alert('Vote cast successfully!');
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
      <button onClick={handleVote} disabled={selectedProposal === ''}>
        Submit Vote
      </button>
    </div>
  );
};

export default App;
