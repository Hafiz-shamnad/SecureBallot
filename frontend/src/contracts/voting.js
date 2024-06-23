import web3 from '../web3/web3';
import Voting from './Voting.json';

const contractAddress = 'Adresss Place here'; // Replace with your deployed contract address
const voting = new web3.eth.Contract(Voting.abi, contractAddress);

export default voting;
