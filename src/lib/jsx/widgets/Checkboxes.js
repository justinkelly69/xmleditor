import React from 'react'
import styled from 'styled-components'
import { Colors, CheckboxStyles } from '..'

export const Checkbox = props =>
    <label>
        <input type="checkbox" {...props} />
        {props.label}
    </label>

export const NormalizeCheckbox = styled(Checkbox)`
    height: ${CheckboxStyles.height};
	width: ${CheckboxStyles.width};
`