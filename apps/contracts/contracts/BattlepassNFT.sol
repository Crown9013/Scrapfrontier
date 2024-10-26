
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract BattlepassNFT is ERC721Burnable, Ownable, ReentrancyGuard {
    using Strings for uint256;

    // Structure defining the data stored for each tier
    struct Tier {
        uint256 id;             // ID of the tier (starting from 0)
        uint256 maxSupply;      // Maximum number of NFTs that can be minted in this tier
        uint256 currentSupply;  // Current number of NFTs minted in this tier
        uint256 scrapPrice;     // Price of the NFTs in this tier in scrap tokens (ERC20)
    }

    // Structure defining the token metadata stored for each NFT minted
    struct TokenMetadata {
        uint256 tier;           // Tier ID of the NFT (starting from 0)
        uint256 tokenId;        // Unique identifier of the token (minted from 0)
        address creator;        // Address of the creator of the NFT
        uint256 amountScrap;    // Amount of scrap tokens paid for the NFT
    }

    string baseURI;
    string public baseExtension = ".json";

    // Price of BattlepassNFT
    uint256 public cost = 0.01 ether;

    // Currency token address
    address public currencyToken;

    // Totol supply of battlepass NFT
    uint256 public maxSupply = 0;

    // Max tier
    uint256 public maxTier = 0;

    // Mapping from address to TokenMetadata for each account
    mapping (address => TokenMetadata) tokenMetadataPerAccount;
    // Mapping of the tiers of battlepass NFTs
    mapping (uint256 => Tier) public tiers;

    bool public paused = true;

    // ------- Events ---------
    event NewBaseURI(string newURI, address updatedBy);
    event NewNFTCost(uint newCost, address updatedBy);
    event NewNFTMinted(uint256 mintedTokenId, address mintedBy);
    event OldNFTBurned(uint256 burnedTokenId, address burnedBy);
    // ----------------

    // ------- Modifiers ---------
    modifier isMintable() {
        require(!paused, "BattlepassNFT: Paused");
        require(balanceOf(msg.sender) == 0, "BattlepassNFT: Already minted");
        require(tiers[0].currentSupply + 1 <= tiers[0].maxSupply, "BattlepassNFT: Would exceed max supply");
        require(msg.value >= cost, "BattlepassNFT: Not enough balance for minting");
        _;
    }
    modifier isUpgradable(uint256 _tokenId) {
        require(!paused, "BattlepassNFT: Paused");
        require(ownerOf(_tokenId) == msg.sender, "BattlepassNFT: Not owner");
        uint8 currentTier = getTierOfTokenId(_tokenId);
        require(currentTier > 0 && currentTier <= maxTier, "BattlepassNFT: Wrong tier");
        _;
    }

    constructor() ERC721("Battlepass NFT", "BattlepassNFT") {}

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    // Minting function for minting the first tier of battlepass NFTs
    function mint() public payable isMintable() {
        // Mint new NFT
        uint256 newTokenId = tiers[0].currentSupply + 1;
        _safeMint(msg.sender, newTokenId);
        tiers[0].currentSupply += 1;

        emit NewNFTMinted(newTokenId, msg.sender);
    }

    function upgrade(uint256 _tokenId) public isUpgradable(_tokenId) {
        
        uint256 scrapTokenBalance = IERC20(currencyToken).balanceOf(msg.sender);
        uint8 nextTierIndex = getTierOfTokenId(_tokenId);
        
        // Validation for upgrading
        require(scrapTokenBalance >= tiers[nextTierIndex].scrapPrice, "BattlepassNFT: Not enough scrap");
        require(tiers[nextTierIndex].currentSupply + 1 <= tiers[nextTierIndex].maxSupply, "BattlepassNFT: Would exceed max supply of next tier");

        // Burn old NFT of previous tier
        burn(_tokenId);

        // Transfer scrap token from sender to this contract
        IERC20(currencyToken).transferFrom(msg.sender, address(this), tiers[nextTierIndex].scrapPrice);

        // Mint new NFT of next tier
        uint256 newTokenId = getTokenIdOfNextTier(nextTierIndex);        
        _safeMint(msg.sender, newTokenId);
        tiers[nextTierIndex].currentSupply += 1;

        emit NewNFTMinted(newTokenId, msg.sender);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
          _exists(tokenId),
          "ERC721Metadata: URI query for nonexistent token"
        );

        // if(revealed == false) {
        //     return notRevealedUri;
        // }

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
            : "";
    }

    function getMaxTier() public view returns (uint256) {
        return maxTier;
    }

    function getTier(uint256 _tierIndex) public view returns (Tier memory) {
        return tiers[_tierIndex];
    }

    function getCost() public view returns (uint256) {
        return cost;
    }

    // Function to get the role members for a specific role
    function getTotalSupply() public view returns (uint256) {
        return maxSupply;
    }

    function getTokenIdOfNextTier(uint256 _nextTierIndex) public view returns (uint256) {
        uint256 startTokenId = 0;
        for (uint8 i = 0; i < _nextTierIndex; i++) {
            startTokenId += tiers[i].maxSupply;
        }

        return startTokenId + tiers[_nextTierIndex].currentSupply + 1;
    }

    function getTierOfTokenId(uint256 _tokenId) public view returns (uint8) {
        uint256 _maxSupply = 0;
        for (uint8 index = 0; index < maxTier; index++) {
            _maxSupply += tiers[index].maxSupply;
            if (_tokenId <= _maxSupply) {
                return index + 1;
            }
        }
        return 0;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
        emit NewBaseURI(_newBaseURI, msg.sender);
    }

    function setCost(uint256 _newCost) public onlyOwner() {
        cost = _newCost;
        emit NewNFTCost(_newCost, msg.sender);
    }

    function setCurrencyToken(address _newCurrencyToken) public onlyOwner() {
        require(_newCurrencyToken != address(0), "BattlepassNFT: Invalid currency token address");
        currencyToken = _newCurrencyToken;
    }

    function setTier(uint256 _maxSupplyOfTier, uint256 _scrapPriceOfTier) public onlyOwner() {
        tiers[maxTier] = Tier({
            id: maxTier,
            maxSupply: _maxSupplyOfTier,
            currentSupply: 0,
            scrapPrice: _scrapPriceOfTier
        });

        maxSupply = maxSupply + _maxSupplyOfTier;
        maxTier = maxTier + 1;
    }

    function withdrawAll() external onlyOwner nonReentrant {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }
}