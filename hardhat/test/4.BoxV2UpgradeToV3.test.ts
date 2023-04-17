import { expect } from "chai"
import { BigNumber, Contract } from "ethers"
import { ethers, upgrades } from "hardhat"

describe("Box (proxy)", async () => {
    /**
    * TEST BOXV3 UPDATE AND NEW VARIABLE
    */
   
    let boxV2: Contract
    let boxV3: Contract

    beforeEach(async () => {
        const BoxV2 = await ethers.getContractFactory("BoxV2")
        const BoxV3 = await ethers.getContractFactory("BoxV3")
        boxV2 = await upgrades.deployProxy(BoxV2, [12], {initializer: 'store'})
        boxV3 = await upgrades.upgradeProxy(boxV2.address, BoxV3)
    })

    it("upgrade boxV2 to boxV3 and value maintains", async () => {
        expect(await boxV2.retrieve()).to.equal(BigNumber.from('12'))
        await boxV3.increment()
        expect(await boxV2.retrieve()).to.equal(BigNumber.from('13'))

        await boxV2.store(100)
        expect(await boxV2.retrieve()).to.equal(BigNumber.from('100'))
    })


    it("boxV3 name variable updated", async () => {
        const teste = "teste"
        await boxV3.setName(teste)
        expect(await boxV3.name()).to.equal(teste)

    })
})