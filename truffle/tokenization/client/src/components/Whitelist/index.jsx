import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import contracts from "../../contexts/EthContext/contracts";

import ContractAddress from "./ContractAddress";
import TotalSupply from "./TotalSupply";
import UserTokens from "./UserTokens";
import BuyTokensBtn from "./BuyTokenBtn";

function Whitelist() {
  const { state: { contract, accounts, web3 } } = useEth();
  const [kycAddress, setKycAddress] = useState("0x123...");

  console.log(contract);

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

  return (
    <div>
        <h1>StarDucks Cappucino Token Sale</h1>
        <p>Get your Tokens today!</p>
        <h2>Kyc Whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" value={kycAddress} onChange={handleInputChange}/>
        <button type="button" onClick={handleKycWhitelisting} onSubmit={handleKycWhitelisting}>Add to Whitelist</button>
        <h2>Buy Tokens</h2>
        <ContractAddress contractIndex={contracts.StarDucksCappucinoTokenCrowdsale}/>
        <TotalSupply />
        <UserTokens />
        <BuyTokensBtn />
    </div>
  );
}

export default Whitelist;
