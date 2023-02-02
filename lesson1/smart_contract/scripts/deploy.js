// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  const SimplyTokenFactory = await hre.ethers.getContractFactory("SimpleToken");
  const simplyToken = await SimplyTokenFactory.deploy('SIM TOKEN', 'SIM');

  console.log(`合约地址: ${simplyToken.address}`);
  console.log("部署合约的交易详情")
  console.log(simplyToken.deployTransaction)
  console.log("\n等待合约部署上链")

  await simplyToken.deployed();

  console.log("合约已上链")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// 0x9e5F1D89BD0bfc019EefA9e7fFca49D3B5E1305A