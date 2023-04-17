// test/1.Box.test.ts
import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"

/**
 * TESTING THE STORE FUNCTION IN THE BOX SMART CONTRACT
 */

describe("Box", () => {
  let box:Contract;

  beforeEach(async () => {
    const Box = await ethers.getContractFactory("Box")
    box = await Box.deploy()
    await box.deployed()
  })

  it("should retrieve value previously stored", async () => {
    await box.store(42)
    expect(await box.retrieve()).to.equal(BigNumber.from('42'))

    // user interaction with the actual contract
    await box.store(100)
    expect(await box.retrieve()).to.equal(BigNumber.from('100'))
  })
})