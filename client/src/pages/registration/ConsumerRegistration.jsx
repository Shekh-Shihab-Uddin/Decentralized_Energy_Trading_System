import PropTypes from "prop-types";
import React, { useContext } from 'react';
import { WalletContext } from '../../components/walletConnect/Wallet';

const ConsumerRegistration = ({account}) => {
  const {web3,contract} = useContext(WalletContext);
  // console.log(account);
  // console.log(web3);

  const GetInfo =async (e)=>{
    e.preventDefault();

    const consumer = document.querySelector("#consumer").value;

    const id = document.querySelector("#id").value;
    const energyBal = document.querySelector("#energyBal").value;

    // console.log(consumer,id,energyBal);

    console.log(e.nativeEvent.submitter.innerText)
    if (e.nativeEvent.submitter.innerText === "REGISTER") {
      // console.log(consumer,id,energyBal);
      try{
        console.log(consumer,id,energyBal)
        await contract.methods.registerConsumer(consumer,id,energyBal).send({from:account});
        alert("Registration Successfull");
        }catch(err){
          alert(err);
        }
    }else{
      try{
        await contract.methods.deRegisterconsumer(consumer,id).send({from:account});
        alert("Deregistration Successfull");
      }catch(err){
        alert(err);
      }
    }
  }

  return (
    <>
    <div className="reg-cand-wrapper">
      <div className="reg-img-wrapper">
        <h1>Consumer Registration</h1>
      </div>
      <form className="can-reg-form" onSubmit={GetInfo}>
        <label htmlFor="address">Consumer Address</label>
        <input type="text" id="consumer"></input>

        <label htmlFor="id">Consumer Id</label>
        <input type="number" id="id"></input>

        <label htmlFor="id">Consumer Energy Balance(KWt)<br/>(Keep it Blank During Deregistration)</label>
        <input type="number" id="energyBal"></input>

        <button className="regBtn" type="submit">
          Register
        </button>
        <button className="regBtn" type="submit">
          Deregister
        </button>
      </form>
    </div> 
    </>
  )
}

ConsumerRegistration.propTypes = {
  account : PropTypes.node.isRequired,
}

export default ConsumerRegistration
