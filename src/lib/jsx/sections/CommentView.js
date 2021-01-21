import React from 'react'
import * as SNAC from '../../snac/snac'
import { Editors, Fields, Sizes, Symbols, TextViews, Prefix, Panels } from '..'

const CommentView = (props) =>
    <Fields.CommentBody
        onClick={() => {
            props.writeable && props.setEditor({
                data: props.data,
                editor: Editors.COMMENT_EDITOR,
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
            SNAC.escapeComment(props.data.M) :
            props.mOpen ?
                <>
                    <Panels.NewLine />
                    <Prefix
                        prefixEnabled={false}
                        spacing={props.spacing + props.path.length}
                    />
                    <TextViews.CommentView>
                        {SNAC.escapeComment(props.data.M)}
                    </TextViews.CommentView>
                    <Prefix
                        prefixEnabled={false}
                        spacing={props.spacing + props.path.length}
                    />
                    <Panels.NewLine />
                </> :
                SNAC.normalize(props.data.M).substr(0, Sizes.TextPreviewLength) + Symbols.TextElipsis
        }
    </Fields.CommentBody>

export default CommentView