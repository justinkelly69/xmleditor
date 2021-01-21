import React, { useState } from 'react'
import { CDATAView, Brackets, Prefix, Settings, Sections, Fields, Links, Symbols } from '.'

const CDATAElement = props => {

    const [dOpen, setDOpen] = useState(false)

    return (
        <Sections.TextSection selected={props.writeable && props.data.q}>
            <Prefix
                path={props.path}
                data={props.data}
                root={props.root}
                prefix={props.prefix}
                spacing={props.spacing}
                prefixArray={props.prefixArray}
                /* clipboard={props.clipboard} */
                openTag={true}
                prefixEnabled={props.prefixEnabled}
                twoLines={Settings.PREFIX_TWO_LINES}
                setSelected={props.setSelected}
                setEditor={props.setEditor}
                clearEditor={props.clearEditor}
                writeable={props.writeable} />

            {props.showSwitches &&
                <Links.NodeLink onClick={() => setDOpen(!dOpen)}>
                    {dOpen ?
                        Symbols.ToggleOpen :
                        Symbols.ToggleClose
                    }
                </Links.NodeLink>
            }

            <Fields.CDATABody>
                <Brackets.CDATAOpenBracket />
                <CDATAView
                    data={props.data}
                    path={props.path}
                    spacing={props.spacing}
                    setEditor={props.setEditor}
                    setPath={props.setPath}
                    showSwitches={props.showSwitches}
                    writeable={props.writeable}
                    dOpen={dOpen}
                />
                <Brackets.CDATACloseBracket />
            </Fields.CDATABody>
        </Sections.TextSection>
    )
}
export default CDATAElement