import React from 'react'
import * as SNAC from '../../snac/snac'
import { Editors, Fields, Sizes, Symbols, TextViews, Prefix, Panels } from '..'

const CDATAView = (props) =>
    <Fields.CDATABody
        onClick={() => {
            props.writeable && props.setEditor({
                data: props.data,
                editor: Editors.CDATA_EDITOR,
                path: props.path
            })
        }}
        onMouseOver={() => {
            props.setPath(props.path)
        }}
        onMouseOut={() => {
            props.setPath([])
        }}>
        {!props.showSwitches ?
            SNAC.escapeCDATA(props.data.D) :
            props.dOpen ?
                <>
                    <Panels.NewLine />
                    <Prefix
                        prefixEnabled={false}
                        spacing={props.spacing + props.path.length}
                    />
                    <TextViews.CDATAView>
                        {SNAC.escapeCDATA(props.data.D)}
                    </TextViews.CDATAView>
                    <Prefix
                        prefixEnabled={false}
                        spacing={props.spacing + props.path.length}
                    />
                    <Panels.NewLine />
                </> :
                SNAC.normalize(props.data.D).substr(0, Sizes.TextPreviewLength) + Symbols.TextElipsis
        }
    </Fields.CDATABody>

export default CDATAView