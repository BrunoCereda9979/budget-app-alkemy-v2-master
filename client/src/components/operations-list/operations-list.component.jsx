import React from 'react';

// Styles
import './operations-list.styles.css';

// Components
import OperationCard from '../operation-card/operation-card.component';

const OperationsList = ({ children }) => {
    return (
        <div className="operations-container">
            { children }
        </div>
    )
}

export default OperationsList;