import React from 'react'

// Assets
import ExpenseIcon from '../../assets/expense-icon.svg';
import IncomeIcon from '../../assets/income-icon.svg';
import EditIcon from '../../assets/edit-button.svg';
import DeleteIcon from '../../assets/delete-button.svg';

// Styles
import './operation-card.styles.css';

const OperationCard = ({operationAmount, operationDate, operationDesc}) => {
    return (
        <div className="operation-card">
            <img className="operation-type-icon" src={ExpenseIcon} alt="Expense Icon"/>
            <div className="operation-info">
                <h2>- ${operationAmount}</h2>
                <h3>{operationDate}</h3>
                <p>{operationDesc}</p>
            </div>
            <div className="action-buttons-container">
                <button className="action-button"><img src={EditIcon} alt="Edit icon"/></button>
                <button className="action-button"><img src={DeleteIcon} alt="Delete icon"/></button>
            </div>
        </div>
    )
}

export default OperationCard;