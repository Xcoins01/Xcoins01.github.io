function getTrustWalletInjectedProvider(
    { timeout } = { timeout: 3000 }
  ) {

    // trustWallet是否存在
    const trustWallet = ethereum.isTrust;

    // 是否已经存在Provider
    const injectedProviderExist =
      typeof window !== "undefined" && typeof window.ethereum !== "undefined";

    // 获取trustWalletProvider
    const provider = window["trustwallet"];
  
    if (provider) {
      return provider;
    }
    
    return null;
  
  }


 const injectedProvider = getTrustWalletInjectedProvider()
 const chainId = await injectedProvider.request({ method: "eth_chainId" });

async function connectAccount(){
    try {
        const account = await injectedProvider.request({
            method: "eth_requestAccounts",
        });
        
        console.log(account); // => ['0x...']
        } catch (e) {
        if (e.code === 4001) {
            console.error("User denied connection.");
        }
    }
}


// BNB Smart Chain : 0x38
async function switchToNetwork(_chainId){
    try {
        await injectedProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: _chainId }], // Ensure the selected network is Etheruem
        });
      } catch (e) {
        if (e.code === 4001) {
          setError("User rejected switching chains.");
        }
    }
}
  

import { ethers } from "ethers.min.js";

const userAccounts = await injectedProvider.request({
    method: "eth_requestAccounts",
  });

import ethABI from "./ethABI.json";

const ETH_ADDRESS = "0x4B0F1812e5Df2A09796481Ff14017e6005508003";
const ethersProvider = new ethers.providers.Web3Provider(injectedProvider);
const contract = new ethers.Contract(ETH_ADDRESS, ethABI, ethersProvider);

const decimals = await contract.decimals();
const rawBalance = await contract.balanceOf(account);
const accountBalance = ethers.utils.formatUnits(rawBalance, decimals);