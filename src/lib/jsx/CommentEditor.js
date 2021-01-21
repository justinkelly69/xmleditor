import React, { useState } from 'react'
import { TextAreas, Panels, CommentHeader } from '.'

const CommentEditor = props => {
    const [comment, setComment] = useState(props.data.M)
    return (
        <Panels.Panel>

            <CommentHeader
                canEdit={true}
                path={props.path}
                root={props.root}
                data={props.data}
                comment={comment}
                unwrapNode={props.unwrapNode}
                clearEditor={props.clearEditor}
                saveComment={props.saveComment} />

            <Panels.PanelBody>

                <TextAreas.CommentInput
                    onChange={(event) => setComment(event.target.value)}
                    value={comment}
                />
                
            </Panels.PanelBody>

        </Panels.Panel>
    )
}
export default CommentEditor