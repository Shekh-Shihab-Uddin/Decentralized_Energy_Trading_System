import PropTypes from "prop-types";
import React, { useContext } from 'react';
import { WalletContext } from '../../components/walletConnect/Wallet';

const AgentRegistration = ({account}) => {
  const {web3,contract} = useContext(WalletContext);
  // console.log(contract);
  // console.log(web3);

  // const [info, setInfo] = useState({agent:null,id:null});

  const GetInfo = async (e)=>{
    e.preventDefault();
    const agent = document.querySelector("#agent").value;
    // if (agent != null) {
    //   console.log(agent.value);
    //   }
    //   else {
    //     console.log("null");
    //   }
    const id = document.querySelector("#id").value;
    //console.log(agent,id);
    console.log(e.nativeEvent.submitter.innerText)
    if (e.nativeEvent.submitter.innerText === "REGISTER") {
      console.log(agent,id)
      try{
        await contract.methods.registerAgents(agent,id).send({from:account});
        alert("Registration Successfull");
      }catch(err){
        alert(err);
      }
    }else{
        console.log(agent,id)
        try{
          await contract.methods.deRegisterAgents(agent,id).send({from:account});
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
        <h1>Agent Registration</h1>
      </div>
      <form className="can-reg-form" onSubmit={GetInfo}>
        <label htmlFor="address">Agent Address</label>
        <input type="text" id="agent"></input>

        <label htmlFor="id">Agent Id</label>
        <input type="number" id="id"></input>

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

AgentRegistration.propTypes = {
  account : PropTypes.node.isRequired,
}

export default AgentRegistration
