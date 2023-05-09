import { ethers } from 'ethers'

async function sendTransaction() {
  // 创建Web3Provider实例
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // 请求用户授权
  await window.ethereum.enable();

  // 获取用户钱包
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  console.log("用户地址:", address);

  // 构建交易
  const tx = {
    to: "0x1234567890123456789012345678901234567890", // 接收地址
    value: ethers.utils.parseEther("0.1"), // 转账金额
  }

  // 发送交易
  const txResponse = await signer.sendTransaction(tx);

  console.log("交易已发送，交易哈希:", txResponse.hash);
}


