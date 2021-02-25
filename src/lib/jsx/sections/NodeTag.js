import React from 'react'
import { Prefix, NSNameLabels, Brackets, Settings, Links } from '..'
import { Symbols } from '../helpers/constants'

const NodeTag = props =>
    <>
        <Prefix
            twoLines={Settings.PREFIX_TWO_LINES}
            {...props}
        />
        {props.showSwitches &&
            <Links.NodeLink
                onClick={() => { props.setCOpen(!props.cOpen) }}
                active={props.cOpen}>
                {props.cOpen ?
                    Symbols.ToggleOpen :
                    Symbols.ToggleClose
                }
            </Links.NodeLink>
        }
        {props.openTag ?
            <Brackets.NodeOpenStartCaret /> :
            <Brackets.NodeCloseStartCaret />
        }
        <NSNameLabels {...props} />
        {!props.openTag &&
            <Brackets.NodeCloseEndCaret />
        }
    </>

export default NodeTag