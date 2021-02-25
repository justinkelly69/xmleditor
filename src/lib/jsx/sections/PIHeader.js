import React from 'react'
import { Buttons, Labels, Brackets, Panels, PanelButtonsRight, TextInputs, Fields } from '..'

const PIHeader = props =>
    <Panels.PanelHeader>
        <Panels.PanelItem flexGrow="1" marginRight={PanelButtonsRight.marginRight}>
            <Brackets.PIOpenBracket />
            <Fields.PILang>{Labels.PIHeading}</Fields.PILang>
            <Brackets.PICloseBracket />
        </Panels.PanelItem>
        <Panels.PanelItem flexGrow="2" >
            <TextInputs.PILangInput value={props.lang} onChange={(event) => props.setLang(event.target.value)} />
        </Panels.PanelItem>
        <Panels.PanelSpacing />
        {props.canEdit && props.path && props.path.length > 1 ?
            <>
                <Panels.PanelItemRight>
                    <Buttons.StandardButton onClick={() => {
                        props.unwrapNode(props.root, props.path)
                        props.clearEditor()
                    }}>
                        {Labels.UnwrapPI}
                    </Buttons.StandardButton>
                </Panels.PanelItemRight>
                <Panels.PanelItemRight>
                    <Buttons.PIButton onClick={() => props.savePI(props.data, props.lang, props.body)}>
                        {Labels.SavePI}
                    </Buttons.PIButton>
                </Panels.PanelItemRight>
                <Panels.PanelItemRight>
                    <Buttons.StandardButton onClick={() => props.clearEditor()}>
                        {Labels.CancelPI}
                    </Buttons.StandardButton>
                </Panels.PanelItemRight>
            </> :
            <>
                <Panels.PanelItemRight>
                    <Buttons.PIButton onClick={() => {
                        props.insertPI(props.data, {
                            lang: props.lang,
                            before: props.textBefore,
                            inside: props.textInside,
                            after: props.textAfter
                        })
                        props.clearEditor()
                    }}>
                        {Labels.InsertPI}
                    </Buttons.PIButton>
                </Panels.PanelItemRight>
                <Panels.PanelItemRight>
                    <Buttons.StandardButton onClick={() => props.setMode('T')}>
                        {Labels.CancelPI}
                    </Buttons.StandardButton>
                </Panels.PanelItemRight>
            </>
        }
    </Panels.PanelHeader>

export default PIHeader

