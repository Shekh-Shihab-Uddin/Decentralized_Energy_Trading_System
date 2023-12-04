import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../walletConnect/Wallet";
import './SelectAccount.css';

const SelectAccount = ({saveAccount}) => {
    const [account, setAccount] = useState("");

    const {web3} = useContext(WalletContext);
    console.log(web3);

    useEffect(()=>{
        const getAllAccounts = async ()=>{
            let select = document.getElementById("selectNumber");

            var options = await web3.eth.getAccounts();

            // console.log(options);

            for(var i =0; i< options.length; i++){
                var opt = options[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
            // console.log(select);
        }
        web3 && getAllAccounts();
    },[web3])


    const accountSelection = async ()=>{

        let selectedAccount = document.getElementById('selectNumber').value;
        // setAccount(selectedAccount);

        if(selectedAccount && selectedAccount !== "Choose an Account"){
            saveAccount(selectedAccount);
        }
    }

  return (
    <>
    <div className='ac-list-wrapper'>
        <div className='ac-list-container'>
        <h1 className='app-heading'>Hello Users ✋</h1>
            <img src = "trade_energy.PNG" alt='trade energy' width={300}/>
            <h1 className='ac-list-title'>
                Welcome to Peer to Peer Energy Trading System
            </h1>
            <from className='ac-list-form' id = "myForm">
                <select className='innerBox' id="selectNumber" onChange={accountSelection} defaultValue="">
                    <option disabled value="">
                        Choose an Account
                    </option>
                </select>
            </from>
        </div>   
    </div>
    </>
  )
}

SelectAccount.propTypes = {
    saveAccount: PropTypes.func.isRequired, // Change PropTypes.node to PropTypes.func
  };

export default SelectAccount
