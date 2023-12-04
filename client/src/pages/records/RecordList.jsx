import React, { useContext } from 'react';
import BuyList from "../../components/buyList/BuyList";
import { WalletContext } from '../../components/walletConnect/Wallet';
import "./records.css";

const RecordList = ({account}) => {
  const {web3, contract} = useContext(WalletContext);
  
  console.log("In record:",contract);
  return (
    <div className='reg-cand-wrapper'>
      <div className="reg-img-wrapper">
      <h1>List of the Completed Deals</h1>
      </div>
      <BuyList account={account}/>
    </div>
  )
}

export default RecordList
