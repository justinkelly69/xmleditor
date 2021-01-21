import React from 'react'
import { Buttons, Labels, Brackets, Panels } from '..'

const CDATAHeader = props =>
    <Panels.PanelHeader>

        <Panels.PanelItem>
            <Brackets.CDATAOpenBracket />
            <Brackets.CDATACloseBracket />
        </Panels.PanelItem>

        <Panels.PanelSpacing />

        {props.canEdit && props.path && props.path.length > 1 ?
            <>
                <Panels.PanelItemRight>
                    <Buttons.StandardButton onClick={() => {
                        props.unwrapNode(props.root, props.path)
                        props.clearEditor()
                    }}>
                        {Labels.UnwrapCDATA}
                    </Buttons.StandardButton>
                </Panels.PanelItemRight>

                <Panels.PanelItemRight>
                    <Buttons.CDATAButton onClick={() => props.saveCDATA(props.data, props.cdata)}>
                        {Labels.SaveCDATA}
                    </Buttons.CDATAButton>
                </Panels.PanelItemRight>

                <Panels.PanelItemRight>
                    <Buttons.StandardButton
                        onClick={() => props.clearEditor()}>
                        {Labels.CancelCDATA}
                    </Buttons.StandardButton>
                </Panels.PanelItemRight>
            </> :
            <>
                <Panels.PanelItemRight>
                    <Buttons.CDATAButton onClick={() => {
                        props.insertCDATA(props.data, {
                            before: props.textBefore,
                            inside: props.textInside,
                            after: props.textAfter
                        })
                        props.clearEditor()
                    }}>
                        {Labels.InsertCDATA}
                    </Buttons.CDATAButton>
                </Panels.PanelItemRight>

                <Panels.PanelItemRight>
                    <Buttons.StandardButton onClick={() => props.setMode('T')}>
                        {Labels.CancelCDATA}
                    </Buttons.StandardButton>
                </Panels.PanelItemRight>
            </>
        }
    </Panels.PanelHeader>

export default CDATAHeader