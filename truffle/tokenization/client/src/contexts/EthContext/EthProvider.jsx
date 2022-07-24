import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

import StarDucksCappucinoToken from "../../contracts/StarDucksCappucinoToken.json";
import StarDucksCappucinoTokenCrowdsale from "../../contracts/StarDucksCappucinoTokenCrowdsale.json";
import Kyc from "../../contracts/KycContract.json";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);


  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

        // 현재 활성화된 MetaMask의 account만을 받아온다. 따라서 계정을 전환하면 accounts의 값도 바뀌게 된다.
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();

        let address = [], contract = [];
        
        try {
          for (var contractArtifact of artifact) {
            const { abi } = contractArtifact;
            address.push(contractArtifact.networks[networkID].address);
            contract.push(new web3.eth.Contract(abi, address[address.length - 1])); 
          }
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = [StarDucksCappucinoToken, StarDucksCappucinoTokenCrowdsale, Kyc];
        await init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = async () => {
      await init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
