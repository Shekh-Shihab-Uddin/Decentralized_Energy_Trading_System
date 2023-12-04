import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../walletConnect/Wallet";
import "./bidsAvailable.css";

const BidsAvailable = () => {
  const{contract} = useContext(WalletContext);
  const [list, setList] = useState([]);
  
  useEffect(()=>{
    const getBidList = async()=>{
      const bidInfo = await contract.methods.ShowBids().call();
      let unsoldBids = []; 
      for(var i=0; i<bidInfo.length; i++){
        if(bidInfo[i].isSold==false){
            unsoldBids.push(bidInfo[i]) 
        }
      }
      setList(unsoldBids)
    }
    contract && getBidList();
  },[contract,list])
  // console.log(list[0].producer);
  return (
    <>
    <h1>List of Available Bids</h1>

    <div className="table-container">
      <table className="voter-table no-boder-sides">
        <thead>
          <tr>
            <th>Bid Serial</th>
            <th>Producer Address</th>
            <th>Maximum Energy to Sell(KWat)</th>
            <th>Minimum Energy to Sell(KWat)</th>
            <th>Price Per Unit(in wei)</th>
          </tr>
        </thead>
        <tbody>
        {/* using ternary operator to check if candidate List array is empty or not. 
        coz, initially when no candidate registered then the array will be black and will give error due to undefined array */}
          {list?(list.map((bid)=>{
            return <tr key= {Number(bid.serial)}>
              <td>{Number(bid.serial)}</td>
              <td>{bid.producer}</td>
              <td>{Number(bid.maxEnergy)}</td>
              <td>{Number(bid.minEnergy)}</td>
              <td>{Number(bid.pricePerUnit)}</td>
            </tr>
          })):<p></p>}
        </tbody>
      </table>
    </div>
    </>
  );
};
export default BidsAvailable;
