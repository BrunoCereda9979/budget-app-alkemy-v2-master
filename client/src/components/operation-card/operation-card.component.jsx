import React from 'react';
import Modal from 'react-modal';

// Assets
import ExpenseIcon from '../../assets/expense-icon.svg';
import IncomeIcon from '../../assets/income-icon.svg';
import EditIcon from '../../assets/edit-button.svg';
import DeleteIcon from '../../assets/delete-button.svg';

// Styles
import './operation-card.styles.css';

// Components
import Form from '../form/form.component';

const OperationCard = ({id, amount, date, desc, type, deleteAction, modalAction}) => {
    return (
        <div className="operation-card">
            {
                type === 'expense' 
                ? <img className="operation-type-icon" src={ExpenseIcon} alt="Expense Icon"/> 
                : <img className="operation-type-icon" src={IncomeIcon} alt="Expense Icon"/>
            }
            <div className="operation-info">
                <h2>{type === 'expense' ? '-' : '+'} ${amount}</h2>
                <h3>{date}</h3>
                <p>{desc}</p>
            </div>
            <div className="action-buttons-container">
                <button className="action-button" onClick={() => modalAction(true)}><img src={EditIcon} alt="Edit icon"/></button>
                <button className="action-button" onClick={() => deleteAction(id)}><img src={DeleteIcon} alt="Delete icon"/></button>
            </div>
        </div>
    )
}

export default OperationCard;