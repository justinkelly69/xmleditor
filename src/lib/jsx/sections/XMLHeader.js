import React from 'react'
import { Buttons, Labels, Panels, Constants, NSNameTextInputs } from '..'

const XMLHeader = props =>
    <Panels.PanelHeader>
        {props.mode === Constants.NO_SELECTION ? (
            <>
                <Panels.PanelItem>
                    <Buttons.StandardButton onClick={() => {
                        props.cutNodes()
                        props.clearEditor()
                    }}>
                        {Labels.CutXML}
                    </Buttons.StandardButton>
                </Panels.PanelItem>
                <Panels.PanelItem>
                    <Buttons.StandardButton onClick={() => {
                        props.copyNodes()
                        props.clearEditor()
                    }}>
                        {Labels.CopyXML}
                    </Buttons.StandardButton>
                </Panels.PanelItem>
                <Panels.PanelItem>
                    <Buttons.StandardButton onClick={() =>
                        props.setMode(Constants.WRAP)
                    }>
                        {Labels.WrapXML}
                    </Buttons.StandardButton>
                </Panels.PanelItem>
                <Panels.PanelItem>
                    <Buttons.StandardButton onClick={() => {
                        props.deleteNodes()
                        props.clearEditor()
                    }}>
                        {Labels.DeleteXML}
                    </Buttons.StandardButton>
                </Panels.PanelItem>
                <Panels.PanelItem>
                    <Buttons.StandardButton onClick={() => {
                        props.clearSelected(f => f)
                        props.clearEditor()
                    }}>
                        {Labels.ClearXML}
                    </Buttons.StandardButton>
                </Panels.PanelItem>
            </>
        ) : props.mode === Constants.WRAP ? (
            <>
                <Panels.PanelItem>
                    <NSNameTextInputs
                        setNewNS={props.setNewNS}
                        setNewName={props.setNewName}
                    />
                </Panels.PanelItem>
                <Panels.PanelItem>
                    <Buttons.StandardButton onClick={() => {
                        props.wrapNodes(props.newNS, props.newName)
                        props.clearEditor()
                    }}>
                        {Labels.WrapXML}
                    </Buttons.StandardButton>
                </Panels.PanelItem>
            </>
        ) : null
        }
    </Panels.PanelHeader>

export default XMLHeader