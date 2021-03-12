import React from 'react'
import styled from 'styled-components'
import { Colors, CheckboxStyles } from '..'

export const Checkbox = props => <input type="checkbox" {...props} />

export const NormalizeCheckbox = styled(Checkbox)`
    height: ${CheckboxStyles.height};
	width: ${CheckboxStyles.width};
`