import React, { useState } from 'react'
import { Prefix, PILang, PIView, Brackets, Sections, Settings, Links, Symbols } from '.'

const PIElement = props => {
    const [pOpen, setPOpen] = useState(false)

    return (
        <Sections.TextSection selected={props.writeable && props.data.q}>
            <Prefix
                openTag={true}
                twoLines={Settings.PREFIX_TWO_LINES}
                {...props}
            />
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
                pOpen={pOpen}
                {...props}
            />
            <Brackets.PICloseBracket />
        </Sections.TextSection>
    )
}
export default PIElement