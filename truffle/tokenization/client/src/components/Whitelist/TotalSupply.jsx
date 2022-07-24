import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import contracts from "../../contexts/EthContext/contracts";

function TotalSupply() {
  const { state: { contract, accounts } } = useEth();
  const [totalSupply, setTotalSupply] = useState(0);

  const updateTotalSupply = async () => {
    if (contract !== null) {
      let totalSupply = await contract[contracts.StarDucksCappucinoToken].methods.balanceOf(accounts[0]).call();
      setTotalSupply(totalSupply);
    }
  }

  const listenToTokenTransfer = () => {
    if (contract !== null) {
      contract[contracts.StarDucksCappucinoToken].events.Transfer({to: accounts[0]}).on("data", updateTotalSupply);
    }
  }

  useEffect(() => {

  }, [contract, totalSupply]);

  listenToTokenTransfer();

  return (
    <div>
        <p>{totalSupply} CAPPU is currently minted</p>
    </div>
  );
}

export default TotalSupply;
