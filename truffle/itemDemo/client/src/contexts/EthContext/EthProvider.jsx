import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:9545");
        // TODO: MetaMask와 연결된 계정 중 상위 1개만 accounts에 저장된다.
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        
        let address = [], contract = [];

        for (var _artifact of artifact) {
          const { abi } = _artifact;
          try {
            var _address = _artifact.networks[networkID].address;
            var _contract = new web3.eth.Contract(abi, _address);

            address.push(_address);
            contract.push(_contract);
          } catch (err) {
            console.error(err);
          }
        }
        // const { abi } = artifact;
        // let address, contract;
        // try {
        //   address = artifact.networks[networkID].address;
        //   contract = new web3.eth.Contract(abi, address);
        // } catch (err) {
        //   console.error(err);
        // }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const simpleStorageArtifact = require("../../contracts/SimpleStorage.json");
        const itemManagerArtifact = require("../../contracts/ItemManager.json");
       // const itemArtifact = require("../../contracts/Item.json");
    
        const artifact = [simpleStorageArtifact, itemManagerArtifact];
        // const artifact = [simpleStorageArtifact, itemManagerArtifact, itemArtifact];
        // const artifact = require("../../contracts/SimpleStorage.json");
        
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
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
