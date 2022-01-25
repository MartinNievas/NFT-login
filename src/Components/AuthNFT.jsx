import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import React, { useCallback, useState } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";

const injectedConnector = new InjectedConnector({ supportedChainIds: [4] });

const MEMBERSHIP_NFT_CONTRACT_ADDRESS =
  "0x0e8101d3C825daF651017eeC29EB02B0217b4f33";
const MEMBERSHIP_NFT_TOKEN_ID = "0";
const MEMBERSHIP_NFT_TOKEN_COUNT = 1;
const OPENSEA_LINK =
  "https://testnets.opensea.io/assets/0x0e8101d3c825daf651017eec29eb02b0217b4f33/0";

/**
 * A React hook that can be used to determine membership status of the connected wallet
 * @returns true, if connected wallet owns the NFT.
 */
const useWalletMembershipAccess = () => {
    const [access, setAccess] = useState(false);
    const { account, library } = useWeb3React();

    async function checkWalletMembership() {
        // get the connected wallet as a signer
        const signer = library.getSigner(account);

        /*
          SDK takes in a valid Signer or Provider.
          A signer can perform READ and WRITE calls on the blockchain.
          A provider can only perform READ calls on the blockchain.
          Read more: https://docs.ethers.io/v5/api/signer
          */
        const module = new ThirdwebSDK(signer).getCollectionModule(
            MEMBERSHIP_NFT_CONTRACT_ADDRESS
        );

        // check connceted wallet balance of the token
        const balance = await module.balance(MEMBERSHIP_NFT_TOKEN_ID);
        if (balance.toNumber() >= MEMBERSHIP_NFT_TOKEN_COUNT) {
            return true;
        } else {
            return false;
        }
    }

    if (library && account) {
        // Check wallet for membership nft then update the state.
        checkWalletMembership().then(setAccess);
    } else {
        // Reset access state if account is disconnected.
        if (access) {
            setAccess(false);
        }
    }

    return access;
};

export default useWalletMembershipAccess;