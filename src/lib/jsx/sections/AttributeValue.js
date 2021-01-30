import React from 'react'
import * as SNAC from '../../snac'
import { Fields } from '..'

const AttributeValue = props =>
    <Fields.AttributeValue
        onMouseOver={() => {
            props.setPath(
                props.path,
                SNAC.getAttribute(props.ns, props.name, props.data.A)
            )
        }}
        onMouseOut={() => { props.setPath([]) }}>
        {props.writeable ?
            props.data.A[props.ns][props.name] :
            SNAC.escapeXML(props.data.A[props.ns][props.name])
        }
    </Fields.AttributeValue>

export default AttributeValue