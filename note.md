# hardhat

## 初始化

```shell
npm init
npm install hardhat
# 帮我们创建项目模板
# 选择创建ts project
npx hardhat
# 获取hardhat帮助
npx hardhat help
# 编译合约
npx hardhat compile
# 部署
npx hardhat deploy script/deploy.ts
# 本地启动一个区块链网络 并提供一个服务节点
# 服务节点默认的jsonrpc的地址是http://127.0.0.1:8545
# 同时在控制台输出20个以太坊钱包地址和私钥, 每个包含1万个ETH用于测试
npx hardhat node
```

