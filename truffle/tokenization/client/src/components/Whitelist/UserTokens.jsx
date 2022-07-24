import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import contracts from "../../contexts/EthContext/contracts";

function UserTokens() {
  const { state: { contract, accounts } } = useEth();
  const [userTokens, setUserTokens] = useState(0);

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

  }, [contract, userTokens]);

  listenToTokenTransfer();

  return (
    <div>
        <p>You currently have: {userTokens} CAPPU Tokens</p>
    </div>
  );
}

export default UserTokens;
