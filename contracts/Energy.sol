//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Energy {
    address public owner;

    constructor() {
        owner = msg.sender;
        agents[owner] = 1;
    }

    uint32 private bidId = 0;
    uint32 private asksId = 0;

    struct Bid{
        address producer;
        uint32 serial;
        uint32 pricePerUnit;
        uint64 maxEnergy;
        uint64 minEnergy;
        uint256 timestamp;
        bool isSold;
    }

    Bid[] private bids;

    //map address to producerID
    mapping(address => uint32) public producers;
    mapping(address => uint32) public consumers;
    mapping(address => uint32) public agents;

    mapping(address => uint256) public userEnergyBalance;

    event agentRegistered(address indexed owner);
    event agentDeregistered(address indexed owner);

    event producerRegistered(address indexed producer);
    event producerDeregistered(address indexed producer);

    event consumerRegistered(address indexed consumer);
    event consumerDeregistered(address indexed consumer);

    event BidMade(address indexed producer, uint64 maxEnergy, uint64 minEnergy, uint32 indexed pricePerUnit);
    event DealMade(address indexed consumer, uint64 indexed Energy, uint64 indexed totalPrice, address producer);

    event producerBalanceIncreased(address indexed producer, uint256 indexed addedEnergy);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyRegisteredAgents() {
        require(agents[msg.sender]>0);
        _;
    }

    modifier onlyRegisteredProducers() {
        require(producers[msg.sender]>0);
        _;
    }

    modifier onlyRegisteredConsumers() {
        require(consumers[msg.sender]>0);
        _;
    }

//agent-registry
//the agentId=1 is taken by the owner. so, the later agents will get ID starting from 2 
    function registerAgents(address _agent, uint32 _id) public onlyOwner{
        require(_id > 1,"Provide a valid ID number");
        require(agents[_agent]==0,"User is already registered as agent");
        agents[_agent]=_id;
        emit agentRegistered(_agent);
    }
    function deRegisterAgents(address _agent, uint32 _id) public onlyOwner{
        require(_id > 1,"Provide a valid ID number");
        require(agents[_agent]!=0,"User is not registered yet as agent");
        delete agents[_agent];
        emit agentDeregistered(_agent);
    }


    function registerConsumer(address _consumer, uint32 _id, uint256 _energyBalance) public onlyRegisteredAgents{
        require(_id >0, "Provide a valid ID number");
        require(consumers[_consumer]==0, "User is already registered as consumer");
        consumers[_consumer] = _id;
        userEnergyBalance[_consumer] = _energyBalance;
        emit consumerRegistered(_consumer);
    }
    function deRegisterConsumer(address _consumer, uint32 _id) public onlyRegisteredAgents{
        require(_id >0, "Provide a valid ID number");
        require(consumers[_consumer]>0, "User is not registered yet as consumer");
        delete consumers[_consumer];
        delete userEnergyBalance[_consumer];
        emit consumerRegistered(_consumer);
    }

    function registerProducer(address _producer, uint32 _id, uint256 _energyBalance) public onlyRegisteredAgents{
        require(_id >0, "Provide a valid ID number");
        require(consumers[_producer]==0, "User is already registered as producer");
        producers[_producer] = _id;
        userEnergyBalance[_producer] = _energyBalance;
        emit producerRegistered(_producer);
    }
    function deRegisterProducer(address _producer, uint32 _id) public onlyRegisteredAgents{
        require(_id >0, "Provide a valid ID number");
        require(consumers[_producer]>0, "User is not registered yet as producer");
        delete producers[_producer];
        delete userEnergyBalance[_producer];
        emit producerRegistered(_producer);
    }


    function AddEnergy(address _producer, uint256 _balanceAmount) public onlyRegisteredAgents{
        require(producers[_producer]>0,"Insert a valid producer's address");
        require(_balanceAmount>0,"Insert a minimum energy to add");
        userEnergyBalance[_producer]+=_balanceAmount;
        emit producerBalanceIncreased(_producer, _balanceAmount);
    }

    function OfferEnergy(
        uint32 _price,
        uint64 _maxEnergy,
        uint64 _minEnergy
    ) public onlyRegisteredProducers{
        require(_maxEnergy<=userEnergyBalance[msg.sender],"Don't have this much energy to offer");
        require(_minEnergy>0,"Have to offer minimum energy offer");

//cutting of the amount from the producer so that he can not double offer the same energy.
        userEnergyBalance[msg.sender] -= _maxEnergy;

        bids.push(
            Bid({
                producer : msg.sender,
                serial: bidId,//it is same as the index number of this bid in "bids" array.
                //using this serial later we can access any information of this bid from anywhere.
                pricePerUnit : _price,
                maxEnergy : _maxEnergy,
                minEnergy : _minEnergy,
                timestamp : block.timestamp,
                isSold : false
            })
        );

        emit BidMade(bids[bidId].producer, bids[bidId].maxEnergy,bids[bidId].minEnergy,bids[bidId].pricePerUnit);
        bidId +=1;
    }

    // function Showing Bids
    function ShowBids() public view returns (Bid[] memory) {
        return bids;
    }


    function BuyEnergy(
        address _producer,
        uint64 _energy,
        uint32 _bidSerial
    ) public payable onlyRegisteredConsumers {
        require(_bidSerial < bids.length,"The bid with this serial does not exist");
        require(bids[_bidSerial].producer == _producer,"This producer doesn't own this bid");
        require(bids[_bidSerial].timestamp <= block.timestamp,"Can not buy energy before offering it");
        require(bids[_bidSerial].maxEnergy >= _energy,"The bid does not have sufficient energy");
        require(_energy >= bids[_bidSerial].minEnergy,"You did not ask for minimum amout of energy");
        require(bids[_bidSerial].isSold == false,"The bid does not have sufficient energy");
        uint64 totalPrice = bids[_bidSerial].pricePerUnit*_energy;
        require((msg.sender).balance > totalPrice,"Do not have enough ether in your account");

//energy transfer
        userEnergyBalance[_producer] += bids[_bidSerial].maxEnergy;
        userEnergyBalance[msg.sender] += _energy;
        userEnergyBalance[_producer] -= _energy;

//balance transfer
        sendEther(_producer, totalPrice);
        
        emit DealMade( msg.sender, _energy, totalPrice, _producer);
    }

    function sendEther(address _producer, uint64 _totalPrice) internal{
        require(msg.value >= _totalPrice,"Did not send enough ether");
        payable(_producer).transfer(msg.value);
    }

    function getBalance(address _account) public view returns(uint){
        return (_account).balance;
    }

}

// contract address:    0xcd33DA6007f18897a5510A04475A2Ee08e172d22
// account:             0x1f5160545CF297f164d933D1E00D060cb077D6b7

//sepolia:
//    > contract address:    0x5D5D257B9E004c81bCbC7cB6cBca283802c7C44A
//    > block number:        4822086
//    > block timestamp:     1701712788
//    > account:             0xeCbc9da4d09A4a5059e6f119444e0CF04288F9ad