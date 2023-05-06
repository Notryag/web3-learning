# web3-learning
web3-learning

# ALL IN WEB3

希望web3是新的起点

web3学习例子


智能合约
+ 自动执行的合同
+ 以太坊账号
+ Solidity 代码

特性:
 + 分布式
 + 确定性
 + 自主性
 + 不变性
 + 多样性
 + 去信任化
 + 透明性

## hardhat框架

开发 编译 测试 部署


```bash

npm i hardhat

npx hardhat
# 编译
npx hardhat compile
# clean
npx hardhat clean

npx hardhat run script/deploy.ts
# 启动一个区块链网络 服务节点默认的json-rpc地址是http://127.0.0.1:8545  同时生成账号
npx hardhat node

```


## ethersjs 基础使用

核心的逻辑都是存放在区块链和智能合约中的

1. 连接以太坊节点
2. 连接钱包
3. 连接智能合约

ethers内部分布不同的模块
体积小
ethers对ts支持很好

### provider
提供者

符合`EIP 1193`规范的js对象

用来连接以太坊的客户端,与区块链交互的桥梁

ethers内置了一些默认的rpc, 但是在生产中不能使用这些服务, 因为他们不保证安全性和稳定性, 我们也不会维护一个以太坊节点

节点服务: `alchemy` `infura` 都会提供一定的免费额度



