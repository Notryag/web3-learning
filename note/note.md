# 项目初始化

记录初始化过程和所需依赖常用api

## hardhat

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

## 添加web3相关依赖

```shell
npm install @rainbow-me/rainbowkit wagmi ethers@5
```

### rainbow

rainbow 需要添加provider

```js
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <YourApp />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
```

链接按钮
```jsx
import { ConnectButton } from '@rainbow-me/rainbowkit';
export const YourApp = () => {
  return <ConnectButton />;
};
```

接下来就可以连接到钱包,可以做接下来的工作了

## prisma -> 数据库相关

>  添加prisma ---下一代 nodejs 和 ts的orm 

```shell
npm install prisma --save-dev

npx prisma init --datasource-provider sqlite
# 创建数据库表
npx prisma migrate dev --name init
```

todo: 可以提一个issue!

> 要用npm,之前用`pnpm`一直报错

接下来就可以使用`prisma`了,搭配next使用更香

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

```shell
# 生成数据库,根据prisma文件, 不生成变更和migrate不同的地方
prisma db push
# prisma studio查看数据库 可以不指定port
prisma studio --port 7777

```


## truffle

简单使用truffle

```shell
# 初始化truffle 可以
truffle init 
# 编译
truffle compile
# 本地开发环境
truffle development
# 部署到环境
truffle migrate
```
至此合约已经部署到本地测试环境了

```shell
# 创建文件
truffle create contract contract_name
truffle create test test_name


```

compile之后可以在terminal中执行代码例如
```js
let instance = await NWFT.deployed()

instance.hello()
```

