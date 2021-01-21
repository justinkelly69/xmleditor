import React, { useState } from 'react'
import { Prefix, PILang, PIView, Brackets, Sections, Settings, Links, Symbols } from '.'

const PIElement = props => {

    const [pOpen, setPOpen] = useState(false)

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
                <Links.NodeLink onClick={() => setPOpen(!pOpen)}>
                    {pOpen ?
                        Symbols.ToggleOpen :
                        Symbols.ToggleClose
                    }
                </Links.NodeLink>
            }

            <Brackets.PIOpenBracket />
            <PILang data={props.data} />
            <PIView
                data={props.data}
                pOpen={pOpen}
                path={props.path}
                spacing={props.spacing}
                setPath={props.setPath}
                setEditor={props.setEditor}
                showSwitches={props.showSwitches}
                writeable={props.writeable} />
            <Brackets.PICloseBracket />

        </Sections.TextSection>
    )
}
export default PIElement