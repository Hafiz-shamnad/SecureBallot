import web3 from '../web3/web3';
import Voting from './Voting.json';

const contractAddress = '0x25bbC9BfF13FAC0ba3E3A78060aCCB2F2afE22a4'; // Replace with your deployed contract address
const voting = new web3.eth.Contract(Voting.abi, contractAddress);

export default voting;
