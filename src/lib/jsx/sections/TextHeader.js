import React from 'react'
import { Buttons, Checkboxes, Labels, Panels } from '..'

const TextHeader = props =>
    <Panels.PanelHeader>
        <Panels.PanelItemRight>
            <Buttons.StandardButton onClick={() => props.setMode('N')}>
                {Labels.NewElementMode}
            </Buttons.StandardButton>
        </Panels.PanelItemRight>
        <Panels.PanelItemRight>
            <Buttons.CDATAButton onClick={() => props.setMode('D')}>
                {Labels.NewCDATAMode}
            </Buttons.CDATAButton>
        </Panels.PanelItemRight>
        <Panels.PanelItemRight>
            <Buttons.CommentButton onClick={() => props.setMode('M')}>
                {Labels.NewCommentMode}
            </Buttons.CommentButton>
        </Panels.PanelItemRight>
        <Panels.PanelItemRight>
            <Buttons.PIButton onClick={() => props.setMode('P')}>
                {Labels.NewPIMode}
            </Buttons.PIButton>
        </Panels.PanelItemRight>
        <Panels.PanelItemRight>
            <Checkboxes.NormalizeCheckbox
                onChange={(event) => props.normalizeText(event.target)}
            />
        </Panels.PanelItemRight>

        <Panels.PanelSpacing />
        <Panels.PanelItemRight>
            <Buttons.StandardButton onClick={() => props.saveText(props.data, props.text)}>
                {Labels.SaveText}
            </Buttons.StandardButton>
        </Panels.PanelItemRight>
        <Panels.PanelItemRight>
            <Buttons.StandardButton onClick={() => props.clearEditor()}>
                {Labels.CancelText}
            </Buttons.StandardButton>
        </Panels.PanelItemRight>
    </Panels.PanelHeader>

export default TextHeader