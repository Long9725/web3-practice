import { EthProvider } from "./contexts/EthContext";

import Whitelist from './components/Whitelist';

import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Whitelist/>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
