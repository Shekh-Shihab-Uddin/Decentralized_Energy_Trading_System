import React, { useContext } from 'react';
import BidsAvaliable from '../../components/availableBids/BidsAvailable';
import { WalletContext } from '../../components/walletConnect/Wallet';
import "./offer.css";

const OfferEnergy = ({account}) => {

  const {web3, contract} = useContext(WalletContext);

  const EnergyOffer = async (e)=>{
    e.preventDefault();
    const price = document.querySelector("#price").value;
    const maxEnergy = document.querySelector("#maxEnergy").value;
    const minEnergy = document.querySelector("#minEnergy").value;
  
    // console.log(price,maxEnergy,minEnergy);
    try{
      console.log(price,maxEnergy,minEnergy)
        await contract.methods.OfferEnergy(price,maxEnergy,minEnergy).send({from:account});
        alert("Bid Made Successfully");
      }catch(err){
        alert(err);
      }
  }
  return (
<>
<div className="reg-cand-wrapper">
      <div className="reg-img-wrapper">
        <h1>Bid Energy</h1>
      </div>
      <form className="can-reg-form" onSubmit={EnergyOffer}>
        <label htmlFor="Price">Price Per KWt(Wei)</label>
        <input type="text" id="price"></input>

        <label htmlFor="Energy">Maximum Offered Energy(KWt)</label>
        <input type="number" id="maxEnergy"></input>

        <label htmlFor="Energy">Minimum Offered Energy(KWt)</label>
        <input type="number" id="minEnergy"></input>

        <button className="regBtn" type="submit">
          Offer Energy
        </button>
      </form>
    <BidsAvaliable account={account}/>
    </div>
</>
  )
}

export default OfferEnergy
