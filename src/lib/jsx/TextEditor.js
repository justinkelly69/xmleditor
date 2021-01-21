import React, { useState } from 'react'
import { TextAreas, NodeHeader, TextHeader, Panels, CDATAHeader, CommentHeader, PIHeader } from '.'

const TextEditor = props => {

    const [newNS, setNewNS] = useState("")
    const [newName, setNewName] = useState("")
    const [text, setText] = useState(props.data.T)
    const [textBefore, setTextBefore] = useState("")
    const [textInside, setTextInside] = useState("")
    const [textAfter, setTextAfter] = useState("")
    const [lang, setLang] = useState("")
    const [mode, setMode] = useState('T')

    const saveSelect = (target) => {
        let cursorStart = target.selectionStart
        let cursorEnd = target.selectionEnd

        setText(target.value)
        setTextBefore(text.substr(0, cursorStart))
        setTextInside(text.substr(cursorStart, cursorEnd - cursorStart))
        setTextAfter(text.substr(cursorEnd))
    }

    const saveEdit = (target) => {
        setText(target.value)
    }

    return (
        <Panels.Panel>
            <Panels.PanelHeader>
                {mode === 'T' ? (

                    <TextHeader
                        data={props.data}
                        text={text}
                        setMode={setMode}
                        saveText={props.saveText}
                        clearEditor={props.clearEditor} />


                ) : mode === 'N' ? (
                    <NodeHeader
                        canEdit={false}
                        data={props.data}
                        setNewNS={setNewNS}
                        setNewName={setNewName}
                        newNS={newNS}
                        newName={newName}
                        textBefore={textBefore}
                        textInside={textInside}
                        textAfter={textAfter}
                        pasteEnable={props.pasteEnable}
                        pasteNodes={props.pasteNodes}
                        clearEditor={props.clearEditor}
                        insertNode={props.insertNode}
                        setMode={setMode}
                    />

                ) : mode === 'D' ? (
                    <CDATAHeader
                        canEdit={false}
                        path={props.path}
                        root={props.root}
                        data={props.data}
                        clearEditor={props.clearEditor}
                        insertCDATA={props.insertCDATA}
                        setMode={setMode}
                        textBefore={textBefore}
                        textInside={textInside}
                        textAfter={textAfter} />


                ) : mode === 'M' ? (
                    <CommentHeader
                        canEdit={false}
                        path={props.path}
                        root={props.root}
                        data={props.data}
                        clearEditor={props.clearEditor}
                        insertComment={props.insertComment}
                        setMode={setMode}
                        textBefore={textBefore}
                        textInside={textInside}
                        textAfter={textAfter} />

                ) : mode === 'P' ? (
                    <PIHeader
                        canEdit={false}
                        path={props.path}
                        root={props.root}
                        data={props.data}
                        clearEditor={props.clearEditor}
                        insertPI={props.insertPI}
                        setLang={setLang}
                        setMode={setMode}
                        lang={lang}
                        textBefore={textBefore}
                        textInside={textInside}
                        textAfter={textAfter} />

                ) : null
                }
            </Panels.PanelHeader>

            <Panels.PanelBody>

                <TextAreas.TextInput
                    value={text}
                    readOnly={mode !== 'T'}
                    onChange={(event) => saveEdit(event.target)}
                    onSelect={(event) => saveSelect(event.target)} />

            </Panels.PanelBody>
        </Panels.Panel>
    )
}

export default TextEditor