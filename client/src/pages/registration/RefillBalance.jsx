import PropTypes from "prop-types";
import React, { useContext } from 'react';
import { toast } from "react-hot-toast";
import { WalletContext } from '../../components/walletConnect/Wallet';

const RefillBalance = ({account}) => {
  const {web3,contract} = useContext(WalletContext);
  // console.log(account);
  // console.log(web3);

  const RefillBal =async (e)=>{
    e.preventDefault();

    const producer = document.querySelector("#producer").value;
    const energyBal = document.querySelector("#energyBal").value;

    // console.log(producer,energyBal);
    try{
      console.log(producer,energyBal)
        await contract.methods.AddEnergy(producer,energyBal).send({from:account});
        toast.success("Registration Successfull");
      }catch(err){
        alert(err);
      }
  }

  return (
    <>
    <div className="reg-cand-wrapper">
      <div className="reg-img-wrapper">
        <h1>Re-fill Energy Balance</h1>
      </div>
      <form className="can-reg-form" onSubmit={RefillBal}>
        <label htmlFor="address">Producer Address</label>
        <input type="text" id="producer"></input>

        <label htmlFor="id">Add Energy Amount</label>
        <input type="number" id="energyBal"></input>

        <button className="regBtn" type="submit">
          Refill Balance
        </button>
      </form>
    </div> 
    </>
  )
}

RefillBalance.propTypes = {
  account : PropTypes.node.isRequired,
}

export default RefillBalance
