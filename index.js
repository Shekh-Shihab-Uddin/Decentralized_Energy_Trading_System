const express = require('express');
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const {Web3} = require('web3');
// const web3 = new Web3(`HTTP://127.0.0.1:7545`);
const web3 = new Web3(`https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`);


const ABI = require("./client/src/components/ABI/ABI.json");
const contractAddress = "0x5D5D257B9E004c81bCbC7cB6cBca283802c7C44A";

const contract = new web3.eth.Contract(ABI, contractAddress);
// console.log(contract.methods);

//checking agent permission 
async function CheckAgentList(agent){
    try{
        const agentId = await contract.methods.agents(agent).call();
        const agentIdNum = Number(agentId);
        // console.log(agentIdNumv);
        return(agentIdNum);
    }catch(e){
        console.log(e);
    }

}

app.post("/api/agent-verification",async(req,res)=>{
    const {agent} = req.body;
    console.log(agent);

    const status = await CheckAgentList(agent);
    // console.log(status);
    if(status>0){
        res.status(200).json({message:"Agent verification success"});
    }else{
        res.status(403).json({message:"Only Owners or Agents Have Access Here"});
    }
})

//checking producer permission 
async function CheckProducerList(producer){
    try{
        const producerId = await contract.methods.producers(producer).call();
        const producerIdNum = Number(producerId);
        // console.log(agentIdNumv);
        return(producerIdNum);
    }catch(e){
        console.log(e);
    }

}

app.post("/api/producer-verification",async(req,res)=>{
    const {producer} = req.body;
    console.log(producer);

    const status = await CheckProducerList(producer);
    // console.log(status);
    if(status>0){
        res.status(200).json({message:"Producer verification success"});
    }else{
        res.status(403).json({message:"Only Producers Have Access Here"});
    }
})


//checking producer permission 
async function CheckConsumerList(consumer){
    try{
        const consumerId = await contract.methods.consumers(consumer).call();
        const consumerIdNum = Number(consumerId);
        // console.log(agentIdNumv);
        return(consumerIdNum);
    }catch(e){
        console.log(e);
    }

}

app.post("/api/consumer-verification",async(req,res)=>{
    const {consumer} = req.body;
    console.log(consumer);

    const status = await CheckConsumerList(consumer);
    // console.log(status);
    if(status>0){
        res.status(200).json({message:"Consumer verification success"});
    }else{
        res.status(403).json({message:"Only Consumers Have Access Here"});
    }
})

app.listen(3000,()=>{
    console.log(`Server is running at ${PORT}`);
})