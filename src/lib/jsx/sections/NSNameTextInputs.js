import React from 'react'
import { TextInputs, Brackets, Sizes } from '..'

const NSNameTextInputs = props =>
    <>
        <Brackets.NodeOpenStartCaret />
        <TextInputs.NSInput
            onChange={(event) => props.setNewNS(event.target.value)}
            value={props.newNS}
            size={Sizes.NSSize}
            maxlength={Sizes.NSMaxLength} />
        <Brackets.NodeNSSeparator />
        <TextInputs.NameInput
            onChange={(event) => props.setNewName(event.target.value)}
            value={props.newName}
            size={Sizes.NameSize}
            maxlength={Sizes.NameMaxLength} />
        <Brackets.NodeOpenEndCaret />
    </>

export default NSNameTextInputs