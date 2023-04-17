// test/1.Box.test.ts
import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"

/**
 * TESTING ADDED FUNTION TO SMART CONTRACT BOXV2
 */
describe("Box", () => {
  let boxV2:Contract;

  beforeEach(async () => {
    // DEPLOY CONTRACT
    const Box = await ethers.getContractFactory("BoxV2")
    boxV2 = await Box.deploy()
    await boxV2.deployed()
  })

  it("should retrieve value previously stored", async () => {
    await boxV2.store(42)
    expect(await boxV2.retrieve()).to.equal(BigNumber.from('42'))

    // user interaction with the actual contract
    await boxV2.store(100)
    expect(await boxV2.retrieve()).to.equal(BigNumber.from('100'))
  })

  it("increment function by 1", async () => {
    await boxV2.store(12)
    await boxV2.increment()
    expect(await boxV2.retrieve()).to.equal(BigNumber.from('13'))
  })
})