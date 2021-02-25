import React from 'react'
import { TextInputs, Buttons, Labels } from '..'

const NewAttribute = (props) =>
    !props.isOpen ?
    <>
        {props.newAttr ?
            <>
                <TextInputs.AttNSInput
                    onChange={(event) => props.setNewAttNS(event.target.value)}
                    onFocus={(event) => event.target.select()}
                    value={props.ns} />
                <TextInputs.AttNameInput
                    onChange={(event) => props.setNewAttName(event.target.value)}
                    onFocus={(event) => event.target.select()}
                    value={props.name} />
                <TextInputs.AttValueInput
                    onChange={(event) => props.setNewAttValue(event.target.value)}
                    onFocus={(event) => event.target.select()}
                    value={props.value} />
                <Buttons.StandardButton onClick={() => props.insertAttribute(props.atts)}>
                    {Labels.SaveAttribute}
                </Buttons.StandardButton>
                <Buttons.StandardButton onClick={() => props.newFieldsOpenClose(false)}>
                    {Labels.CancelAttribute}
                </Buttons.StandardButton>
            </> :
            <Buttons.StandardButton onClick={() => props.newFieldsOpenClose(true)}>
                {Labels.NewAttribute}
            </Buttons.StandardButton>
        }
    </> :
    null

export default NewAttribute