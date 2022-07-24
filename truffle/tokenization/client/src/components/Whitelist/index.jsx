import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import contracts from "../../contexts/EthContext/contracts";

import ContractAddress from "./ContractAddress";
import Web3 from "web3";

function Whitelist() {
  const { state: { contract, accounts, web3 } } = useEth();
  const [kycAddress, setKycAddress] = useState("0x123...");
  const [userTokens, setUserTokens] = useState(-1);

  console.log(contract);

//   const listenToPaymentEvent = () => {
//     contract[contracts.ITEM_MANAGER].events.SupplyChainStep().on("data", async function(event) {
//         console.log(`event : `);
//         console.log(event);
//         let itemObject = await contract[contracts.ITEM_MANAGER].methods.items(event.returnValues._itemIndex).call();
//         console.log("item " + itemObject._identifier + " was paid, deliver it now!");
//     });
//   }

  // TODO: fix rendering error => inputValue로 관리하면서 버그가 난 것 같다.
  const handleInputChange = event => {
    setKycAddress(event.target.value);
  };

  useEffect(() => {
    console.log(kycAddress);
  }, [kycAddress]);

  const handleKycWhitelisting = async () => {
    await contract[contracts.Kyc].methods.setKycCompleted(kycAddress).send({from: accounts[0]});
    alert("KYC for " + kycAddress + " is completed");
  }

  const updateUserTokens = async () => {
    if (contract !== null) {
      let userTokens = await contract[contracts.StarDucksCappucinoToken].methods.balanceOf(accounts[0]).call();
      setUserTokens(userTokens);
    }
  }
  const listenToTokenTransfer = () => {
    if (contract !== null) {
      contract[contracts.StarDucksCappucinoToken].events.Transfer({to: accounts[0]}).on("data", updateUserTokens);
    }
  }

  useEffect(() => {
    if(userTokens === -1) {
      updateUserTokens();
    }
  }, [contract, userTokens]);

  listenToTokenTransfer();

  const handleBuyTokens = async() => {
    await contract[contracts.StarDucksCappucinoTokenCrowdsale].methods.buyTokens(accounts[0]).send({from: accounts[0], value: web3.utils.toWei("1", "wei")});
  }

  return (
    <div>
        <h1>StarDucks Cappucino Token Sale</h1>
        <p>Get your Tokens today!</p>
        <h2>Kyc Whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" value={kycAddress} onChange={handleInputChange}/>
        <button type="button" onClick={handleKycWhitelisting} onSubmit={handleKycWhitelisting}>Add to Whitelist</button>
        <h2>Buy Tokens</h2>
        <ContractAddress contractIndex={contracts.StarDucksCappucinoTokenCrowdsale}/>
        <p>You currently have: {userTokens} CAPPU Tokens</p>
        <button type="button" onClick={handleBuyTokens}>Buy more tokens</button>
    </div>
  );
}

export default Whitelist;
