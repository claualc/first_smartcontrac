import { expect } from "chai";
import { BigNumber, Contract } from "ethers"
import { ethers, upgrades } from "hardhat";


describe("Box (proxy) V2", () => {
    let box: Contract;
    let boxV2: Contract;

    beforeEach(async () => {
        const Box = await ethers.getContractFactory("Box")
        const BoxV2 = await ethers.getContractFactory("BoxV2")
        box = await upgrades.deployProxy(Box, [12], {initializer: 'store'})
        // update the contract
        boxV2 = await upgrades.upgradeProxy(box.address, BoxV2)
    })


    it("should retrieve value previously stored and incremented correctly", async () => {
        expect(await boxV2.retrieve()).to.equal(BigNumber.from('12'))

        await boxV2.increment()
        expect(await boxV2.retrieve()).to.equal(BigNumber.from('13'))

        await boxV2.store(100)
        expect(await boxV2.retrieve()).to.equal(BigNumber.from('100'))
    })
})