import styled from 'styled-components'

import { Colors } from '..'

export const Node = styled.span`
    color: ${Colors.NodeColor};
    font-weight: bold;
`
export const NodeBracket = styled.span`
    color: ${Colors.NodeBracketColor};
    font-weight: bold;
`
export const NodeSeparator = styled.span`
    color: ${Colors.NodeSeparatorColor};
    font-weight: bold;
`
export const NodeToggle = styled.span`
    color: ${Colors.NodeToggleColor};
    font-weight: bold;
`
export const NS = styled.span`
    color: ${Colors.NSColor};
    font-weight: bold;
`
export const Name = styled.span`
    color: ${Colors.NameColor};
    font-weight: bold;
`
export const Attribute = styled.span`
    color: ${Colors.AttributeColor};
    font-weight: bold;
`
export const AttributeNS = styled.span`
    color: ${Colors.AttributeNSColor};
    text-decoration: ${props => props.isDeleted ? 'line-through' : 'none'};
    font-weight: bold;
`
export const AttributeName = styled.span`
    color: ${Colors.AttributeNameColor};
    text-decoration: ${props => props.isDeleted ? 'line-through' : 'none'};
    font-weight: bold;
`
export const AttributeValue = styled.span`
    color: ${Colors.AttributeValueColor};
    text-decoration: ${props => props.isDeleted ? 'line-through' : 'none'};
    font-weight: bold;
`
export const AttributeNSSeparator = styled.span`
    color: ${Colors.AttributeSeparatorColor};
    font-weight: bold;
`
export const AttributeAtSign = styled.span`
    color: ${Colors.AttributeAtSignColor};
    font-weight: bold;
`
export const AttributeEquals = styled.span`
    color: ${Colors.AttrEqualsColor};
    font-weight: bold;
`
export const AttributeQuote = styled.span`
    color: ${Colors.AttrQuoteColor};
    font-weight: bold;
`
export const AttributeToggle = styled.span`
    color: ${Colors.AttributeToggleColor};
    font-weight: bold;
`
export const CDATAHeading = styled.span`
    color: ${Colors.CDATAHeadingColor};
    font-weight: bold;
`
export const CDATALabel = styled.span`
    color: ${Colors.CDATALabelColor};
    font-weight: bold;
`
export const CDATABody = styled.span`
    color: ${Colors.CDATABodyColor};
    font-weight: bold;
    white-space: pre-wrap;
`
export const CDATAToggle = styled.span`
    color: ${Colors.CDATAToggleColor};
    font-weight: bold;
`
export const CommentHeading = styled.span`
    color: ${Colors.CommentHeadingColor};
    font-weight: bold;
`
export const CommentBody = styled.span`
    color: ${Colors.CommentBodyColor};
    font-weight: bold;
    white-space: pre-wrap;
`
export const CommentToggle = styled.span`
    color: ${Colors.CommentToggleColor};
    font-weight: bold;
`
export const PIHeading = styled.span`
    color: ${Colors.PIHeadingColor};
    font-weight: bold;
`
export const PILang = styled.span`
    color: ${Colors.PILangColor};
    font-weight: bold;
`
export const PIBody = styled.span`
    color: ${Colors.PIBodyColor};
    font-weight: bold;
    white-space: pre-line;
`
export const PIToggle = styled.span`
    color: ${Colors.PIToggleColor};
    font-weight: bold;
`
export const TextBody = styled.span`
    color: ${Colors.TextColor};
    font-weight: normal;
    white-space: pre-wrap;
`
export const TextToggle = styled.span`
    color: ${Colors.TextToggleColor};
    font-weight: bold;
`
export const TextBracket = styled.span`
    color: ${Colors.TextBracketColor};
    font-weight: bold;
`
export const Prefix = styled.span`
    color: ${Colors.PrefixColor};
    font-weight: bold;
`
export const IsDeleted = styled.span`
    color: ${Colors.IsDeletedColor};
    font-weight: bold;
`
export const NotDeleted = styled.span`
    color: ${Colors.NotDeletedColor};
    font-weight: bold;
`