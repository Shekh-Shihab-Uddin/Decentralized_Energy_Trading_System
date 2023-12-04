import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import SelectAccount from './components/accountSelection/SelectAccount';
import Root from "./components/root/Root";
import Wallet from "./components/walletConnect/Wallet";
import RecordList from "./pages/records/RecordList";
import Registration from "./pages/registration/RegistrationRoot";
import BuyEnergy from "./pages/transaction/BuyEnergy";
import OfferEnergy from "./pages/transaction/OfferEnergy";
function App() {
  const [account, setAccount] = useState("");

  const saveAccount = (address)=>{
      setAccount(address);
  }

  const router = createBrowserRouter([
  {path:"/",element:<Root account={account}/>,
  children:[
        {path:'/',element:<SelectAccount saveAccount={saveAccount}/>},
        {path:'/register',element:<Registration account={account}/>},
        {path:'/offer',element:<OfferEnergy account={account}/>},
        {path:'/buy',element:<BuyEnergy account={account}/>},
        {path:'/records',element:<RecordList account={account}/>},
      ]}
    ])

  return (
    <> 
    <Wallet>  
      <RouterProvider router={router}></RouterProvider>
    </Wallet>
    </>
  )
}

export default App
