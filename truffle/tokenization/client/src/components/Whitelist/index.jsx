import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import contracts from "../../contexts/EthContext/contracts";

function Whitelist() {
  const { state: { contract, accounts } } = useEth();
  const [kycAddress, setKycAddress] = useState("0x123...");

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
//   const handleSubmit = async() => {
//     if(inputValue !== "") {
//         setItemName(inputValue['itemName']);
//         setCost(inputValue['cost']);
//     }

//     console.log(itemName);
//     console.log(cost);

//     console.log(accounts);

//     let result = await contract[contracts.ITEM_MANAGER].methods.createItem(itemName, cost).send({from: accounts[0]});

//     console.log(result);

//     alert("Send : " + cost + " Wei to : " + result.events.SupplyChainStep.returnValues._itemAddress);

//     listenToPaymentEvent();
//   }

  return (
    <div>
        <h1>StarDucks Cappucino Token Sale</h1>
        <p>Get your Tokens today!</p>
        <h2>Kyc Whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" value={kycAddress} onChange={handleInputChange}/>
        <button type="button" onClick={handleKycWhitelisting} onSubmit={handleKycWhitelisting}>Add to Whitelist</button>
    </div>
  );
}

export default Whitelist;
