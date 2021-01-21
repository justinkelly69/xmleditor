import React from 'react'

const DropDownList = props =>
    <select value={props.value}
        onChange={props.onChange}>
        {Object.keys(props.values).map(k =>
            <option key={k} value={k} >{k}</option>
        )}
    </select>

export default DropDownList