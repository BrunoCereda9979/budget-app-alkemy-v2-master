import { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-modal';

// Styles
import "./App.css";

// Components
import OperationCard from "./components/operation-card/operation-card.component";
import OperationsList from "./components/operations-list/operations-list.component";
import Form from "./components/form/form.component";

// Assets
import NewOperationIcon from "./assets/new-operation-icon.svg";
import LoadingAnimation from "./assets/loading-animation.svg";

// Fix modal error
Modal.setAppElement('#root');

function App() {
  const [operations, setOperations] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // On render fetch the data
  useEffect(() => {
    axios.get("/api/operations")
      .then(res => setOperations(res.data.message.result))
      .catch(err => console.log(err));
  }, []);

  // Delete operation
  const deleteOperation = (id) => {
    console.log(`Deleting ID ${id}`);
    axios.delete('/api/operations', {data : {operationId: id}})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

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
        <div onClick={() => setModalOpen(true)} className="card btn" id="open-modal-btn">
          <div className="card-content button-card">
            <h1>Nueva Operacion</h1>
            <img src={NewOperationIcon} alt="New operation icon"></img>
          </div>
        </div>
      </div>

      {/* Add New Operation Modal */}
      <Modal isOpen={modalOpen} style={{overlay: {backgroundColor: 'black', textAlign: 'center'}}, {content: {borderRadius: '15px', backgroundColor: '#19204a', width: '350px', height: '400px', textAlign: 'center'}}}>
        <Form/>
        <button className="form-button" onClick={() => setModalOpen(false)}>Cerrar</button>
      </Modal>

      {/* Operation Cards Section */}
      <OperationsList>
        {
          !operations ? 'Loading Operations...' : 
          operations.map((op) => {
            return (
              <OperationCard
                key={op.operation_id}
                id={op.operation_id}
                amount={op.operation_amount}
                date={op.operation_date}
                desc={op.operation_desc}
                type={op.operation_type}
                deleteAction={deleteOperation}
                modalAction={setModalOpen}
              />
            );
          })
        }
      </OperationsList>
    </div>
  );
}

export default App;
