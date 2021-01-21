import React from 'react'
import { Fields, Symbols } from '..'

const Brackets = {
    NodeOpenStartCaret: () =>
        <Fields.NodeBracket>
            {Symbols.NodeOpenStartCaret}
        </Fields.NodeBracket>
    ,
    NodeOpenEndCaret: () =>
        <Fields.NodeBracket>
            {Symbols.NodeOpenEndCaret}
        </Fields.NodeBracket>
    ,
    NodeCloseStartCaret: () =>
        <Fields.NodeBracket>
            {Symbols.NodeCloseStartCaret}
        </Fields.NodeBracket>
    ,
    NodeCloseEndCaret: () =>
        <Fields.NodeBracket>
            {Symbols.NodeCloseEndCaret}
        </Fields.NodeBracket>
    ,
    NodeEmptyEndCaret: () =>
        <Fields.NodeBracket>
            {Symbols.NodeEmptyEndCaret}
        </Fields.NodeBracket>
    ,
    NodeNSSeparator: () =>
        <Fields.NodeSeparator>
            {Symbols.NodeNSSeparator}
        </Fields.NodeSeparator>
    ,
    NodeToggleOpen: () =>
        <Fields.NodeToggle>
            {Symbols.NodeToggleOpen}
        </Fields.NodeToggle>
    ,
    NodeToggleClose: () =>
        <Fields.NodeToggle>
            {Symbols.NodeToggleClose}
        </Fields.NodeToggle>
    ,
    AttributeOpenBracket: () =>
        <Fields.AttributeNSSeparator>
            {Symbols.AttributeOpenBracket}
        </Fields.AttributeNSSeparator>
    ,
    AttributeAtSign: () =>
        <Fields.AttributeAtSign>
            {Symbols.AttributeAtSign}
        </Fields.AttributeAtSign>
    ,
    AttributeCloseBracket: () =>
        <Fields.AttributeNSSeparator>
            {Symbols.AttributeCloseBracket}
        </Fields.AttributeNSSeparator>
    ,
    AttributePrefixOff: () =>
        <Fields.Prefix>
            {Symbols.AttributePrefixOff}
        </Fields.Prefix>
    ,
    AttributePrefixOn: () =>
        <Fields.Prefix>
            {Symbols.AttributePrefixOn}
        </Fields.Prefix>
    ,
    AttributeQuote: () =>
        <Fields.AttributeQuote>
            {Symbols.AttributeQuote}
        </Fields.AttributeQuote>
    ,
    AttributeEquals: () =>
        <Fields.AttributeEquals>
            {Symbols.AttributeEquals}
        </Fields.AttributeEquals>
    ,
    AttributeNSSeparator: () =>
        <Fields.AttributeNSSeparator>
            {Symbols.AttributeNSSeparator}
        </Fields.AttributeNSSeparator>
    ,
    AttributeToggleOpen: () =>
        <Fields.AttributeToggle>
            {Symbols.AttributeToggleOpen}
        </Fields.AttributeToggle>
    ,
    AttributeToggleClose: () =>
        <Fields.AttributeToggle>
            {Symbols.AttributeToggleClose}
        </Fields.AttributeToggle>
    ,
    TextToggleOpen: () =>
        <Fields.TextToggle>
            {Symbols.TextToggleOpen}
        </Fields.TextToggle>
    ,
    TextToggleClose: () =>
        <Fields.TextToggle>
            {Symbols.TextToggleClose}
        </Fields.TextToggle>
    ,
    TextOpenBracket: () =>
        <Fields.TextBracket>
            {Symbols.TextOpenBracket}
        </Fields.TextBracket>
    ,
    TextCloseBracket: () =>
        <Fields.TextBracket>
            {Symbols.TextCloseBracket}
        </Fields.TextBracket>
    ,
    TextQuote: () =>
        <Fields.TextBracket>
            {Symbols.TextQuote}
        </Fields.TextBracket>
    ,
    CDATAOpenBracket: () =>
        <Fields.CDATAHeading>
            {Symbols.CDATAOpenBracketStart}
            <Fields.CDATALabel>
                {Symbols.CDATAOpenBracketLabel}
            </Fields.CDATALabel>
            {Symbols.CDATAOpenBracketEnd}
        </Fields.CDATAHeading>
    ,
    CDATACloseBracket: () =>
        <Fields.CDATAHeading>
            {Symbols.CDATACloseBracket}
        </Fields.CDATAHeading>
    ,
    CDATAToggleOpen: () =>
        <Fields.CDATAToggle>
            {Symbols.CDATAToggleOpen}
        </Fields.CDATAToggle>
    ,
    CDATAToggleClose: () =>
        <Fields.CDATAToggle>
            {Symbols.CDATAToggleClose}
        </Fields.CDATAToggle>
    ,
    CommentOpenBracket: () =>
        <Fields.CommentHeading>
            {Symbols.CommentOpenBracket}
        </Fields.CommentHeading>
    ,
    CommentCloseBracket: () =>
        <Fields.CommentHeading>
            {Symbols.CommentCloseBracket}
        </Fields.CommentHeading>
    ,
    CommentToggleOpen: () =>
        <Fields.CommentToggle>
            {Symbols.CommentToggleOpen}
        </Fields.CommentToggle>
    ,
    CommentToggleClose: () =>
        <Fields.CommentToggle>
            {Symbols.CommentToggleClose}
        </Fields.CommentToggle>
    ,
    PIOpenBracket: () =>
        <Fields.PIHeading>
            {Symbols.PIOpenBracket}
        </Fields.PIHeading>
    ,
    PICloseBracket: () =>
        <Fields.PIHeading>
            {Symbols.PICloseBracket}
        </Fields.PIHeading>
    ,
    PIToggleOpen: () =>
        <Fields.PIToggle>
            {Symbols.PIToggleOpen}
        </Fields.PIToggle>
    ,
    PIToggleClose: () =>
        <Fields.PIToggle>
            {Symbols.PIToggleClose}
        </Fields.PIToggle>
    ,
    DeleteIsDeleted: () =>
        <Fields.IsDeleted>
            {Symbols.DeleteIsDeleted}
        </Fields.IsDeleted>
    ,
    DeleteNotDeleted: () =>
        <Fields.NotDeleted>
            {Symbols.DeleteNotDeleted}
        </Fields.NotDeleted>
    ,
    PathSeparator: () =>
        <Fields.NodeSeparator>
            {Symbols.PathSeparator}
        </Fields.NodeSeparator>
}

export default Brackets