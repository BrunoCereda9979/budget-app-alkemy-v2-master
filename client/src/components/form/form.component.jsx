import { React, useState, event } from 'react';
import axios from 'axios';

// Syles
import './form.styles.css';

const Form = () => {
    const [opDescription, setOperationDesc] = useState("");
    const [opAmount, setOperationAmount] = useState(0);
    const [opDate, setOperationDate] = useState("");
    const [opType, setOperationType] = useState("");

    // Post new operation
    const postNewOperation = (e) =>{
        e.preventDefault();

        console.log(opDescription + " " + opAmount + " " + opDate + " " + opType);
        const newOperation = {
            'operationDesc': opDescription,
            'operationAmount': opAmount,
            'operationDate': opDate,
            'operationType': opType
        }

        axios.post('http://localhost:3001/api/operations', {
            operationDesc: opDescription,
            operationAmount: opAmount,
            operationDate: opDate,
            operationType: opType
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <form onSubmit={e => postNewOperation(e)}>
            <h3>Agregar Nueva Operacion</h3>
            <input className="input" required type="text" onChange={(e) => setOperationDesc(e.target.value)} placeholder="Concepto"/>
            <input className="input" required type="number" onChange={(e) => setOperationAmount(e.target.value)} placeholder="Monto" min="1" step="any"/>
            <input className="date-input" required type="date" onChange={(e) => setOperationDate(e.target.value)}/>
            <div onChange={(e) => setOperationType(e.target.value)}>
                <input className="radio-button" checked={opType === 'income'} type="radio" name="operation-type" value="income"/> Ingreso
                <input className="radio-button" checked={opType === 'expense'} type="radio" name="operation-type" value="expense"/> Egreso
            </div>
            <div class="form-buttons-container">
                <input type="submit" className="form-button" value="Agregar"/>
            </div>
        </form>
    )
}

export default Form;