# ScrapFrontier

## Getting Started

### Requirements
- **Node.js**: Version 18.18.1 or higher
- **MongoDB**: Version 5.0.2 or higher

## Project Structure

### Monorepo Setup
The project is organized as a monorepo using **Turborepo**, combining the following projects:

1. **frontend-clent** - React.js + Tailwind CSS
2. **backend** - Node.js
3. **frontend-admin** - React.js + Tailwind CSS
4. **contracts** - Solidity smart contract

Turborepo helps manage all these projects within a single repository for easier dependency management and consistency.

### frontend-client
The frontend is a React project using version 18. Below are the key modules:

- **React**: 18
- **Wagmi**: 2.5.7
- **@wagmi/core**: 2.8.0
- **@web3modal/wagmi**: 4.0.5
- **Web3**: 4.5.0
- **Viem**: 2.7.10
- **Axios**: 1.6.7
- **SWR**: 2.2.5

#### Installation
To install the project dependencies, run:
```sh
npm install
```
or
```sh
yarn install
```

#### Running the Project
To start the project in development mode, run:
```sh
npm run start
```
or
```sh
yarn start
```

#### Building the Project
To create a production build, run:
```sh
npm run build
```
or
```sh
yarn build
```

### backend
The backend is an Express project. Key modules include:

- **Express**: 4.15.2
- **Passport**: 0.3.2
- **Steamcommunity**: 3.31.0
- **Mongoose**: 6.6.5

#### Installation
To install the backend dependencies, run:
```sh
npm install
```
or
```sh
yarn install
```

#### Running the Backend
To start the backend server, run:
```sh
npm run start
```
or
```sh
yarn start
```

### frontend-admin
The admin panel is a React project using version 18. Key modules include:

- **React**: 18.2.0
- **Axios**: 1.6.7

#### Installation
To install the admin dependencies, run:
```sh
npm install
```
or
```sh
yarn install
```

#### Running the Admin
To start the admin panel, run:
```sh
npm run start
```
or
```sh
yarn start
```

### contracts
The smart contract is written in **Solidity** and is used for managing on-chain operations.

#### Installation
To install dependencies for working with the smart contract, run:
```sh
npm install
```
or
```sh
yarn install
```

#### Deployment
To deploy the smart contract, use the following command:
```sh
npm run deploy
```
or
```sh
yarn deploy
```

### MongoDB
To set up the database:

1. **Install MongoDB**
2. **Run MongoDB Service** on port `27017`

## Figures
- **Figure 1**: ScrapFrontier Frontend
- **Figure 2**: ScrapFrontier Backend
- **Figure 3**: ScrapFrontier Admin
