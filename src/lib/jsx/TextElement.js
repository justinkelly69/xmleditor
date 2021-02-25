import React, { useState } from 'react'
import { TextView, Prefix, Brackets, Settings, Sections, Fields, Symbols, Links } from '.'

const TextElement = props => {
    const [tOpen, setTOpen] = useState(false)

    return (
        <Sections.TextSection selected={props.writeable && props.data.q}>
            {props.writeable || props.data.T.trim().length > 0 ?
                <>
                    <Prefix
                        openTag={true}
                        twoLines={Settings.PREFIX_TWO_LINES}
                        {...props}
                    />
                    {props.showSwitches &&
                        <Links.NodeLink onClick={() => setTOpen(!tOpen)}>
                            {tOpen ?
                                Symbols.ToggleOpen :
                                Symbols.ToggleClose
                            }
                        </Links.NodeLink>
                    }
                    <Fields.TextBody>
                        {props.writeable && !tOpen ?
                            <Brackets.TextOpenBracket /> :
                            null
                        }
                        <TextView
                            tOpen={tOpen}
                            {...props}
                        />
                        {props.writeable && !tOpen ?
                            <Brackets.TextCloseBracket /> :
                            null
                        }
                    </Fields.TextBody>
                </> :
                null
            }
        </Sections.TextSection>
    )
}
export default TextElement