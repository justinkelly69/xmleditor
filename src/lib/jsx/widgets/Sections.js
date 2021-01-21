import styled from 'styled-components'
import { Colors } from '..'

const Section = styled.span `
	display: block;
	color: ${Colors.TextColor};
	background-color: ${props => props.selected ? Colors.SelectedBackgroundColor : Colors.UnselectedBackgroundColor};
`
export const NodeSection = styled(Section)`
	white-space: pre;
`
export const TextSection = styled(Section)`
	color: ${Colors.TextColor}
`
export const CDATASection = styled(Section)`
	color: ${Colors.CDATABodyColor}
`
export const CommentSection = styled(Section)`
	color: ${Colors.CommentBodyColor}
`
export const PISection = styled(Section)`
	color: ${Colors.PIBodyColor}
`
export const MainContainer = styled.section `
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	width: 100%;
`
export const TopRow = styled.section `
	display: flex;
	flex-direction: row;
	flex-basis: 40px;
	background-color: #ccccff;
	white-space: pre;
	font-family: 'Courier New', Courier, monospace;
	font-size: 10pt;
`
export const VerticalColumns = styled.section `
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: stretch;
	height: auto;
	min-height: 600px;
`
export const VerticalColumn = styled.section `
	white-space: pre;
	font-family: 'Courier New', Courier, monospace;
	font-size: 10pt;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	overflow-y: scroll;
`
export const PathRow = styled.section `
	display: flex;
	flex-direction: row;
	flex-basis: 20px;
	padding-top: 2px;
	background-color: #dddddd;
	white-space: pre;
	font-family: 'Courier New', Courier, monospace;
	font-size: 10pt;
`