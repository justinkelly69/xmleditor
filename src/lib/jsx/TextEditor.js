import React, { useState } from 'react'
import { TextAreas, Checkboxes, NodeHeader, TextHeader, Panels, CDATAHeader, CommentHeader, PIHeader } from '.'
import * as SNAC from '../snac/index'

const TextEditor = props => {

    const [newNS, setNewNS] = useState("")
    const [newName, setNewName] = useState("")
    const [text, setText] = useState(props.data.T)
    const [oldText, setOldText] = useState(props.data.T)
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

    const normalizeText = target => {
        target.checked ?
            updateTexts(text, SNAC.normalize(text)) :
            updateTexts(text, oldText)
    }

    const updateTexts = (oldTxt, newTxt) => {
        setOldText(oldTxt)
        setText(newTxt)
    }
    
    return (
        <Panels.Panel>
            <Panels.PanelHeader>
                {mode === 'T' ? (
                    <TextHeader
                        text={text}
                        oldText={oldText}
                        setMode={setMode}
                        normalizeText={normalizeText}
                        {...props}
                    />
                ) : mode === 'N' ? (
                    <NodeHeader
                        canEdit={false}
                        setNewNS={setNewNS}
                        setNewName={setNewName}
                        newNS={newNS}
                        newName={newName}
                        textBefore={textBefore}
                        textInside={textInside}
                        textAfter={textAfter}
                        setMode={setMode}
                        {...props}
                    />
                ) : mode === 'D' ? (
                    <CDATAHeader
                        canEdit={false}
                        setMode={setMode}
                        textBefore={textBefore}
                        textInside={textInside}
                        textAfter={textAfter}
                        {...props}
                    />
                ) : mode === 'M' ? (
                    <CommentHeader
                        canEdit={false}
                        setMode={setMode}
                        textBefore={textBefore}
                        textInside={textInside}
                        textAfter={textAfter}
                        {...props}
                    />
                ) : mode === 'P' ? (
                    <PIHeader
                        canEdit={false}
                        setLang={setLang}
                        setMode={setMode}
                        lang={lang}
                        textBefore={textBefore}
                        textInside={textInside}
                        textAfter={textAfter}
                        {...props}
                    />
                ) : null
                }
                
            </Panels.PanelHeader>
            <Panels.PanelBody>
                <TextAreas.TextInput
                    value={text}
                    readOnly={mode !== 'T'}
                    onChange={(event) => saveEdit(event.target)}
                    onSelect={(event) => saveSelect(event.target)}
                />
            </Panels.PanelBody>
        </Panels.Panel>
    )
}

export default TextEditor