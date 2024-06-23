const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = 'your mnemonic here'; // Replace with your MetaMask seed phrase

module.exports = {
  networks: {
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID`),
      network_id: 3,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
