import React from 'react';
import styles from './Card.module.css';

const Card = (props) => (
    <div className={styles.Card}>
        <div className="card">
            <div className="front">
                <div className="question">{props.question}</div>
            </div>
            <div className="back">
                <div className="answer">{props.answer}</div>
            </div>
        </div>
    </div>
);

export default Card;