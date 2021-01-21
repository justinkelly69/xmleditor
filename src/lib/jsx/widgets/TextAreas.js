import styled from 'styled-components'
import { Colors, Styles } from '..'

const TextArea = styled.textarea `
	border: ${Styles.TextAreaBorderWidth} solid ${Colors.TextAreaBorderColor};
	background-color: ${Colors.TextAreaBackgroundColor};
	border-radius: ${Styles.TextAreaBorderRadius};
	font: ${Styles.TextAreaFont};
    font-weight: ${Styles.TextAreaFontWeight};
    height: 100%;
    min-height: ${Styles.TextAreaMinHeight};
    width: 100%;
`
export const TextInput = styled(TextArea) `
    color: ${Colors.TextColor};
    border-color: ${Colors.TextInputBorderColor};
`
export const CDATAInput  = styled(TextArea) `
    color: ${Colors.CDATABodyColor};
    border-color: ${Colors.CDATABodyColor};
`
export const CommentInput = styled(TextArea) `
    color: ${Colors.CommentBodyColor};
    border-color: ${Colors.CommentBodyColor};
`
export const PIBodyInput  = styled(TextArea) `
    color: ${Colors.PIBodyColor};
    border-color: ${Colors.PIBodyColor};
`
