import styled from 'styled-components'
import { Colors, ButtonStyles, PanelButtonsRight } from '..'

export const Button = styled.button`
    height: ${ButtonStyles.height};
	width: ${ButtonStyles.width};
	padding: ${ButtonStyles.padding};
	border: ${ButtonStyles.border};
	border-radius: ${ButtonStyles.borderRadius};
	background-image: ${ButtonStyles.backgroundImage};
  	box-shadow: ${ButtonStyles.boxShadow};
	font: ${ButtonStyles.font};
	font-weight: ${ButtonStyles.fontWeight};
	font-size: ${ButtonStyles.fontSize};
	color: ${ButtonStyles.color};
`
// NODE BUTTONS

export const StandardButton = styled(Button)`
	width: ${PanelButtonsRight.width};
	margin: 0;
`
export const CDATAButton = styled(Button)`
	background-image: none;
	background-color: ${Colors.CDATABodyColor};
	color: black;
	width: ${PanelButtonsRight.width};
	margin: 0;
`
export const CommentButton = styled(Button)`
	background-image: none;
	background-color: ${Colors.CommentBodyColor};
	color: black;
	width: ${PanelButtonsRight.width};
	margin: 0;
`
export const PIButton = styled(Button)`
	background-image: none;
	background-color: ${Colors.PIBodyColor};
	color: white;
	width: ${PanelButtonsRight.width};
	margin: 0;
`
export const SelectXML = styled(Button)`
	background-image: ${props => props.openTag ? ButtonStyles.backgroundImage : "none"} ;
	background-color: ${props => props.openTag ? Colors.PrefixButtonShowColor : Colors.PrefixButtonHideColor};
	height: 1em;
	width: 1em;
	box-shadow: none;
	/* border-radius: 50%; */
`
export const AttributesButton = styled(Button)`
	background-image: ${ButtonStyles.backgroundImage} ;
	background-color: ${props => props.aOpen ? Colors.PrefixButtonShowColor : Colors.PrefixButtonHideColor};
	color: white;
	height: 1em;
	width: 1em;
	box-shadow: none;
`
export const ChildrenButton = styled(Button)`
	background-image: ${ButtonStyles.backgroundImage} ;
	background-color: ${props => props.cOpen ? Colors.PrefixButtonShowColor : Colors.PrefixButtonHideColor};
	color: white;
	height: 1em;
	width: 1em;
	box-shadow: none;
`
export const TextButton = styled(Button)`
	background-image: ${ButtonStyles.backgroundImage} ;
	background-color: ${props => props.tOpen ? Colors.PrefixButtonShowColor : Colors.PrefixButtonHideColor};
	color: white;
	height: 1em;
	width: 1em;
	box-shadow: none;
`
/* 
▸
▾
▴
◂
▼
▲

 */