import React from 'react'
import { Buttons, Editors } from '..'

const PrefixButton = props =>
    <>
        {props.writeable ?
            <Buttons.SelectXML openTag={props.openTag}
                onClick={() => {
                    props.openTag && props.setSelected(props.path, (root, selectedPaths, selectedNodes) => {
                        props.setEditor({
                            data: props.data,
                            editor: Editors.XML_DISPLAY,
                            path: props.path,
                            prefix: props.prefix,
                            root,
                            selectedPaths,
                            selectedNodes
                        })
                    })
                }}
                disabled={!props.openTag}>
            </Buttons.SelectXML> :
            null
        }
    </>

export default PrefixButton