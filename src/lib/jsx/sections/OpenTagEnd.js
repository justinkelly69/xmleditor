import React from 'react'
import { Links, Brackets, Symbols } from '..'

const OpenTagEnd = props =>
    <>
        <Brackets.NodeOpenEndCaret />
        {props.showSwitches && props.canOpen ?
            <Links.NodeLink
                onClick={() => props.setAOpen(!props.aOpen)}
                aOpen={props.aOpen}>
                {props.aOpen ?
                    Symbols.ToggleOpen :
                    Symbols.ToggleClose
                }
            </Links.NodeLink> :
            null
        }
    </>

export default OpenTagEnd