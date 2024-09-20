import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AxvmMarketplaceModule = buildModule("AvxmMarketplaceModule", (m) => {
  const AxvmMarketplace = m.contract("AmdXvmNFTMarketplace");

  return { AxvmMarketplace };
});

export default AxvmMarketplaceModule;
