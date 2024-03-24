# RentChain
Welcome to our groundbreaking project, a decentralized application (dApp) designed to facilitate the creation and interaction of rental contracts through smart contracts. Leveraging the power of blockchain technology, our platform offers users a secure, transparent, and efficient way to engage in rental agreements.

Built upon Scaffold-ETH 2 framework, our dApp brings together cutting-edge development tools and decentralized infrastructure to ensure a seamless user experience. By harnessing the capabilities of smart contracts, users can establish rental agreements with predefined terms and conditions, eliminating the need for intermediaries and enhancing trust between parties.

Furthermore, our dApp has been deployed on the Scroll Sepolia network, a robust blockchain network known for its scalability and reliability. This deployment ensures that users can access our platform with confidence, knowing that their transactions are executed swiftly and securely on a decentralized network.

With our dApp, we aim to revolutionize the rental industry by providing a decentralized solution that empowers users to manage their rental agreements autonomously and securely. Join us as we embark on this journey towards a future of decentralized renting.

[Link to scroll-etherscan](https://sepolia.scrollscan.com/address/0xBaA33BaAA82C9F6061F4d273295Ad60c568BE1DC#code)

Contract Address: 0xBaA33BaAA82C9F6061F4d273295Ad60c568BE1DC

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To run our dApp locally, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/polichain/hackathon-eth-samba.git
hackathon-eth-samba
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Access the app on: `http://localhost:3000`. 
