import React from 'react'
import { Buttons, Labels, Brackets, Panels, Fields, Symbols } from '..'

const CommentHeader = props =>

    <Panels.PanelHeader>

        <Panels.PanelItem>
            <Brackets.CommentOpenBracket />
            <Fields.CommentBody>{Symbols.CommentLabel}</Fields.CommentBody>
            <Brackets.CommentCloseBracket />
        </Panels.PanelItem>

        <Panels.PanelSpacing />

        {props.canEdit && props.path && props.path.length > 1 ?
            <>
                <Panels.PanelItemRight>
                    <Buttons.StandardButton onClick={() => {
                        props.unwrapNode(props.root, props.path)
                        props.clearEditor()
                    }}>
                        {Labels.UnwrapComment}
                    </Buttons.StandardButton>
                </Panels.PanelItemRight>

                <Panels.PanelItemRight>
                    <Buttons.CommentButton onClick={() => props.saveComment(props.data, props.comment)}>
                        {Labels.SaveComment}
                    </Buttons.CommentButton>
                </Panels.PanelItemRight>

                <Panels.PanelItemRight>
                    <Buttons.StandardButton onClick={() =>  props.clearEditor() }>
                        {Labels.CancelComment}
                    </Buttons.StandardButton>
                </Panels.PanelItemRight>
            </> :
            <>
                <Panels.PanelItemRight>
                    <Buttons.CommentButton onClick={() => {
                        props.insertComment(props.data, {
                            before: props.textBefore,
                            inside: props.textInside,
                            after: props.textAfter
                        })
                        props.clearEditor()
                    }}>
                        {Labels.InsertComment}
                    </Buttons.CommentButton>
                </Panels.PanelItemRight>

                <Panels.PanelItemRight>
                    <Buttons.StandardButton onClick={() =>  props.setMode('T') }>
                        {Labels.CancelComment}
                    </Buttons.StandardButton>
                </Panels.PanelItemRight>
            </>
        }

    </Panels.PanelHeader>

export default CommentHeader