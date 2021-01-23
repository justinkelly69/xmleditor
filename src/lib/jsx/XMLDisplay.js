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
                    cutNodes={props.cutNodes}
                    copyNodes={props.copyNodes}
                    deleteNodes={props.deleteNodes}
                    wrapNodes={props.wrapNodes}
                    clearEditor={props.clearEditor}
                    clearSelected={props.clearSelected}
                />
            ) : null
            }
            <>
                <ChildElements
                    elements={props.selectedNodes}
                    data={props.data}
                    root={props.root}
                    path={[]}
                    prefix={props.prefix}
                    spacing={spacing}
                    clipboard={props.clipboard}
                    setEditor={props.setEditor}
                    clearEditor={props.clearEditor}
                    setSelected={props.setSelected}
                    prefixEnabled={false}
                    setPath={props.setPath}
                    writeable={props.writeable}
                    showSwitches={props.showSwitches}
                    showClosingTag={true} />
            </>
        </>
    )
}

export default XMLDisplay