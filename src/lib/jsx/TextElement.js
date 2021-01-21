import React, { useState } from 'react'
import { TextView, Prefix, Brackets, Settings, Sections, Fields, Symbols, Links } from '.'

const TextElement = props => {

    const [tOpen, setTOpen] = useState(false)

    return (
        <Sections.TextSection selected={props.writeable && props.data.q}>
            {props.writeable || props.data.T.trim().length > 0 ?
                <>
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
                            data={props.data}
                            setPath={props.setPath}
                            setEditor={props.setEditor}
                            writeable={props.writeable}
                            showSwitches={props.showSwitches}
                            path={props.path}
                            tOpen={tOpen} />

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