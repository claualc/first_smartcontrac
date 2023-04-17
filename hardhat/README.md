# Test Hardhat Project: Upgrade and Deployment of Proxy Pattern

First run a ganache local network:

```shell
ganache
```

On a second shell:

1. To test scripts:

```shell
yarn hardhat test
```

or

```shell
yarn hardhat test test/<test>.test.ts
```

2. To deploy or upgrade implementation contracts contract:

```shell
yarn hardhat --network localhost run scripts/<script>.ts
```