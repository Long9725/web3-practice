import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import contracts from "../../contexts/EthContext/contracts";

function BuyTokensBtn() {
  const { state: { contract, accounts, web3 } } = useEth();
  const [buyTokens, setBuyTokens] = useState(0);

  const handleInputChange = (event) => {
    if(/\d/.test(event.target.value) || event.target.value === "") {
        setBuyTokens(event.target.value);
    }
  }

  useEffect(() => {
    console.log(buyTokens);
  }, [buyTokens]);

  const handleBuyTokens = async() => {
    let isBuyTokensOneOrMore = (buyTokens !== 0 && buyTokens !== "") ? true : false; 

    if(isBuyTokensOneOrMore) {
      // minter는 ganache의 첫번째 계정으로 잡힌다. MetaMask의 첫번째 게정이 아니다.
      let minter = await contract[contracts.StarDucksCappucinoToken].methods.getMinter().call();
      console.log(minter);
      console.log(accounts[0]);
      console.log(contract[contracts.StarDucksCappucinoToken]._address);
      console.log(contract[contracts.StarDucksCappucinoTokenCrowdsale]._address);

      // methods input에 이미 value를 넣어주면 send에는 value를 지정하지 않는다.
      await contract[contracts.StarDucksCappucinoToken].methods.mint(contract[contracts.StarDucksCappucinoTokenCrowdsale]._address, buyTokens).send({from: accounts[0]});
  
      let totalSupply = await contract[contracts.StarDucksCappucinoToken].methods.totalSupply().call();
      let balance = await contract[contracts.StarDucksCappucinoToken].methods.balanceOf(contract[contracts.StarDucksCappucinoTokenCrowdsale]._address).call();

      console.log(totalSupply);
      console.log(balance);

      await contract[contracts.StarDucksCappucinoTokenCrowdsale].methods.buyTokens(accounts[0]).send({from: accounts[0], value: web3.utils.toWei(`${buyTokens}`, "wei")});
    } else {
        alert("Number of tokens must not be 0");
    }
  }

  return (
    <div>
        Buy tokens : <input type="text" name="kycAddress" value={buyTokens} onChange={handleInputChange}/>
        <button type="button" onClick={handleBuyTokens}>Buy more tokens</button>
    </div>
  );
}

export default BuyTokensBtn;
