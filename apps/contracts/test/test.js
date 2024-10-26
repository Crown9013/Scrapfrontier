const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const path = require('path')
const fs = require('fs');

describe("BattlepassNFT", function () {
    let addrs;
    let demoToken;
    let nftContract;

    beforeEach(async () => {
        [owner, ...addrs] = await ethers.getSigners();
    })

    checkClaimStatus = async () => {
    }

    it("Deploying demo Token", async function () {
        const DemoTokenFactory = await ethers.getContractFactory("TestScrapToken");
        demoToken = await DemoTokenFactory.deploy();

        await demoToken.deployed();

        console.log("Deployed token addr:", demoToken.address);
    });

    it("Deploying NFT Contract", async function () {
        const NFTContractFactory = await ethers.getContractFactory("BattlepassNFT");
        nftContract = await NFTContractFactory.deploy();

        await nftContract.deployed();

        console.log("Deployed NFT Contract addr:", nftContract.address);
    });

    it("Setting the status as start", async function() {
        await nftContract.pause(false)
    })

    it("Setting the currency token", async function() {
        await nftContract.setCurrencyToken(demoToken.address);
    })

    it("Setting the tiers", async function() {
        await nftContract.setTier(100, 0)
        await nftContract.setTier(100, ethers.utils.parseEther("25"))
        await nftContract.setTier(100, ethers.utils.parseEther("50"))
        await nftContract.setTier(100, ethers.utils.parseEther("100"))
    })

    it("Transferring the 100 scrap tokens to the Address 1", async function() {
        await demoToken.transfer(addrs[1].address, ethers.utils.parseEther("100"));
    })

    it("Approving", async () => {
        await demoToken.connect(addrs[1]).approve(nftContract.address, ethers.utils.parseEther("100"))
    })

    it("Minting a NFT of tier 1 by Address 1", async () => {
        // Getting the NFT price of tier 1
        let price = await nftContract.getCost()
        await nftContract.connect(addrs[1]).mint({value: price})
    })

    it("Minting a NFT of tier 1 by Address 2", async () => {
        // Getting the NFT price of tier 1
        let price = await nftContract.getCost()
        await nftContract.connect(addrs[2]).mint({value: price})
    })

    it("Upgrading a NFT of tier 1 to the next tier", async () => {
        await nftContract.connect(addrs[1]).upgrade(1)

        let data = await nftContract.ownerOf(101)
        console.log(data, addrs[1].address)
    })

});