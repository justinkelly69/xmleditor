import React from 'react'
//import * as SNAC from '../../snac/snac'
import SNAC from '../../snac'
import { Editors, Fields, Sizes, Symbols, TextViews } from '..'

const TextView = (props) =>
    <Fields.TextBody
        onClick={() => {
            props.writeable && props.setEditor({
                data: props.data,
                editor: Editors.TEXT_EDITOR
            })
        }}
        onMouseOver={() => {
            props.setPath(props.path)
        }}
        onMouseOut={() => {
            props.setPath([])
        }}>
        {!props.showSwitches ?
            SNAC.escapeXML(props.data.T) :
            props.tOpen ?
                <TextViews.TextView>
                    {SNAC.escapeXML(props.data.T)}
                </TextViews.TextView> :
                SNAC.normalize(props.data.T).substr(0, Sizes.TextPreviewLength) + Symbols.TextElipsis
        }
    </Fields.TextBody>

export default TextView