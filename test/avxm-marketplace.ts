import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AmdXvmNFTMarketplace", function () {
  async function deployMarketplaceFixture() {
    const [owner, buyer, recipient, otherAccount] = await ethers.getSigners();
    const AmdXvmNFTMarketplace = await ethers.getContractFactory("AmdXvmNFTMarketplace");
    const marketplace = await AmdXvmNFTMarketplace.deploy();

    const initialPrice = ethers.parseEther("0.01");
    const metadataURI = "ipfs://QmNdGUgj81jfa21tyRHk2qAc2QRG8bbDnWtSzvzJicwtra";

    return { marketplace, owner, buyer, recipient, otherAccount, initialPrice, metadataURI };
  }

  describe("Deployment", function () {
    it("Should set the correct marketplace fee", async function () {
      const { marketplace } = await loadFixture(deployMarketplaceFixture);
      const fee = await marketplace.marketplaceFee();
      expect(fee).to.equal(ethers.parseEther("0.000001"));
    });
  });

  describe("Minting", function () {
    it("Should mint a new NFT with correct metadata and price", async function () {
      const { marketplace, recipient, initialPrice, metadataURI } = await loadFixture(deployMarketplaceFixture);
      await marketplace.mintNFT(recipient.address, metadataURI, initialPrice);
      const tokenURI = await marketplace.tokenURI(1);
      expect(tokenURI).to.equal(metadataURI);

      const nftData = await marketplace.nfts(1);
      expect(nftData.price).to.equal(initialPrice);
      expect(nftData.isListed).to.be.false;
    });
  });

  describe("Listing NFTs", function () {
    it("Should allow the owner to list an NFT for sale", async function () {
      const { marketplace, recipient, initialPrice, metadataURI } = await loadFixture(deployMarketplaceFixture);
      await marketplace.mintNFT(recipient.address, metadataURI, initialPrice);
      
      await marketplace.connect(recipient).listNFT(1, initialPrice);
      
      const nftData = await marketplace.nfts(1);
      expect(nftData.isListed).to.be.true;
      expect(nftData.price).to.equal(initialPrice);
    });

    it("Should revert if the price is zero", async function () {
      const { marketplace, recipient, metadataURI } = await loadFixture(deployMarketplaceFixture);
      await marketplace.mintNFT(recipient.address, metadataURI, 0);
      await expect(marketplace.connect(recipient).listNFT(1, 0)).to.be.revertedWithCustomError(marketplace, "PriceGreaterThanZero");
    });
  });

  describe("Buying NFTs", function () {
    it("Should allow a user to buy a listed NFT", async function () {
      const { marketplace, recipient, buyer, initialPrice, metadataURI } = await loadFixture(deployMarketplaceFixture);
      await marketplace.mintNFT(recipient.address, metadataURI, initialPrice);
      await marketplace.connect(recipient).listNFT(1, initialPrice);

      const totalCost = initialPrice.add(ethers.parseEther("0.000001"));
      await marketplace.connect(buyer).buyNFT(1, { value: totalCost });

      expect(await marketplace.ownerOf(1)).to.equal(buyer.address);
    });

    it("Should revert if the NFT is not for sale", async function () {
      const { marketplace, buyer, recipient, initialPrice, metadataURI } = await loadFixture(deployMarketplaceFixture);
      await marketplace.mintNFT(recipient.address, metadataURI, initialPrice);
      
      await expect(marketplace.connect(buyer).buyNFT(1, { value: initialPrice })).to.be.revertedWithCustomError(marketplace, "NFTNotForSale");
    });

    it("Should revert if insufficient funds are sent", async function () {
      const { marketplace, recipient, buyer, initialPrice, metadataURI } = await loadFixture(deployMarketplaceFixture);
      await marketplace.mintNFT(recipient.address, metadataURI, initialPrice);
      await marketplace.connect(recipient).listNFT(1, initialPrice);

      await expect(marketplace.connect(buyer).buyNFT(1, { value: initialPrice })).to.be.revertedWithCustomError(marketplace, "InsufficientFunds");
    });

    it("Should revert if the buyer is the owner of the NFT", async function () {
      const { marketplace, recipient, initialPrice, metadataURI } = await loadFixture(deployMarketplaceFixture);
      await marketplace.mintNFT(recipient.address, metadataURI, initialPrice);
      await marketplace.connect(recipient).listNFT(1, initialPrice);

      const totalCost = initialPrice.add(ethers.parseEther("0.000001"));
      await expect(marketplace.connect(recipient).buyNFT(1, { value: totalCost })).to.be.revertedWithCustomError(marketplace, "CannotBuyOwnNFT");
    });
  });

  describe("Transferring NFTs", function () {
    it("Should allow the owner to transfer an NFT to another address", async function () {
      const { marketplace, recipient, otherAccount, initialPrice, metadataURI } = await loadFixture(deployMarketplaceFixture);
      await marketplace.mintNFT(recipient.address, metadataURI, initialPrice);

      await marketplace.connect(recipient).transferNFT(1, otherAccount.address);

      expect(await marketplace.ownerOf(1)).to.equal(otherAccount.address);
    });

    it("Should revert if the caller is not the owner", async function () {
      const { marketplace, recipient, buyer, initialPrice, metadataURI } = await loadFixture(deployMarketplaceFixture);
      await marketplace.mintNFT(recipient.address, metadataURI, initialPrice);

      await expect(marketplace.connect(buyer).transferNFT(1, buyer.address)).to.be.revertedWithCustomError(marketplace, "NotOwner");
    });
  });

  describe("Pausable", function () {
    it("Should allow the owner to pause and unpause the contract", async function () {
      const { marketplace, owner } = await loadFixture(deployMarketplaceFixture);

      await marketplace.pause();
      await expect(marketplace.mintNFT(owner.address, "URI", ethers.parseEther("0.01"))).to.be.revertedWithCustomError(marketplace, "Pausable: paused");

      await marketplace.unpause();
      await marketplace.mintNFT(owner.address, "URI", ethers.parseEther("0.01"));
    });
  });
});