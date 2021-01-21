import React from 'react'

const WriteableButtons = props =>
    <span className="snac-radio-buttons"
        onChange={props.selectValue}
        value={props.writeable}>

        <input type="radio"
            name="writeable"
            value={false}
            onChange={f => f}
            checked={!props.value} /> READ_ONLY

        <input type="radio"
            name="writeable"
            value={true}
            onChange={f => f}
            checked={props.value} /> READ_WRITE
    </span>

export default WriteableButtons