import { Link, useNavigate } from "react-router-dom";
import ConnectedAccount from "./ConnectedAccount";
import "./Navigation.css";

const Navigation = ({ account }) => {
  const navigateTo = useNavigate()

  return (
    <header>
      <nav>
        <div className="connected-account">
          <ConnectedAccount account={account} />
        </div>
        <ul>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>

          <Link className="nav-link"
            onClick={async () => {
                const response = await fetch("http://localhost:3000/api/agent-verification", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ agent: account }), // Send agent info to server for verification
                });
                const data = await response.json();
                if (data.message==="Agent verification success") {
                  // If verification successful, navigate to the register page
                  navigateTo('/register');
                } else {
                  // If not successful, show a message or handle it accordingly
                  // console.log(data.message);
                  alert(data.message);
                }
              }}
            >
              Register
            </Link>
          </li>

          <li>
            <Link className="nav-link" 
                onClick={async () => {
                const response = await fetch("http://localhost:3000/api/producer-verification", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ producer: account }), // Send agent info to server for verification
                });
                const data = await response.json();
                if (data.message==="Producer verification success") {
                  // If verification successful, navigate to the register page
                  navigateTo('/offer');
                } else {
                  // If not successful, show a message or handle it accordingly
                  // console.log(data.message);
                  alert(data.message);
                }
              }}
            >
              Bid Energy
            </Link>
          </li>
          
          <li>
            <Link className="nav-link" 
                onClick={async () => {
                const response = await fetch("http://localhost:3000/api/consumer-verification", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ consumer: account }), // Send agent info to server for verification
                });
                const data = await response.json();
                if (data.message==="Consumer verification success") {
                  // If verification successful, navigate to the register page
                  navigateTo('/buy');
                } else {
                  // If not successful, show a message or handle it accordingly
                  // console.log(data.message);
                  alert(data.message);
                }
              }}
            >
              Buy Energy
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/records">
              Records
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;
