import { useEffect, useState } from "react";
import axios from "axios";

// Styles
import "./App.css";

// Components
import OperationCard from "./components/operation-card/operation-card.component";
import OperationsList from "./components/operations-list/operations-list.component";

// Assets
import NewOperationIcon from "./assets/new-operation-icon.svg";
import LoadingAnimation from "./assets/loading-animation.svg";

function App() {
  const [operations, setOperations] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  // On render fetch the data
  useEffect(() => {
    axios.get("http://localhost:3001/api/operations")
      .then(res => setOperations(res.data.message.result))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      {/* Cards Container Section */}
      <div id="cards-container">
        {/* Total Expenses Card */}
        <div className="card">
          <div className="card-content expenses-card">
            <h1>Balance Actual</h1>
            <p id="total-balance">${ totalBalance }</p>
          </div>
        </div>
        {/* Show income and show expenses buttons */}
        <div className="buttons-container">
          <div className="small-card btn">
            <p>Mostrar Ingresos</p>
          </div>
          <div className="small-card btn">
            <p>Mostrar Egresos</p>
          </div>
        </div>
        {/* Add new operation button */}
        <div className="card btn" id="open-modal-btn">
          <div className="card-content button-card">
            <h1>Nueva Operacion</h1>
            <img src={NewOperationIcon} alt="New operation icon"></img>
          </div>
        </div>
      </div>

      {/* Operation Cards Section */}
      <OperationsList>
        {
          operations ? <img style={{width: "80px"}} src={LoadingAnimation} alt="Loading animations"></img> : 
          operations.map((op) => {
            return (
              <OperationCard
                key={op.operation_id}
                amount={op.operation_amount}
                date={op.operation_date}
                desc={op.operation_desc}
                type={op.operation_type}
              />
            );
          })
        }
      </OperationsList>
      {/* <div id="operations-container">{}</div> */}
    </div>
  );
}

export default App;
