import React from 'react';
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

export default function ItemInput(props) {

    let { onFinish, onClose, open, ...otherProps } = props;
    if (open === false) return '';
    const captureInputValue = e => {
        let value = e.target.value,
            pressedBtn = e.keyCode || e.charCode;

        if (pressedBtn === ENTER_KEY) {
            onFinish(value);
            onClose();
        }

        else if (pressedBtn === ESCAPE_KEY)
            onClose();
    }

    return (
        <div>

            <input onKeyDown={captureInputValue} autoFocus type="text" {...otherProps} />

        </div>
    )
}