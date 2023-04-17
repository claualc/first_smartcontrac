import { ethers, upgrades } from "hardhat"

// address of the proxy of first contract
const proxyAddress = "0x0ff4a7846b6ca69ea5c8fca748b6e9d7e1ba6837";

const main = async () => {
    const BoxV2 = await ethers.getContractFactory("BoxV2")

    console.log(`Smart Contract Box Proxy address: ${proxyAddress}`)
    const boxV2 = await upgrades.upgradeProxy(proxyAddress, BoxV2)
    console.log(`Smart Contract Box updated to BoxV2`)
    console.log(`BoxV2 address ${boxV2.address}`)

    console.log(await upgrades.erc1967.getImplementationAddress(boxV2.address)," getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(boxV2.address), " getAdminAddress")    
  }

try {
    main()
} catch(err) {
    console.log(err)
    process.exitCode = 1
}