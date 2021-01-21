import React from 'react'
import { Prefix, NSNameLabels, Brackets, Settings, Links } from '..'
import { Symbols } from '../helpers/constants'

const NodeTag = props =>
    <>
        <Prefix
            path={[...props.path]}
            data={props.data}
            root={props.root}
            prefix={props.prefix}
            spacing={props.spacing}
            prefixArray={props.prefixArray}
            clipboard={props.clipboard}
            openTag={props.openTag}
            prefixEnabled={props.prefixEnabled}
            twoLines={Settings.PREFIX_TWO_LINES}
            setSelected={props.setSelected}
            setEditor={props.setEditor}
            clearEditor={props.clearEditor}
            writeable={props.writeable} />

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

        <NSNameLabels
            path={props.path}
            data={props.data}
            root={props.root}
            setEditor={props.setEditor}
            setPath={props.setPath}
            writeable={props.writeable} />

        {!props.openTag &&
            <Brackets.NodeCloseEndCaret />
        }
    </>

export default NodeTag