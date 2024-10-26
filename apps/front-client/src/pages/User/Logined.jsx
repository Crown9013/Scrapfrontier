/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";

import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { formatUnits, formatEther, zeroAddress } from "viem";

// Import toast
import toast from "react-hot-toast";
import { ConfirmToast } from "react-confirm-toast";

// Import carousel
import Carousel from "../../components/Carousel/Carousel";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import "swiper/css";

// Import helper
import { formatNumberWithCommas, truncate } from "../../helper";

// Import hooks
import { usePlayer } from "../../hooks/usePlayer";
import { useBalance } from "../../hooks/useBalance";
import { useFeatured } from "../../hooks/useFeatured";
import { useNFT } from "../../hooks/useNFT";
import { useTournamentAndEvents } from "../../hooks/useTournamentAndEvents";
import {
  claimContractAddress,
  useClaimContract,
} from "../../hooks/useClaimContract";

// Import utilities
// import { getByURL } from "../../utils";

// Import config
import config from "../../config/var.config.js";

// Import assets
import Logout from "@monorepo/shared/assets/img/logout.svg";
import LoginImg from "@monorepo/shared/assets/img/login.jpg";
import Divider from "@monorepo/shared/assets/img/divider.svg";
import SteamCard from "@monorepo/shared/assets/img/steam_card.svg";
import SettingIcon from "@monorepo/shared/assets/img/setting_icon.svg";
import GeneralAvatar from "@monorepo/shared/assets/img/generaAavatar.svg";
import ContentHeader from "@monorepo/shared/assets/img/content_header.svg";
import ContentFooter from "@monorepo/shared/assets/img/content_footer.svg";

const Logined = () => {
  const {
    isClaimTransactionError,
    isClaimTransactionLoading,
    isClaimTransactionPending,
    isClaimTransactionConfirmed,
    isClaimTransactionConfirming,
    getClaimTokenBalance,
    getClaimableTokenAmount,
    getClaimTokenAllowance,
    handleClaimApprove,
    handleClaimToken,
  } = useClaimContract();

  const {
    isNftTransactionError,
    isNftTransactionPending,
    isNftTransactionLoading,
    isNftTransactionConfirmed,
    isNftTransactionConfirming,
    nftCost,
    maxTier,
    currencyToken,
    nftId,
    nftImageUrl,
    tierOfNft,
    isNftOwner,
    getTier,
    approveNFTUpgrade,
    mintNFT,
    upgradeNFT,
  } = useNFT();

  const {
    getEthBalance,
    getTokenBalance,
    getTokenSymbol,
    getTokenDecimals,
    getTokenAllowance,
  } = useBalance();

  const { open } = useWeb3Modal();
  const { allPlayer, storePlayer } = usePlayer();
  const { address, isConnected, isDisconnected } = useAccount();
  const { getAllFeatures } = useFeatured();
  const { getAllTournamentAndEvents } = useTournamentAndEvents();
  const [isPrimaryWallet, setIsPrimaryWallet] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [feturedItems, setFeturedItems] = useState([]);
  const [tournamentAndEventList, setTournamentAndEventList] = useState([]);
  const [points, setPoints] = useState("0");
  const [rank, setRank] = useState("0");
  const [contractBalance, setContractBalance] = useState("0");
  const [claimableTokenAmount, setClaimableTokenAmount] = useState("0");
  const [isNFTDisabled, setIsNFTDisabled] = useState(true);
  const [isClaimable, setIsClaimable] = useState(false);
  const [approvedTokenAmount, setApprovedTokenAmount] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [isUpgradable, setIsUpgradable] = useState(false);
  const [userSteamId, setUserSteamId] = useState("");
  const [userSteamAvatar, setUserSteamAvatar] = useState("");
  const [nativeTokenSymbol, setNativeTokenSymbol] = useState("");
  const [nativeTokenBalance, setNativeTokenBalance] = useState(0);
  const [scrapToken, setScrapToken] = useState("");
  const [upgradePrice, setUpgradePrice] = useState(0);
  const [scrapTokenSymbol, setScrapTokenSymbol] = useState("");
  const [scraptTokenBalance, setScrapTokenBalance] = useState(0);
  const [scrapTokenDecimals, setScrapTokenDecimals] = useState(18);
  const [scrapTokenAllowance, setScrapTokenAllowance] = useState(0);
  const [isFinalTier, setIsFinalTier] = useState(false);
  const [showConfirmToast, setShowConfirmToast] = useState(false);
  const [toastText, setToastText] = useState("");

  const getDataFromDB = useCallback(async () => {
    const featureList = await getAllFeatures(10);
    setFeturedItems(featureList);

    const tournamentList = await getAllTournamentAndEvents(10);
    setTournamentAndEventList(tournamentList);
  }, []);

  const getWeb3Data = useCallback(async () => {
    const _ethBalance = await getEthBalance(address);
    if (_ethBalance) {
      setNativeTokenSymbol(_ethBalance.symbol);
      setNativeTokenBalance(
        formatUnits(_ethBalance.value, _ethBalance.decimals)
      );
    }

    if (currencyToken !== "" && currencyToken !== zeroAddress) {
      let _currencyTokenBalance = await getTokenBalance(currencyToken, address);
      let _currencyTokenSymbol = await getTokenSymbol(currencyToken);
      let _currencyTokenDecimals = await getTokenDecimals(currencyToken);

      setScrapToken(currencyToken);
      setScrapTokenBalance(
        formatUnits(_currencyTokenBalance, _currencyTokenDecimals)
      );
      setPoints(formatUnits(_currencyTokenBalance, _currencyTokenDecimals));
      setScrapTokenSymbol(_currencyTokenSymbol);
      setScrapTokenDecimals(_currencyTokenDecimals);

      const _tokenAllowance = await getTokenAllowance(
        currencyToken,
        address,
        config.nftContractAddress
      );

      setScrapTokenAllowance(
        formatUnits(_tokenAllowance, _currencyTokenDecimals)
      );
    }

    let _contractBalance = await getClaimTokenBalance(claimContractAddress);
    setContractBalance(_contractBalance);

    let _claimableTokenAmount = await getClaimableTokenAmount(address);
    setClaimableTokenAmount(_claimableTokenAmount);

    let _allowance = await getClaimTokenAllowance(address);
    setApprovedTokenAmount(_allowance);
  }, [address, currencyToken, claimContractAddress, setContractBalance, setScrapTokenBalance, setPoints, setScrapTokenSymbol, setScrapTokenDecimals, setClaimableTokenAmount, setApprovedTokenAmount]);

  const onhandleMetaMask = async () => {
    open();
  };

  const handleSaveWallet = useCallback(() => {
    if (!address) return toast.error("Please connect to the metamask");
    const steam_id = localStorage.getItem("steam_id");
    if (!steam_id) return toast.error("Please login to the steam");
    const param = {
      wallet_address: address,
      steam_id,
    };
    storePlayer(param);
  }, [address, localStorage, storePlayer]);

  const handleSaveNftTier = useCallback(() => {
    if (!address) return toast.error("Please connect to the metamask");
    const steam_id = localStorage.getItem("steam_id");
    if (!steam_id) return toast.error("Please login to the steam");
    const param = {
      steam_id: steam_id,
      nft_tier: tierOfNft,
    };
    storePlayer(param);
  }, [address, tierOfNft, localStorage, storePlayer]);

  const onClaimToken = useCallback(async () => {
    if (address && isConnected) {
	console.log(parseInt(contractBalance) , parseInt(claimableTokenAmount))
      if (parseInt(contractBalance) < parseInt(claimableTokenAmount)) {
        toast.error("Insufficient Token Balance");
        return;
      }
      handleClaimToken(address, claimableTokenAmount).then(() => {
        getWeb3Data();
      });
    }
  }, [address, isConnected, contractBalance, claimableTokenAmount, getWeb3Data, handleClaimToken]);

  const onApprove = useCallback(async (e) => {
    e.preventDefault();

    if (address && isConnected) {
      handleClaimApprove(address, claimableTokenAmount).then(() => {
        getWeb3Data();
      });
    }
  }, [address, isConnected, claimableTokenAmount, handleClaimApprove, getWeb3Data]);

  const onClickNftMint = useCallback(async (e) => {
    e.preventDefault();
    if (!address) return toast.error('Please connect to MetaMask')
    if (Number(nftCost) > Number(nativeTokenBalance)) {
      toast.error("Insufficient Balance");
      return;
    }
    if (currentPlayer && currentPlayer.wallet_address.toLowerCase() === address.toLowerCase()) {
      mintNFT(address, nftCost).then(() => {
        getWeb3Data();
      });
    } else {
      console.log(currentPlayer, address)
      return toast.error('Your wallet address is not registered in our system')
    }
    
  }, [address, nftCost, nativeTokenBalance, currentPlayer, mintNFT, getWeb3Data]);

  const onClickNftUpgrade = useCallback(async (e) => {
    e.preventDefault();
    if (Number(upgradePrice) > Number(scraptTokenBalance)) {
      toast.error("Insufficient Balance");
      return;
    }
    upgradeNFT(address, nftId).then(() => {
      getWeb3Data();
    });
  }, [nftId, address, scraptTokenBalance, upgradePrice, upgradeNFT, getWeb3Data]);

  const onClickNftUpgradeApprove = useCallback(async (e) => {
    e.preventDefault();

    approveNFTUpgrade(
      address,
      scrapToken,
      upgradePrice,
      scrapTokenDecimals
    ).then(() => {
      getWeb3Data();
    });
  }, [address, scrapToken, upgradePrice, scrapTokenDecimals, approveNFTUpgrade, getWeb3Data]);

  useEffect(() => {
    document.title = config.title + " | Dashboard";
  }, []);

  useEffect(() => {
    const steam_id = localStorage.getItem("steam_id");
    const steam_avatar = localStorage.getItem("steam_avatar");
    setUserSteamId(steam_id);
    setUserSteamAvatar(steam_avatar);
    getDataFromDB();
    setIsNFTDisabled(false);
  }, []);

  useEffect(() => {
    if (address && address !== zeroAddress) {
      getWeb3Data();
    }
  }, [address, getWeb3Data]);

  useEffect(() => {
    if (isDisconnected) {
      setPoints(0);
      setRank(0);
    }
  }, [address]);

  useEffect(() => {
    if (allPlayer && allPlayer.data) {
      const players = allPlayer.data;
      const currentPlayer = players.find(
        (item) => item.steam_id === userSteamId
      );
      setCurrentPlayer(currentPlayer);
    }
  }, [allPlayer]);

  useEffect(() => {
    if (address && currentPlayer) {
      if (currentPlayer.wallet_address) {
        if (currentPlayer.wallet_address.toLowerCase() !== address.toLowerCase()) {
          setIsPrimaryWallet(false)
          setToastText("Would you like to update this wallet as your default?");
          setShowConfirmToast(true);
        } else {
          setIsPrimaryWallet(true)
        }
      } else {
        setIsPrimaryWallet(false)
        setToastText("Would you like to register this wallet as your default?");
        setShowConfirmToast(true);
      }
    }
  }, [userSteamId, address, currentPlayer]);

  useEffect(() => {
    if (Number(scrapTokenAllowance) >= Number(upgradePrice)) {
      setIsUpgradable(true);
    } else {
      setIsUpgradable(false);
    }
  }, [scrapTokenAllowance, upgradePrice]);

  useEffect(() => {
    if (isNftTransactionError) {
      toast.error(
        isNftTransactionError.shortMessage || isNftTransactionError.message
      );
    }
  }, [isNftTransactionError]);

  useEffect(() => {
    if (isClaimTransactionError) {
      toast.error(
        isClaimTransactionError.shortMessage || isClaimTransactionError.message
      );
    }
  }, [isClaimTransactionError]);

  useEffect(() => {
    if (isNftTransactionConfirmed || isClaimTransactionConfirmed) {
      toast.success("Transaction Confirmed");
      getWeb3Data();
    }
  }, [isNftTransactionConfirmed, isClaimTransactionConfirmed]);

  useEffect(() => {
    if (approvedTokenAmount >= claimableTokenAmount) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
    if (claimableTokenAmount > 0) {
      setIsClaimable(true);
    } else {
      setIsClaimable(false);
    }
  }, [approvedTokenAmount, claimableTokenAmount]);

  useEffect(() => {
    getTier(Number(tierOfNft)).then((res) => {
      if (res) {
        setUpgradePrice(formatEther(res.scrapPrice));
      }
    });
  }, [getTier, tierOfNft]);

  useEffect(() => {
    console.log(maxTier, tierOfNft)
    if ( Number(maxTier) > 0 && (Number(tierOfNft) >= Number(maxTier))) {
      setIsFinalTier(true);
    } else {
      setIsFinalTier(false)
    }
  }, [maxTier, tierOfNft]);

  useEffect(() => {
    if (currentPlayer && address && currentPlayer.wallet_address.toLowerCase() === address.toLowerCase()) {
      if (currentPlayer.nft_tier !== tierOfNft) {
        console.log("saving nft tier to database");
        handleSaveNftTier();
      }
    }
  }, [currentPlayer, tierOfNft, nftId]);

  return (
    <div>
      <main className="content">
        <div className="main main2">
          <div className="main__video">
            <img src={LoginImg} alt="" />
          </div>
        </div>
      </main>
      <div className="main_container z-2 relative">
        <div className="flex lg:flex-row md:flex-row sm:flex-col-reverse justify-center -my-[15%]">
          <div className="lg:w-[70.45%] md:w-[70.45%] sm:w-[100%]">
            <img
              src={ContentHeader}
              className="featured_header"
              alt="Content Header"
            />
            <div
              className="flex flex-col"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="lg:m-[40px] md:m-[40px] sm:m-[20px]">
                <Carousel items={feturedItems} />
              </div>
              <img src={Divider} className="" alt="Divider" />
              <div className="lg:m-[40px] md:m-[40px] sm:m-[20px]">
                <CardCarousel
                  items={tournamentAndEventList}
                  walletAddress={address}
                />
              </div>
            </div>
            <img src={ContentFooter} alt="Content Footer" />
          </div>
          <div className="lg:w-[27.27%] md:w-[27.27%] sm:w-[100%] lg:ml-[30px] md:ml-[30px] sm:ml-0">
            <img src={ContentHeader} alt="" className="featured_header" />
            <div
              className="flex flex-col"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                className="flex flex-row p-4 mx-[20px] mt-[40px] mb-[20px]"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              >
                <div className="w-[25%]">
                  <img
                    className="w-[60px] h-[60px]"
                    src={userSteamAvatar || GeneralAvatar}
                    alt="Avatar"
                  />
                </div>
                <div className="w-[75%]">
                  <div className="flex flex-col py-2 space-y-2 px-2">
                    <span className="text-[22px] uppercase">
                      {localStorage.getItem("steam_username")
                        ? localStorage.getItem("steam_username")
                        : "N/A"}
                    </span>
                    <span className="text-[16px] uppercase">
                      {localStorage.getItem("steam_id")
                        ? localStorage.getItem("steam_id")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col py-2">
                    <span className="text-[16px] text-[#858584]">
                      Balance:{" "}
                      <span className="text-[20px] text-white">
                        {truncate(nativeTokenBalance, 4)}
                      </span>{" "}
                      {nativeTokenSymbol}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex grid-cols gap-[20px] mx-[20px]">
                <div
                  className="w-[100%]"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                >
                  <div className="flex flex-col py-2 space-y-2 px-4">
                    <span className="text-[16px] text-[#858584]">Points</span>
                    <span className="text-[22px]">
                      {formatNumberWithCommas(parseInt(points))}
                    </span>
                  </div>
                </div>
                <div
                  className="w-[100%]"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                >
                  <div className="flex flex-col py-2 space-y-2 px-4">
                    <span className="text-[16px] text-[#858584]">Rank</span>
                    <span className="text-[22px]">{rank}</span>
                  </div>
                </div>
              </div>
              {isConnected && address ? (
                <button
                  className="flex justify-center items-center text-[18px] border border-solid border-[#CC402A] uppercase  py-2 m-[20px] gap-2"
                  onClick={onhandleMetaMask}
                >
                  <img src={Logout} alt="disconnect wallet" />
                  <span>disconnect wallet</span>
                </button>
              ) : (
                <button
                  className="flex justify-center items-center text-[18px] bg-[#CC402A] uppercase py-2 m-[20px] gap-2"
                  onClick={onhandleMetaMask}
                >
                  <img src={Logout} alt="connect wallet" />
                  <span>connect wallet</span>
                </button>
              )}
              {isConnected && address && (
                <>
                  <img src={Divider} alt="Divider" />
                  <span className="flex justify-center items-center text-center text-[26px] m-[20px]">
                    My current season Pass
                  </span>
                  <div
                    className="flex justify-center items-center text-[22px] uppercase p-2 mx-[20px]"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    {isFinalTier ? "Final Tier" : tierOfNft > 0 ? `tier ` + tierOfNft : "n/a"}
                  </div>
                  <div className="flex justify-center items-center my-[4px]">
                    <img
                      src={nftId > 0 ? nftImageUrl : SteamCard}
                      alt="battlepassNft"
                    />
                  </div>
                  {(!isFinalTier && (isPrimaryWallet)) ? (
                    nftId > 0 ? (
                      isNftOwner && (
                        isUpgradable ? (
                          <button
                            className="flex justify-center items-center text-[22px] p-4 mx-[20px] uppercase"
                            style={
                              !isNftTransactionLoading && !isNFTDisabled
                                ? { backgroundColor: "#CC402A" }
                                : { backgroundColor: "#858585" }
                            }
                            disabled={
                              isNFTDisabled ||
                              isNftTransactionLoading ||
                              isNftTransactionConfirming ||
                              isNftTransactionPending
                            }
                            onClick={onClickNftUpgrade}
                          >
                            <span>
                              {isNftTransactionPending
                                ? "Upgrading..."
                                : isNftTransactionConfirming
                                ? "Upgrading..."
                                : "Upgrade"}
                            </span>
                          </button>
                        ) : (
                          <button
                            className="flex justify-center items-center text-[22px] p-4 mx-[20px] uppercase"
                            style={
                              !isNftTransactionLoading && !isNFTDisabled
                                ? { backgroundColor: "#CC402A" }
                                : { backgroundColor: "#858585" }
                            }
                            disabled={
                              isNFTDisabled ||
                              isNftTransactionLoading ||
                              isNftTransactionConfirming ||
                              isNftTransactionPending
                            }
                            onClick={onClickNftUpgradeApprove}
                          >
                            <span>
                              {isNftTransactionPending
                                ? "Approving..."
                                : isNftTransactionConfirming
                                ? "Approving..."
                                : "Approve"}
                            </span>
                          </button>
                        )
                      )
                    ) : (
                      <button
                        className="flex justify-center items-center text-[22px] p-4 mx-[20px] uppercase"
                        style={
                          !isNftTransactionLoading && !isNFTDisabled
                            ? { backgroundColor: "#CC402A" }
                            : { backgroundColor: "#858585" }
                        }
                        disabled={
                          isNFTDisabled ||
                          isNftTransactionLoading ||
                          isNftTransactionConfirming ||
                          isNftTransactionPending
                        }
                        onClick={onClickNftMint}
                      >
                        <span>
                          {isNftTransactionPending
                            ? "Minting..."
                            : isNftTransactionConfirming
                            ? "Minting..."
                            : "Mint"}
                        </span>
                      </button>
                    )
                  ) : (
                    <></>
                  )}
                  {address &&
                    (!isFinalTier ? (
                      nftId > 0 ? (
                        <div className="flex justify-start items-center m-[20px]">
                          <img
                            src={SettingIcon}
                            className="w-[20px]"
                            alt="SettingIcon"
                          />
                          <span className="uppercase text-[16px] ml-2 text-[#919191]">
                            Upgrade Price :{" "}
                            <span className="text-[22px] text-white">
                              {truncate(upgradePrice, 2)}
                            </span>{" "}
                            {scrapTokenSymbol}
                          </span>
                        </div>
                      ) : (
                        <div className="flex justify-start items-center m-[20px]">
                          <img
                            src={SettingIcon}
                            className="w-[20px]"
                            alt="SettingIcon"
                          />
                          <span className="uppercase text-[16px] ml-2 text-[#919191]">
                            Mint Price :{" "}
                            <span className="text-[22px] text-white">
                              {nftCost}
                            </span>{" "}
                            {nativeTokenSymbol}
                          </span>
                        </div>
                      )
                    ) : (
                      <></>
                    ))}
                  <img src={Divider} alt="Divider" />
                  <span className="flex justify-center items-center text-center text-[26px] uppercase m-[20px]">
                    scarp available
                  </span>
                  <div
                    className="flex justify-center items-center text-[22px] uppercase p-2 mx-[20px]"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    {address ? claimableTokenAmount : "n/a"}
                  </div>
                  {isApproved ? (
                    <button
                      className="flex justify-center items-center text-[22px] p-4 mx-[20px] mb-[40px] mt-[20px] uppercase"
                      style={
                        !isClaimTransactionLoading && isClaimable
                          ? { backgroundColor: "#CC402A" }
                          : { backgroundColor: "#858585" }
                      }
                      onClick={onClaimToken}
                      disabled={
                        isClaimTransactionLoading ||
                        isClaimTransactionPending ||
                        isClaimTransactionConfirming ||
                        !isClaimable
                      }
                    >
                      <span>
                        {isClaimTransactionPending ? "Claiming..." : "Claim"}
                      </span>
                    </button>
                  ) : (
                    <button
                      className="flex justify-center items-center text-[22px] p-4 mx-[20px] mb-[40px] mt-[20px] uppercase"
                      style={
                        !isClaimTransactionLoading
                          ? { backgroundColor: "#CC402A" }
                          : { backgroundColor: "#858585" }
                      }
                      onClick={onApprove}
                      disabled={
                        isClaimTransactionLoading ||
                        isClaimTransactionPending ||
                        isClaimTransactionConfirming
                      }
                    >
                      <span>
                        {isClaimTransactionPending ? "Approving..." : "Approve"}
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>
            <img src={ContentFooter} className="" alt="Content Footer" />
          </div>
        </div>
      </div>
      <ConfirmToast
        asModal={false}
        toastText={toastText}
        buttonYesText="Confirm"
        customFunction={() => handleSaveWallet()}
        position={"bottom-right"}
        showCloseIcon={false}
        setShowConfirmToast={setShowConfirmToast}
        showConfirmToast={showConfirmToast}
        theme={"snow"}
        className="top-12 z-50"
      />
    </div>
  );
};

export default Logined;
