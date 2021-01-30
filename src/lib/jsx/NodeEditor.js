import React, { useState } from 'react'
import * as SNAC from '../snac'
import { EditAttributes, NewAttribute, NodeHeader, Panels } from '.'

export const NodeEditor = props => {

    const [newNS, setNewNS] = useState(props.data.S === null ? "" : props.data.S)
    const [newName, setNewName] = useState(props.data.N)
    const [newAttNS, setNewAttNS] = useState("")
    const [newAttName, setNewAttName] = useState("")
    const [newAttValue, setNewAttValue] = useState("")
    const [newAttr, setNewAttr] = useState(false)
    const [atts, setAtts] = useState(SNAC.loadAttributes(props.data.A))


    // Open/Close attribute text fields.
    const attributesOpenClose = (atts, idx1, idx2) => {
        setAtts(SNAC.attributesOpenClose(atts, idx1, idx2))
    }
    const closeAll = atts => setAtts(SNAC.allClose(atts))

    // Update the value from the text fields.
    const updateAttributeValue = (atts, idx1, idx2, value) =>
        setAtts(SNAC.updateAttributeValue(atts, idx1, idx2, value))

    // Mark/Unmark attributes as deleted.
    const markAttributeDeleted = (atts, idx1, idx2) =>
        setAtts(SNAC.markAttributeDeleted(atts, idx1, idx2))

    // Open/Close new attribute text fields.
    const newFieldsOpenClose = () => {
        if (newAttr === true) {
            setNewAttr(false)
            setNewAttNS('')
            setNewAttName('')
            setNewAttValue('')
        }
        else {
            setNewAttr(true)
        }
    }

    // Update the attributes with tne new attribute.
    const insertAttribute = (atts) => {
        setNewAttNS(SNAC.attNS(newAttNS))
        setNewAttName(SNAC.attName(newAttName))

        SNAC.attNSNameTest(newAttNS, newAttName) &&
            setAtts(SNAC.insertAttribute(atts, newAttNS, newAttName, newAttValue))
        newFieldsOpenClose()
    }

    return (
        <Panels.Panel>

            <NodeHeader
                canEdit={true}
                root={props.root}
                data={props.data}
                path={props.path}
                newAttr={newAttr}
                isOpen={SNAC.attsOpen(atts)}
                setNewNS={setNewNS}
                setNewName={setNewName}
                newNS={newNS}
                newName={newName}
                atts={atts}
                unwrapNode={props.unwrapNode}
                clearEditor={props.clearEditor}
                saveNode={props.saveNode}
                closeAll={closeAll}
            />

            <Panels.PanelBody>

                <EditAttributes
                    atts={atts}
                    newAttr={newAttr}
                    data={props.data}
                    isOpen={SNAC.attsOpen(atts)}
                    attributesOpenClose={attributesOpenClose}
                    saveNode={props.saveNode}
                    closeAll={closeAll}
                    updateAttributeValue={updateAttributeValue}
                    markAttributeDeleted={markAttributeDeleted}
                    ns={newAttNS}
                    name={newAttName}
                />

                <NewAttribute
                    atts={atts}
                    isOpen={SNAC.attsOpen(atts)}
                    insertAttribute={insertAttribute}
                    setNewAttNS={setNewAttNS}
                    setNewAttName={setNewAttName}
                    setNewAttValue={setNewAttValue}
                    newFieldsOpenClose={newFieldsOpenClose}
                    newAttr={newAttr}
                    ns={newAttNS}
                    name={newAttName}
                    value={newAttValue} />

            </Panels.PanelBody>

        </Panels.Panel>
    )
}

export default NodeEditor