import { ethers, upgrades } from "hardhat"


const main = async () => {
    const BoxV2 = await ethers.getContractFactory("BoxV2")
    const BoxV3 = await ethers.getContractFactory("BoxV3")

    const box = await upgrades.deployProxy(BoxV2, [12], { initializer: 'store'})
    console.log("Smart Contract BoxV2 deployed >> address", box.address)
    console.log("getImplementationAddress",await upgrades.erc1967.getImplementationAddress(box.address))
    console.log("getAdminAddress",await upgrades.erc1967.getAdminAddress(box.address))   
    
    const boxUpgrade = await upgrades.upgradeProxy(box.address, BoxV3)
    console.log("Smart Contract BoxV2 upgrated to BoxV3 >> address", boxUpgrade.address)
    console.log("getImplementationAddress",await upgrades.erc1967.getImplementationAddress(boxUpgrade.address))
    console.log("getAdminAddress",await upgrades.erc1967.getAdminAddress(boxUpgrade.address))   

    console.log("\n\n>> The implementation address CHANGES, but the adm address and proxy addres are maintained")
    
}

try {
    main()
} catch(error) {
    console.log(error)
    process.exitCode = 7
}