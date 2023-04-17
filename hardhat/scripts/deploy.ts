import { ethers, upgrades } from "hardhat"


const main = async () => {

  /**
   * EXAMPLE OF NORMAL CONTRACT
   * const Box = await ethers.getContractFactory("Box")
   * const box = await Box.deploy("Hello, Hardhat!")
   */

  const boxFactory = await ethers.getContractFactory("Box")
  console.log(">>Deploying Box contract...")
  /* Deploy upgradeable contract
  *   1. an implementation contract is deployed
  *   2. ProxyAdmin upgrade() is called to link Proxy and implementation contract.
  */
  const boxDeploy = await upgrades.deployProxy(boxFactory, [12], {initializer: 'store'})
  console.log(`>>Box deployed address ${boxDeploy.address}`)

  console.log(await upgrades.erc1967.getImplementationAddress(boxDeploy.address)," getImplementationAddress")
  console.log(await upgrades.erc1967.getAdminAddress(boxDeploy.address)," getAdminAddress")   
}

try{
  main()
} catch(error) {
  console.log(error)
  process.exitCode = 1
}