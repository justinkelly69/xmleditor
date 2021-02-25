import React from 'react'
import { Fields, Brackets, Editors } from '..'

const NSNameLabels = props =>
    <>
        {props.data.S ?
            <>
                <Fields.NS onClick={() => {
                    props.writeable && props.setEditor({
                        data: props.data,
                        editor: Editors.NODE_EDITOR,
                        path: props.path
                    })
                }}
                    onMouseOver={() => { props.setPath(props.path) }}
                    onMouseOut={() => { props.setPath([]) }} >
                    {props.data.S}
                </Fields.NS>
                <Brackets.NodeNSSeparator />
            </> :
            null
        }
        <Fields.Name onClick={() => {
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
    </>

export default NSNameLabels