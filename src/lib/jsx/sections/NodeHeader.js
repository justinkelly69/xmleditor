import React from 'react'
import { Buttons, Labels, Panels, NSNameTextInputs } from '..'

const NodeHeader = props =>
    <Panels.PanelHeader>
        <Panels.PanelItem>
            <NSNameTextInputs
                setNewNS={props.setNewNS}
                setNewName={props.setNewName}
                newNS={props.newNS}
                newName={props.newName}
            />
        </Panels.PanelItem>
        <Panels.PanelSpacing />
        {props.canEdit ?
            <>
                {!props.newAttr &&
                    <>
                        <Panels.PanelItemRight>
                            {props.path.length > 1 &&
                                <Buttons.StandardButton onClick={() => {
                                    props.unwrapNode(props.root, props.path)
                                    props.clearEditor()
                                }}>
                                    {Labels.UnwrapElement}
                                </Buttons.StandardButton>
                            }
                        </Panels.PanelItemRight>
                        <Panels.PanelItemRight>
                            <Buttons.StandardButton onClick={() => {
                                props.saveNode(
                                    props.data,
                                    props.newNS,
                                    props.newName,
                                    props.atts
                                )
                                props.closeAll(props.atts)
                            }}>
                                {Labels.SaveElement}
                            </Buttons.StandardButton>
                        </Panels.PanelItemRight>
                        <Panels.PanelItemRight>
                            <Buttons.StandardButton onClick={() => props.clearEditor()}>
                                {Labels.CancelElement}
                            </Buttons.StandardButton>
                        </Panels.PanelItemRight>
                    </>
                }
            </> :
            <>
                <Panels.PanelItemRight>
                    {props.pasteEnable() &&
                        <Buttons.StandardButton onClick={() => {
                            props.pasteNodes(props.data, {
                                before: props.textBefore,
                                after: props.textAfter
                            })
                            props.clearEditor()
                        }}>
                            {Labels.PasteXML}
                        </Buttons.StandardButton>
                    }
                </Panels.PanelItemRight>
                <Panels.PanelItemRight>
                    <Buttons.StandardButton onClick={() => {
                        props.insertNode(props.data, {
                            S: props.newNS,
                            N: props.newName,
                            before: props.textBefore,
                            inside: props.textInside,
                            after: props.textAfter
                        })
                    }}>
                        {Labels.InsertNodeText}
                    </Buttons.StandardButton>
                </Panels.PanelItemRight>
                <Panels.PanelItemRight>
                    <Buttons.StandardButton onClick={() => props.setMode('T')}>
                        {Labels.CancelNodeText}
                    </Buttons.StandardButton>
                </Panels.PanelItemRight>
            </>
        }
    </Panels.PanelHeader>

export default NodeHeader