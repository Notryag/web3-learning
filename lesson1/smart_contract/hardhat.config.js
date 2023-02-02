require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/woWaq-YPXCvxPBysIvYsfPNynqfSWmLa',
      accounts: ['bb53deb94b5137e4e2222b9cacace53d67a617e6fa353d8fc038045b93a7ce39'],
    },
  },
};
