import { ethers, upgrades } from "hardhat"

const proxyAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"
const main = async () => {
    const BoxV4 = await ethers.getContractFactory("BoxV4")

    // deploy new implementation contract without linking it to the proxy
    const boxV4Address = await upgrades.prepareUpgrade(proxyAddress, BoxV4)

    // deployed contract and proxy address are not linked
    console.log(boxV4Address, " BoxV4 implementation contract address")
    console.log(proxyAddress, " Proxy contract address")
}

try {
    main()
} catch(error) {
    console.log(error)
    process.exitCode = 7
}