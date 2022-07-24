import { useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractAddress(props) {
  const { state: { contract } } = useEth();

  useEffect(() => {
    console.log(contract);
  }, [contract]);

  if (contract === null) {
    return <p>Contracts are loading ...</p>
  } else {
    return (
        <p>If you want to buy tokens, send Wei to this address : {contract[props.contractIndex]._address} </p>
    );
  }
}

export default ContractAddress
