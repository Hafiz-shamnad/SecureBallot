import Web3 from 'web3';
import Voting from '../contracts/Voting.json'; // Adjust path as needed

const providerUrl = 'http://localhost:7545'; // Ganache URL or your network URL
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

const contractAddress = Voting.networks['5777'].address; // Replace with actual network ID and contract address
const votingContract = new web3.eth.Contract(Voting.abi, contractAddress);

// Example function to call a contract method
async function getVoteCount() {
  try {
    const result = await votingContract.methods.getVoteCount().call();
    console.log('Vote count:', result);
  } catch (error) {
    console.error('Error calling contract method:', error);
  }
}

getVoteCount(); // Example function call

export default web3;

