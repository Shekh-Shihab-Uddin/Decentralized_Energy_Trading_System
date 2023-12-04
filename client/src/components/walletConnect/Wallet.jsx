import PropTypes from "prop-types";
import { createContext, useState } from "react";
import Web3 from "web3";
import ABI from "../ABI/ABI.json";
import "./wallet.css";
const WalletContext = createContext();

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  // useEffect(() => {
  //   const web3 = new Web3("HTTP://127.0.0.1:7545");
  //   const init = async () => {
  //     const accounts = await web3.eth.getAccounts();

  //     // console.log(accounts);

  //     const contractAddress = "0x3999089a0242eDbdf1e98AfC5276b2d7EF950C10";
  //     //to create contract instance - abi and contract address
  //     const contract = new web3.eth.Contract(ABI, contractAddress);
  //     console.log("in wallet:",contract)
  //     setState({ web3: web3, contract: contract });
  //   };
  //   web3 && init();
  // }, []);

  const init = async () => {
    if(window.ethereum){
      const web3 = new Web3(window.ethereum);

      //script for triggering to open the metamask
      await window.ethereum.request({
        method:"eth_requestAccounts"
      })
      // 0xcc2b6D945703905a1f21B4D7293820802DA08AF3
      const contractAddress = "0x5D5D257B9E004c81bCbC7cB6cBca283802c7C44A";
      //to create contract instance - abi and contract address
      const contract = new web3.eth.Contract(ABI, contractAddress);
      setState({ web3: web3, contract: contract });
    }
  };

  return (
    <>
      <WalletContext.Provider value={state}>{children}</WalletContext.Provider>
      <button onClick={init} className="connectBtn">Connect to Metamask</button>
    </>
  );
};

Wallet.propTypes = {
  children: PropTypes.node.isRequired,
};
export { WalletContext };
export default Wallet;