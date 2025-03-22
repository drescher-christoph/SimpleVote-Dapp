const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleVote", function () {
    async function deploySetup() {
        const [owner, otherAccount] = await ethers.getSigners();

        const SimpleVoteFactory = await ethers.getContractFactory("SimpleVote");
        const SimpleVote = await SimpleVoteFactory.deploy();

        return {SimpleVote, owner, otherAccount};
    }

    describe("Deployment", function () {
        it("Should set the contract owner to msg.sender", async function () {
            const { SimpleVote, owner } = await loadFixture(deploySetup);

            expect(await SimpleVote.owner()).to.equal(owner.address);
        });

        it("Should create a new vote", async function () {
            const { SimpleVote } = await loadFixture(deploySetup);

            await SimpleVote.createVote("Coke is better than Pepsi", 7);

            expect(await SimpleVote.nextVoteID()).to.not.equal(0);
        });

        it("Should create a new vote and let otherAccount vote for it", async function () {
            const { SimpleVote, owner, otherAccount} = await loadFixture(deploySetup);

            await SimpleVote.createVote("NFTs are cool!", 3);

            await expect(SimpleVote.connect(otherAccount).vote(0, true)).to.emit(SimpleVote, "Voted").withArgs(0, otherAccount.address, true);
        });
    })
    
})