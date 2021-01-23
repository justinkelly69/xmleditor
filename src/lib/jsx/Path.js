import React from 'react'
import { NSNameLabels, Sizes, Fields, Brackets, PILang, Panels } from '.'
//import * as SNAC from '../snac/snac'
import SNAC from '../snac'
import { Symbols } from './helpers/constants'

const Path = props => {
    let pathRow = props.pathRow.map((path, index) =>
        index > 0 && (
            SNAC.itemType(path) === 'N' ? (
                <NodeItem key={path._} path={path} />
            ) : SNAC.itemType(path) === 'A' ? (
                <AttributeItem key={path._} path={path} />
            ) : SNAC.itemType(path) === 'T' ? (
                <TextItem key={path._} path={path} />
            ) : SNAC.itemType(path) === 'D' ? (
                <CDATAItem key={path._} path={path} />
            ) : SNAC.itemType(path) === 'M' ? (
                <CommentItem key={path._} path={path} />
            ) : SNAC.itemType(path) === 'P' ? (
                <PIItem key={path._} path={path} />
            ) : null
        )
    )

    return (
        <Panels.PathRow>
            {pathRow}
        </Panels.PathRow>
    )
}

const NodeItem = props => {
    return (
        <>
            <Brackets.PathSeparator />
            <NSNameLabels data={props.path} />
        </>
    )
}
const AttributeItem = props =>
    <Fields.Attribute>
        <Brackets.AttributeOpenBracket />
        <Brackets.AttributeAtSign />
        {props.path.ns !== '@' ?
            <>
                <Fields.AttributeNS>{props.path.ns}</Fields.AttributeNS>
                <Brackets.AttributeNSSeparator />
            </> :
            null
        }
        <Fields.AttributeName>{props.path.name}</Fields.AttributeName>
        <Brackets.AttributeEquals />
        <Brackets.AttributeQuote />
        <Fields.AttributeValue>{props.path.value}</Fields.AttributeValue>
        <Brackets.AttributeQuote />
        <Brackets.AttributeCloseBracket />
    </Fields.Attribute>

const TextItem = props =>
    <Fields.TextBody>
        <Brackets.PathSeparator />
        <Brackets.TextQuote />
        {props.path.T.length > Sizes.TextPathLength ?
            props.path.T.trim().substr(0, Sizes.TextPathLength) + Symbols.TextElipsis :
            props.path.T.trim()
        }
        <Brackets.TextQuote />
    </Fields.TextBody>

const CDATAItem = props =>
    <Fields.CDATABody>
        <Brackets.PathSeparator />
        <Brackets.CDATAOpenBracket />
        {props.path.D.length > Sizes.TextPathLength ?
            props.path.D.trim().substr(0, Sizes.TextPathLength) + Symbols.TextElipsis :
            props.path.D.trim()
        }
        <Brackets.CDATACloseBracket />
    </Fields.CDATABody>

const CommentItem = props =>
    <Fields.CommentBody>
        <Brackets.PathSeparator />
        <Brackets.CommentOpenBracket />
        {props.path.M.length > Sizes.TextPathLength ?
            props.path.M.trim().substr(0, Sizes.TextPathLength) + Symbols.TextElipsis :
            props.path.M.trim()
        }
        <Brackets.CommentCloseBracket />
    </Fields.CommentBody>

const PIItem = props =>
    <Fields.PIBody>
        <Brackets.PathSeparator />
        <Brackets.PIOpenBracket />
        <PILang data={props.path} />
        {props.path.B.length > Sizes.TextPathLength ?
            props.path.B.trim().substr(0, Sizes.TextPathLength) + Symbols.TextElipsis :
            props.path.B.trim()
        }
        <Brackets.PICloseBracket />
    </Fields.PIBody>


export default Path