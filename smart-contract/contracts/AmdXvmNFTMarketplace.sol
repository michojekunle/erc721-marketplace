// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/// @title AMDNFTMarketplace
/// @notice This contract represents an NFT marketplace allowing users to mint, buy, list, and transfer NFTs.
/// @dev Includes gas optimizations, protection against reentrancy attacks, custom errors, safe Ether transfers, and pausing mechanisms.
contract AmdXvmNFTMarketplace is ERC721("Amd Xvm", "AXVM"), Ownable(msg.sender), ReentrancyGuard, Pausable {
    uint256 private _tokenIds;
    uint256 public marketplaceFee = 0.000001 ether;

    mapping(uint256 => string) private _tokenURIs;

    struct NFT {
        uint256 price;
        bool isListed;
    }

    mapping(uint256 => NFT) public nfts;

    // Custom errors
    error NotOwner();
    error PriceGreaterThanZero();
    error NFTNotForSale();
    error InsufficientFunds();
    error CannotBuyOwnNFT();
    error TransferFailed();

    /// @dev Internal function to set the token URI for an NFT.
    /// @param _tokenId The ID of the token.
    /// @param _tokenURI The URI to be associated with the token.
    function _setTokenURI(
        uint256 _tokenId,
        string memory _tokenURI
    ) internal virtual {
        _tokenURIs[_tokenId] = _tokenURI;
    }

    /// @notice Returns the metadata URI for a given token ID.
    /// @param _tokenId The ID of the token.
    /// @return The token URI for the specified token.
    function tokenURI(
        uint256 _tokenId
    ) public view virtual override returns (string memory) {
        return _tokenURIs[_tokenId];
    }

    /// @notice Mints a new NFT with metadata and price.
    /// @param _recipient The recipient's address to whom the NFT will be minted.
    /// @param _metadataURI The metadata URI of the NFT.
    /// @param _price The initial price of the NFT.
    /// @return The ID of the newly minted token.
    function mintNFT(
        address _recipient,
        string memory _metadataURI,
        uint256 _price
    ) public onlyOwner whenNotPaused returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;

        _safeMint(_recipient, newItemId);
        _setTokenURI(newItemId, _metadataURI);

        nfts[newItemId] = NFT(_price, false);
        return newItemId;
    }

    /// @notice Lists an NFT for sale.
    /// @param _tokenId The ID of the token to be listed for sale.
    /// @param _price The price at which the NFT will be listed.
    function listNFT(uint256 _tokenId, uint256 _price) public {
        _verifyNFTOwner(_tokenId);

        if (_price == 0) {
            revert PriceGreaterThanZero();
        }

        NFT storage nft = nfts[_tokenId];
        if (nft.isListed) {
            revert("NFT is already listed.");
        }

        nft.price = _price;
        nft.isListed = true;

        emit NFTListed(_tokenId, _price);
    }

    /// @notice Buys an NFT that is listed for sale.
    /// @param _tokenId The ID of the token to be purchased.
    function buyNFT(uint256 _tokenId) public payable nonReentrant whenNotPaused {
        NFT storage nft = nfts[_tokenId];

        if (!nft.isListed) {
            revert NFTNotForSale();
        }

        uint256 totalCost = nft.price + marketplaceFee;
        if (msg.value < totalCost) {
            revert InsufficientFunds();
        }

        address seller = ownerOf(_tokenId);
        if (seller == msg.sender) {
            revert CannotBuyOwnNFT();
        }

        // Transfer ownership first (Effect)
        _safeTransfer(seller, msg.sender, _tokenId, "");

        // Transfer funds to the seller and marketplace owner
        (bool sellerTransferSuccess, ) = seller.call{value: nft.price}("");
        if (!sellerTransferSuccess) {
            revert TransferFailed();
        }

        (bool feeTransferSuccess, ) = owner().call{value: marketplaceFee}("");
        if (!feeTransferSuccess) {
            revert TransferFailed();
        }

        nft.isListed = false;

        emit NFTSold(_tokenId, msg.sender, msg.value);
    }

    /// @notice Transfers an NFT to another address.
    /// @param _tokenId The ID of the token to be transferred.
    /// @param _to The recipient's address.
    function transferNFT(uint256 _tokenId, address _to) public whenNotPaused {
        _verifyNFTOwner(_tokenId);
        _safeTransfer(msg.sender, _to, _tokenId, "");
    }

    /// @notice Pauses the contract, stopping key operations.
    function pause() public onlyOwner {
        _pause();
    }

    /// @notice Unpauses the contract, resuming key operations.
    function unpause() public onlyOwner {
        _unpause();
    }

    /// @notice Verifies that the caller is the owner of the NFT.
    /// @param _tokenId The ID of the token to check ownership for.
    function _verifyNFTOwner(uint256 _tokenId) private view {
        if (ownerOf(_tokenId) != msg.sender) {
            revert NotOwner();
        }
    }

    /// @notice Allows the contract to receive Ether safely.
    receive() external payable {
        revert("Direct transfers not allowed");
    }

    // Events
    event NFTListed(uint256 indexed tokenId, uint256 price);
    event NFTSold(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event NFTMinted(uint indexed tokenId);
    event NFTTransfer(uint indexed tokenId);
}