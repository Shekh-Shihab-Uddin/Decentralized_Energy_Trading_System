import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../walletConnect/Wallet";
import "./buyList.css";
const BuyList = ({account}) => {
  const{contract} = useContext(WalletContext);
  const [list, setList] = useState([]);

  console.log("In buyList:",contract);

  useEffect(()=>{
    const fetchPastEvents = async () => {
      try {
          const pastEvents = await contract.getPastEvents('DealMade', {
              fromBlock: 4822086, // Start block (set as needed)
              toBlock: 'latest' // End block (set as needed)
          });

          const dealList = [];
          for (var i=0; i< pastEvents.length; i++){
            dealList.push(pastEvents[i].returnValues);
          }

          setList(dealList);
          // Process past events data as needed
      } catch (error) {
          console.error('Error fetching past events:', error);
          // Handle error if fetching past events encounters an error
      }
  };
  contract && fetchPastEvents();
  },[contract,list])

  return (
    <div className="table-container">
      <table className="voter-table no-boder-sides">
        <thead>
          <tr>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Energy Amount</th>
            <th>Total Price(in wei)</th>
          </tr>
        </thead>
        <tbody>
        {/* using ternary operator to check if candidate List array is empty or not. 
        coz, initially when no candidate registered then the array will be black and will give error due to undefined array */}
          {list?(list.map((deal)=>{
            return <tr key= {Number(deal.serial)}>
              <td>{deal.consumer}</td>
              <td>{deal.producer}</td>
              <td>{Number(deal.Energy)}</td>
              <td>{Number(deal.totalPrice)}</td>
            </tr>
          })):<p></p>}
        </tbody>
      </table>
    </div>
  );
};
export default BuyList;
