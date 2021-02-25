import React, { useState } from 'react'
import { ChildElements, Constants, XMLHeader } from '.'

const XMLDisplay = props => {
    const [mode, setMode] = useState(Constants.NO_SELECTION)
    const [newNS, setNewNS] = useState("")
    const [newName, setNewName] = useState("")

    let spacing = 0
    return (
        <>
            {props.selectedNodes.length > 0 ? (
                <XMLHeader
                    mode={mode}
                    setMode={setMode}
                    newNS={newNS}
                    setNewNS={setNewNS}
                    newName={newName}
                    setNewName={setNewName}
                    {...props}
                />
            ) : null
            }
            <>
                <ChildElements
                    path={[]}
                    spacing={spacing}
                    elements={props.selectedNodes}
                    prefixEnabled={false}
                    showClosingTag={true}
                    {...props}
                />
            </>
        </>
    )
}

export default XMLDisplay