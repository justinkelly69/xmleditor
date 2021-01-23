import React from 'react'
import { Brackets, Fields } from '..'
import SNAC from '../../snac'

const AttributeNSName = props =>
    <>
        {props.ns && props.ns !== '@' ?
            <>
                <Fields.AttributeNS
                    onMouseOver={() => {
                        props.setPath(
                            props.path,
                            SNAC.getAttribute(props.ns, props.name, props.data.A)
                        )
                    }}
                    onMouseOut={() => { props.setPath([]) }}>
                    {props.ns}
                </Fields.AttributeNS>
                <Brackets.AttributeNSSeparator />
            </> :
            null
        }
        <Fields.AttributeName
            onMouseOver={() => {
                props.setPath(
                    props.path,
                    SNAC.getAttribute(props.ns, props.name, props.data.A)
                )
            }}
            onMouseOut={() => { props.setPath([]) }}>
            {props.name}
        </Fields.AttributeName>
    </>

export default AttributeNSName