// scripts/interact.js
const hre = require("hardhat");

async function main() {
  const marketplaceAddress = "";

  const Marketplace = await hre.ethers.getContractFactory(
    "AmdXvmNFTMarketplace"
  );
  const marketplace = await Marketplace.attach(marketplaceAddress);

  const [owner, buyer] = await hre.ethers.getSigners();

  console.log("Owner address: ", owner.address);
  console.log("Buyer address: ", buyer.address);

  // Mint a new NFT
  console.log("Minting a new NFT...");

  const mintTx = await marketplace
    .connect(owner)
    .mintNFT(
      owner.address,
      "ipfs://QmTknsxMDZv76fTKoEhXdTgG7kS5dfJw6xGMRv8ukLw1xn",
      hre.ethers.utils.parseEther("0.1")
    );

  const receipt = await mintTx.wait();
  const newTokenId = receipt.events[0].args.tokenId;

  console.log(`Minted NFT with tokenId: ${newTokenId}`);

  // List the NFT for sale
  console.log("Listing the NFT for sale...");

  const listTx = await marketplace.connect(owner).listNFT(
    newTokenId,
    hre.ethers.utils.parseEther("0.15") // New price
  );

  await listTx.wait();
  console.log(`Listed NFT with tokenId: ${newTokenId}`);

  // Buy the listed NFT
  console.log("Buying the NFT...");

  const price = hre.ethers.utils.parseEther("0.15"); // NFT price
  const fee = hre.ethers.utils.parseEther("0.000001"); // Marketplace fee

  const buyTx = await marketplace.connect(buyer).buyNFT(newTokenId, {
    value: price.add(fee), // Send total cost (price + fee)
  });

  await buyTx.wait();
  console.log(`Bought NFT with tokenId: ${newTokenId}`);

  // Transfer NFT to another account
  console.log("Transferring NFT...");

  const transferTx = await marketplace
    .connect(buyer)
    .transferNFT(newTokenId, owner.address);
  await transferTx.wait();

  console.log(`Transferred NFT with tokenId: ${newTokenId} back to owner`);

  console.log("Script execution completed.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
