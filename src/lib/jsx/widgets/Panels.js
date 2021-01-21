import styled from 'styled-components'
import { PanelButtonsRight, Colors } from "..";

const Area = styled.div `
`
const List = styled.ul `
	display: flex;
	flex-flow: row nowrap;
	padding-left: 0;
	list-style-type: none;
	align-items: stretch;
	margin: 0;
`
const ListItem = styled.li `
	margin-top: 0;
`
export const Panel = styled(Area) `
	white-space: pre;
	font-family: 'Courier New', Courier, monospace;
	font-size: 10pt;
	height: 100%;
	/* min-height: 500px;
	width: 500px; */
`
export const PanelHeader = styled(List) `
	/* background-color: #eef; */
	height: 2em;
	width: 100%;
	padding-top: .2em;
`
export const PanelItem = styled(ListItem) `
	flex-basis: ${props => props.flexBasis ? props.flexBasis : 'auto'};
	flex-grow: ${props => props.flexGrow ? props.flexGrow : 0};
	flex-shrink: ${props => props.flexShrink ? props.flexShrink : 1};
	margin-right: ${props => props.marginRight ? props.marginRight : 0};
`
export const PanelSpacing = styled(ListItem) `
	margin-left: auto;
`
export const PanelItemRight = styled(PanelItem) `
	flex: 1;
	flex-grow: 0;
	margin-right: ${PanelButtonsRight.marginRight};
`
export const PanelBody = styled(Area) `
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
`
export const EditAttributes = styled.div `
	display: grid;
	grid-auto-flow: row;
	grid-template-columns: 1fr 1fr 3fr 1fr;
	grid-template-rows: 1.6em repeat(${props => props.length}, 1.6em) 1.6em;
`
export const EditAttribute = styled.div `
	padding-top: 0;
	padding-bottom: 0;
`
export const EditAttributeItem = styled.div `
	background-color: ${props => props.oddEven ? Colors.OddColor : Colors.EvenColor};
	vertical-align: middle;
`
export const Attributes = styled.span `
	display: 'inline'
`
export const Attribute = styled.span `
	display: ${props => props.aOpen ? 'block' : 'inline'}
`
export const Prefix = styled.span `
	display: 'inline';
`
export const NewLine = styled.br ``

export const PathRow = styled.div `
	white-space: pre;
	font-family: 'Courier New', Courier, monospace;
	font-size: 10pt;
`