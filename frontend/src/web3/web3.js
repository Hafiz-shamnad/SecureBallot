import Web3 from 'web3';
import Voting from '../contracts/Voting.json'; // Adjust path as needed

const providerUrl = 'http://localhost:7545'; // Ensure this is correct
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

const getVotingContract = async () => {
  try {
    const networkId = await web3.eth.net.getId(); // Dynamically get the network ID
    const contractAddress = Voting.networks[networkId]?.address; // Get contract address from the network ID
    if (!contractAddress) {
      throw new Error(`Contract not deployed on network with ID ${networkId}`);
    }
    return new web3.eth.Contract(Voting.abi, contractAddress);
  } catch (error) {
    console.error('Error getting contract:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

// Export the web3 instance and the function to get the contract instance
export { web3, getVotingContract };
