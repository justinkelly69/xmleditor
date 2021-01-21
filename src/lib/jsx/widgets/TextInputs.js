import styled from 'styled-components'
import { Colors, Styles } from '..'

export const TextInput = styled.input`
	border: ${Styles.TextInputBorderWidth} solid ${Colors.TextInputBorderColor};
	background-color: ${Colors.TextInputBackgroundColor};
	border-radius: ${Styles.TextInputBorderRadius};
	font: ${Styles.TextInputFont};
    font-weight: ${Styles.TextInputFontWeight};
    height: ${Styles.TextInputHeight};
    width: ${Styles.TextInputWidth};
`
export const NSInput = styled(TextInput)`
    color: ${Colors.NSColor};
    border-color: ${Colors.NSColor};
    width: 5em;
`
export const NameInput = styled(TextInput)`
    color: ${Colors.NameColor};
    border-color: ${Colors.NameColor};
    width: 10em;
`
export const AttNSInput = styled(TextInput)`
    color: ${Colors.AttributeNSColor};
    border-color: ${Colors.AttributeNSColor};
    width: 5em;
`
export const AttNameInput = styled(TextInput)`
    color: ${Colors.AttributeNameColor};
    border-color: ${Colors.AttributeNameColor};
    width: 10em
`
export const AttValueInput = styled(TextInput)`
    color: ${Colors.AttributeValueColor};
    border-color: ${Colors.AttributeValueColor};
    width: 10em;
`
export const PILangInput = styled(TextInput)`
    color: ${Colors.PILangColor};
    border-color: ${Colors.PILangColor};
    width: 10em;
`