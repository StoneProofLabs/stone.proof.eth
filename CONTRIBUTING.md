# Contributing to StoneProof

Thank you for considering contributing to StoneProof. Your involvement helps us build a transparent, secure, and decentralized future for mineral supply chain verification.

Please follow the guidelines below to ensure a smooth and productive collaboration.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Development Standards](#development-standards)
- [Smart Contract Guidelines](#smart-contract-guidelines)
- [Frontend Contribution](#frontend-contribution)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Security Policy](#security-policy)
- [Thank You](#thank-you)

---

## Code of Conduct

By participating in this project, you agree to follow our [Code of Conduct](./CODE_OF_CODUCT.md), which fosters a respectful, inclusive, and harassment-free environment.

---

## Getting Started

1. **Fork** the repository  
2. Clone your fork:
```sh
   git clone https://github.com/YOUR_USERNAME/stone.proof.eth.git
   cd stone.proof.eth
```
3. Install dependencies:
```sh
   yarn install
```
4. Set up your .env file for environment variables  

5. Run the development server:
```sh
   yarn start
```
*Ensure your wallet is connected and configured for the Base L2 network.*
---

## Project Structure

packages/hardhat/contracts/
  `core/`                Access control, validation, privacy
  `governance/`          Dispute resolution logic
  `interfaces/`          Smart contract interface definitions
  `logs/`                Blockchain event logging
  `modules/`             Registry, logistics, warehouse modules
  `tokens/`              ERC721 token minting logic
  `utils/`               Shared data types, events, and errors

packages/nextjs/
  `app/`                 Next.js 14 app directory (App Router)
  `components/`          UI components with Tailwind + Shadcn
  `hooks/`               Web3 and custom Wagmi hooks
  `config/`              Constants, networks, chains, wallet setup

---

## How to Contribute

### Good First Issues

- Improve UI accessibility  

- Refactor frontend for clarity and consistency  

- Write unit tests for contracts  

- Add documentation and comments  

### Advanced Contributions

- Extend modular contract logic  

- Optimize gas usage  

- Add multisig logic or DAO governance hooks  

- Improve on-chain validation flow and events  

---

## Development Standards

- Linting: yarn lint  

- Formatting: Prettier (yarn format)  

- Commit messages: Use semantic commit messages:
  feat: add warehouse inventory verification
  fix: resolve tokenURI fetch issue
  chore: update walletconnect version

- Testing: Use Hardhat and Chai:
  yarn hardhat test

---

## Smart Contract Guidelines

- Use Solidity `^0.8.20` 

- Use OpenZeppelin libraries for security  

- Emit events on all critical state changes  

- Reuse errors from `Errors.sol`  

- Define shared types in `DataTypes.sol`  

- Interface-first development encouraged (interfaces/ folder)  

---

## Frontend Contribution

- Next.js 14 with App Router  

- Wagmi, Viem, WalletConnect for Web3 integration  

- Tailwind CSS and Shadcn/UI for UI components  

- Each portal validates role access on wallet connection  

- Maintain modular, reusable, accessible UI  

---

## Submitting a Pull Request

1. Fork the repository  
2. Create a feature branch:
   git checkout -b feat/your-feature-name

3. Commit using conventional commits  
4. Push to your fork and open a Pull Request  
5. Describe the change and link related issues if any  

---

## Security Policy

To report vulnerabilities, please use one of the following:

- Open a GitHub security advisory  
- Contact the core maintainers privately via email  

---

## Thank You

Your contributions, whether large or small, are appreciated. Let’s build the future of supply chain verification together with StoneProof.

The universal email we use currently is, <stone.prooflabs@gmail.com>

_**StoneProofLabs**_