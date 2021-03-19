import { useEffect, useState } from "react";

// Styles
import "./App.css";

// Components
import OperationCard from "./components/operation-card/operation-card.component";

// Assets
import NewOperationIcon from "./assets/new-operation-icon.svg";
import ExpenseIcon from "./assets/expense-icon.svg";
import EditButton from "./assets/edit-button.svg";
import DeleteButton from "./assets/delete-button.svg";

function App() {
  return (
    <div className="App">
      {/* Cards Container Section */}
      <div id="cards-container">
        {/* Total Expenses Card */}
        <div className="card">
          <div className="card-content expenses-card">
            <h1>Balance Actual</h1>
            <p id="total-balance">$3522.00</p>
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
      <div id="operations-container">{}</div>
    </div>
  );
}

export default App;
