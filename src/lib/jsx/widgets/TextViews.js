import styled from 'styled-components'
import { Colors, Styles } from '..'

const ViewArea = styled.span `
    border: ${Styles.TextAreaBorderWidth} solid ${Colors.TextAreaBorderColor};
    background-color: ${Colors.TextAreaBackgroundColor};
    border-radius: ${Styles.TextAreaBorderRadius};
    font: ${Styles.TextAreaFont};
    font-weight: ${Styles.TextAreaFontWeight};
    height: auto;
    width: ${Styles.TextAreaWidth};
    max-width: 500px;
    display: inline-block;
    white-space: normal;
`
export const TextView = styled(ViewArea) `
    color: ${Colors.TextColor};
    border-color: ${Colors.TextInputBorderColor};
`
export const CDATAView  = styled(ViewArea) `
    color: ${Colors.CDATABodyColor};
    border-color: ${Colors.CDATABodyColor};
`
export const CommentView = styled(ViewArea) `
    color: ${Colors.CommentBodyColor};
    border-color: ${Colors.CommentBodyColor};
`
export const PIBodyView  = styled(ViewArea) `
    color: ${Colors.PIBodyColor};
    border-color: ${Colors.PIBodyColor};
`