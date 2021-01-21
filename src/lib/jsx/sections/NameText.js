import React from 'react'
import { Editors } from '../helpers/constants'
import { Fields } from '..'

const NameText = props =>
    <Fields.Name className={props.className}
        onClick={() => {
            props.writeable && props.setEditor({
                data: props.data,
                editor: Editors.NODE_EDITOR,
                path: props.path
            })
        }}
        onMouseOver={() => { props.setPath(props.path) }}
        onMouseOut={() => { props.setPath([]) }} >
        {props.data.N}
    </Fields.Name>

export default NameText