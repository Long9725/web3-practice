import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import contracts from "../../contexts/EthContext/contracts";

function ItemDemo() {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [cost, setCost] = useState(0);
  const [itemName, setItemName] = useState("example_1");

  // TODO: fix rendering error 
  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setInputValue({
        [name] : value
    });

    if (name === 'cost') {
        setCost(inputValue['cost']);
        console.log(cost);
    }

    if (name === 'itemName') {
        setItemName(inputValue['itemName']);
        console.log(itemName);
    } 
    
    console.log(inputValue);
  };

  const handleSubmit = async() => {
    setItemName(inputValue['itemName']);
    setCost(inputValue['cost']);

    console.log(itemName);
    console.log(cost);

    await contract[contracts.ITEM_MANAGER].methods.createItem(itemName, cost).send({from: accounts[0]});
  }
  
  useEffect(() => {
    
  }, [inputValue]);

  return (
    <div>
        <h1>Event Trigger / Supply Chain Example</h1>
        <h2>Items</h2>
        <h2>Add Items</h2>
        Cost in Wei: <input type="text" name="cost" value={cost} onChange={handleInputChange} />
        Item Identifier: <input type="text" name="itemName" value={itemName} onChange={handleInputChange} />
        <button type="button" onClick={handleSubmit}>Create new Item</button>
    </div>
  );
}

export default ItemDemo;
