import PropTypes from "prop-types";
import React, { useContext } from 'react';
import { WalletContext } from '../../components/walletConnect/Wallet';

const ProducerRegistration = ({account}) => {
  const {web3,contract} = useContext(WalletContext);
  // console.log(account);
  // console.log(web3);

  const GetInfo = async (e)=>{
    e.preventDefault();

    const producer = document.querySelector("#producer").value;
    const id = document.querySelector("#id").value;
    const energyBal = document.querySelector("#energyBal").value;

    // console.log(producer,id,energyBal);
    console.log(e.nativeEvent.submitter.innerText)
    if (e.nativeEvent.submitter.innerText === "REGISTER") {
      try{
        // console.log(producer,id)
          await contract.methods.registerProducer(producer,id,energyBal).send({from:account});
          alert("Registration Successfull");
        }catch(err){
          alert(err);
        }
    }
    else{
      // console.log(producer,id)
      try{
          await contract.methods.deRegisterProducer(producer,id).send({from:account});
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
        <h1>Producer Registration</h1>
      </div>
      <form className="can-reg-form" onSubmit={GetInfo}>
        <label htmlFor="address">Producer Address</label>
        <input type="text" id="producer"></input>

        <label htmlFor="id">Producer Id</label>
        <input type="number" id="id"></input>

        <label htmlFor="id">Producer Energy Balance(KWt)<br/>(Keep it Blank During Deregistration)</label>
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

ProducerRegistration.propTypes = {
  account : PropTypes.node.isRequired,
}

export default ProducerRegistration
