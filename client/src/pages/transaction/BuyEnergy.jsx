import React, { useContext } from 'react';
import BidsAvaliable from '../../components/availableBids/BidsAvailable';
import { WalletContext } from '../../components/walletConnect/Wallet';
import "./buy.css";

const BuyEnergy = ({account}) => {

const {web3, contract} = useContext(WalletContext);

const EnergyBuy = async (e)=>{
  e.preventDefault();
  const producer = document.querySelector("#producer").value;
  const energyAmount = document.querySelector("#energy").value;
  const serial = document.querySelector("#bidSerial").value;

  const bids = await contract.methods.ShowBids().call()

  console.log(bids[serial]);
  const pricePerUnit = Number(bids[serial].pricePerUnit);

  const ethAmount = energyAmount*pricePerUnit;


  console.log(producer,energyAmount,serial);
  try{
    console.log(producer,energyAmount,serial)
      await contract.methods.BuyEnergy(producer,energyAmount,serial).send({from:account,value:ethAmount});
      alert("Energy Bought Successfully");
    }catch(err){
      alert(err);
    }
}
  return (
    <>
<div className="reg-cand-wrapper">
      <div className="reg-img-wrapper">
        <h1>Buy Energy</h1>
      </div>
      <form className="can-reg-form" onSubmit={EnergyBuy}>
      <label htmlFor="address">Producer Address</label>
      <input type="text" id="producer"></input>

      <label htmlFor="Energy">Energy to Buy</label>
      <input type="number" id="energy"></input>

      <label htmlFor="serial">Serial of the Bid</label>
      <input type="number" id="bidSerial"></input>

      <button className="regBtn" type="submit">
        Buy Energy
      </button>
      </form>
      <BidsAvaliable account={account}/>
    </div> 
    </>
  )
}

export default BuyEnergy
