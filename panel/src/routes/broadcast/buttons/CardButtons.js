import React from 'react';
import CardButton from './CardButton';
const CardButtons = ({ buttons, addButton, removeButton, ...rest }) => {
    return (
        <span >
            <hr />
            <h3>Button</h3>
            {buttons.map((button, index) => (
                <CardButton key={index} {...rest} {...button} index={index} />
            ))}
        </span>
    )
}

export default CardButtons;
