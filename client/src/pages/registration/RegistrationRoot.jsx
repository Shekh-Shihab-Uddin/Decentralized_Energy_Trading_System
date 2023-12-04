import PropTypes from "prop-types";
import React, { useContext, useState } from 'react';
import { WalletContext } from '../../components/walletConnect/Wallet';
import AgentRegistration from "./AgentRegistration";
import ConsumerRegistration from "./ConsumerRegistration";
import ProducerRegistration from "./ProducerRegistration";
import RefillBalance from "./RefillBalance";
import "./registrationRoot.css";

const RegistrationRoot = ({account}) => {
    const {web3} = useContext(WalletContext);
    console.log(account);
    const [toggleAgent , setToogleAgent] = useState(false);
    const [toggleProducer , setToogleProducer] = useState(false);
    const [toggleConsumer , setToogleConsumer] = useState(false);
    const [toggleRefill , setToogleRefill] = useState(false);

    const showAgentReg = ()=>{
      if(toggleAgent==false){
        setToogleAgent(true);
        setToogleProducer(false);
        setToogleConsumer(false);
        setToogleRefill(false);
      }else{
        setToogleAgent(false);
      }
    }
    const showProducerReg = ()=>{
      if(toggleProducer==false){
        setToogleProducer(true);
        setToogleAgent(false);
        setToogleConsumer(false);
        setToogleRefill(false);
      }else{
        setToogleProducer(false);
      }
    }
    const showConsumerReg = ()=>{
      if(toggleConsumer==false){
        setToogleConsumer(true);
        setToogleAgent(false);
        setToogleProducer(false);
        setToogleRefill(false);
      }else{
        setToogleConsumer(false);
      }
    }
    const showEnergyRefill = ()=>{
      if(toggleRefill==false){
        setToogleRefill(true);
        setToogleConsumer(false);
        setToogleAgent(false);
        setToogleProducer(false);
      }else{
        setToogleRefill(false);
      }
    }

  return (
    <div className="reg-cand-wrapper">
      <img src = "registration.png" alt='trade energy' width={300}/>
      <button onClick={showAgentReg} className="regBtn">Agent Registration</button>
      {toggleAgent && <AgentRegistration account={account}/>}
      <button onClick={showProducerReg} className="regBtn">Producer Registration</button>
      {toggleProducer && <ProducerRegistration account={account}/>}
      <button onClick={showEnergyRefill} className="regBtn">Refill Energy to Producer Account</button>
      {toggleRefill && <RefillBalance account={account}/>}
      <button onClick={showConsumerReg} className="regBtn">Consumer Registration</button>
      {toggleConsumer && <ConsumerRegistration account={account}/>}
    </div>
  )
}

RegistrationRoot.propTypes = {
    account: PropTypes.node.isRequired,
}

export default RegistrationRoot
