import React, { useState } from 'react'
import { Prefix, Brackets, CommentView, Settings, Fields, Sections, Links, Symbols } from '.'

const CommentElement = props => {

    const [mOpen, setMOpen] = useState(false)

    return (
        <Sections.TextSection selected={props.writeable && props.data.q}>
            <Prefix
                path={props.path}
                data={props.data}
                root={props.root}
                prefix={props.prefix}
                spacing={props.spacing}
                prefixArray={props.prefixArray}
                clipboard={props.clipboard}
                openTag={true}
                prefixEnabled={props.prefixEnabled}
                twoLines={Settings.PREFIX_TWO_LINES}
                setSelected={props.setSelected}
                setEditor={props.setEditor}
                clearEditor={props.clearEditor}
                writeable={props.writeable} />

            {props.showSwitches &&
                <Links.NodeLink onClick={() => setMOpen(!mOpen)}>
                    {mOpen ?
                        Symbols.ToggleOpen :
                        Symbols.ToggleClose
                    }
                </Links.NodeLink>
            }

            <Fields.CommentBody>
                <Brackets.CommentOpenBracket />
                <CommentView
                    data={props.data}
                    mOpen={mOpen}
                    path={props.path}
                    spacing={props.spacing}
                    setEditor={props.setEditor}
                    setPath={props.setPath}
                    showSwitches={props.showSwitches}
                    writeable={props.writeable} />
                <Brackets.CommentCloseBracket />
            </Fields.CommentBody>

        </Sections.TextSection>
    )
}
export default CommentElement