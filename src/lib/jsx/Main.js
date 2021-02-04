import React, { Component } from 'react'
import {
    DocumentElement, XMLDisplay, NodeEditor, TextEditor, CDATAEditor, CommentEditor,
    PIEditor,
    Path, Editors, DropDownList, Sections
} from '.'
import allXml from '../../data/allxml'
import * as SNAC from '../snac'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: SNAC.xml2snac(this.props.xml),
            root: SNAC.xml2snac(this.props.xml),
            editor: '',
            path: [],
            pathDisplay: [],
            pathRow: [],
            prefix: [],
            selectedPaths: [],
            selectedNodes: [],
            clipboard: [],
            writeable: true,
            page: 'waffle',
        }
        this.setEditor = this.setEditor.bind(this)
        this.clearEditor = this.clearEditor.bind(this)
        this.setWriteable = this.setWriteable.bind(this)
        this.setPath = this.setPath.bind(this)
        this.loadXML = this.loadXML.bind(this)
        this.saveNode = this.saveNode.bind(this)
        this.unwrapNode = this.unwrapNode.bind(this)
        this.wrapNodes = this.wrapNodes.bind(this)
        this.cutNodes = this.cutNodes.bind(this)
        this.copyNodes = this.copyNodes.bind(this)
        this.deleteNodes = this.deleteNodes.bind(this)
        this.pasteEnable = this.pasteEnable.bind(this)
        this.pasteNodes = this.pasteNodes.bind(this)
        this.insertNode = this.insertNode.bind(this)
        this.saveText = this.saveText.bind(this)
        this.insertComment = this.insertComment.bind(this)
        this.saveComment = this.saveComment.bind(this)
        this.insertCDATA = this.insertCDATA.bind(this)
        this.saveCDATA = this.saveCDATA.bind(this)
        this.insertPI = this.insertPI.bind(this)
        this.savePI = this.savePI.bind(this)
        this.setSelected = this.setSelected.bind(this)
        this.clearSelected = this.clearSelected.bind(this)
    }

    setEditor(props) {
        if (this.state.data && props.data && props.data._ === this.state.data._) {
            this.clearEditor()
        }
        else {
            if (props.data) {
                switch (props.editor) {

                    case Editors.NODE_EDITOR:
                        this.clearSelected(() => {
                            this.setState(() => ({
                                data: SNAC.clone(props.data),
                                editor: Editors.NODE_EDITOR,
                                path: props.path
                            }))
                        })
                        break

                    case Editors.TEXT_EDITOR:
                        this.clearSelected(() => {
                            this.setState(() => ({
                                data: SNAC.clone(props.data, []),
                                editor: Editors.TEXT_EDITOR,
                                path: props.path
                            }))
                        })
                        break

                    case Editors.COMMENT_EDITOR:
                        this.clearSelected(() => {
                            this.setState(() => ({
                                data: SNAC.clone(props.data, []),
                                editor: Editors.COMMENT_EDITOR,
                                path: props.path
                            }))
                        })
                        break

                    case Editors.CDATA_EDITOR:
                        this.clearSelected(() => {
                            this.setState(() => ({
                                data: SNAC.clone(props.data, []),
                                editor: Editors.CDATA_EDITOR,
                                path: props.path
                            }))
                        })
                        break

                    case Editors.PI_EDITOR:
                        this.clearSelected(() => {
                            this.setState(() => ({
                                data: SNAC.clone(props.data, []),
                                editor: Editors.PI_EDITOR,
                                path: props.path
                            }))
                        })
                        break

                    case Editors.XML_DISPLAY:
                        if (props.selectedNodes.length === 0) {
                            this.clearEditor()
                        }
                        else {
                            this.setState(() => ({
                                editor: Editors.XML_DISPLAY,
                                prefix: props.prefix,
                                root: props.root,
                                path: props.path,
                                selectedPaths: props.selectedPaths,
                                selectedNodes: props.selectedNodes
                            }))
                        }
                        break

                    default:
                        this.clearEditor()
                }
            }
        }
    }

    clearEditor() {
        this.setState({
            data: {},
            editor: 'Z',
            prefix: '',
            path: '',
            selectedPaths: [],
            selectedNodes: []
        })
    }

    loadXML(event) {
        this.setState({
            page: event.target.value,
            editor: 'Z'
        }, () => {
            this.setState({
                root: SNAC.xml2snac(allXml[this.state.page])
            })
        })
    }

    setWriteable() {
        this.clearSelected(() => {
            this.setState({
                writeable: !this.state.writeable,
                editor: 'Z',
                data: {}
            })
        })
    }

    setPath(pathDisplay, atts = null) {
        this.setState({ pathDisplay: pathDisplay }, () => {
            atts === null ?
                this.setState({
                    pathRow: SNAC.find(this.state.root, this.state.pathDisplay)
                }) :
                this.setState({
                    pathRow: [...SNAC.find(this.state.root, this.state.pathDisplay), atts]
                })
        })
    }

    saveNode(data, newNS, newName, atts) {
        const { remove, replace } = SNAC.saveNode(data, newNS, newName, atts)
        this.save(remove, replace)
    }

    cutNodes() {
        const { clipboard, remove, replace, selectedNodes, selectedPaths } =
            SNAC.cutNodes(this.state.root, this.state.selectedPaths, this.state.selectedNodes)
        this.save(remove, replace)
        this.setState({ clipboard, selectedNodes, selectedPaths })
    }

    copyNodes() {
        const { clipboard, selectedNodes, selectedPaths } =
            SNAC.copyNodes(this.state.selectedNodes)
        this.setState({ clipboard, selectedNodes, selectedPaths })
    }

    deleteNodes() {
        const { clipboard, remove, replace, selectedNodes, selectedPaths } =
            SNAC.deleteNodes(this.state.root, this.state.selectedPaths)
        this.save(remove, replace)
        this.setState({ clipboard, selectedNodes, selectedPaths })
    }

    pasteNodes(data, atts) {
        const { remove, replace } =
            SNAC.pasteNodes(this.state.root, data, atts, this.state.clipboard)
        this.save(remove, replace)
    }

    pasteEnable() {
        return this.state.clipboard && this.state.clipboard.length > 0
    }

    wrapNodes(newNS, newName) {
        const { remove, replace, selectedPaths, selectedNodes, path } =
            SNAC.wrapNodes(
                newNS,
                newName,
                this.state.root,
                this.state.selectedPaths,
                this.state.selectedNodes
            )
        this.save(remove, replace)
        this.setEditor({
            root: this.state.root,
            editor: Editors.XML_DISPLAY,
            path,
            selectedPaths,
            selectedNodes
        })
    }

    unwrapNode(root, path) {
        const { remove, replace } = SNAC.unwrapNode(root, path)
        this.save(remove, replace)
    }

    // TEXT EDITOR METHODS
    insertNode(data, atts) {
        const { remove, replace, insideText } = SNAC.insertNode(data, atts)
        this.save(remove, replace)
        this.setEditor({
            data: data,
            editor: Editors.TEXT_EDITOR,
        })
    }

    saveText(data, text) {
        const { remove, replace } = SNAC.updateText(data, text)
        this.save(remove, replace)
    }

    // COMMENT EDITOR METHODS
    insertComment(data, atts) {
        const { remove, replace } = SNAC.insertComment(data, atts)
        this.save(remove, replace)
        this.setEditor({
            editor: Editors.COMMENT_EDITOR,
            root: this.state.root
        })
    }

    saveComment(data, comment) {
        const { remove, replace } = SNAC.updateComment(data, comment)
        this.save(remove, replace)
    }

    // CDATA EDITOR METHODS
    insertCDATA(data, atts) {
        const { remove, replace } = SNAC.insertCDATA(data, atts)
        this.save(remove, replace)
        this.setEditor({
            editor: Editors.CDATA_EDITOR,
            root: this.state.root
        })
    }

    saveCDATA(data, cdata) {
        const { remove, replace } = SNAC.updateCDATA(data, cdata)
        this.save(remove, replace)
    }

    // PI EDITOR METHODS
    insertPI(data, atts) {
        const { remove, replace } = SNAC.insertPI(data, atts)
        this.save(remove, replace)
        this.setEditor({
            editor: Editors.PI_EDITOR,
            root: this.state.root
        })
    }

    savePI(data, lang, body) {
        if (SNAC.piLangTest(lang)) {
            const { remove, replace } = SNAC.updatePI(data, lang, body)
            this.save(remove, replace)
        }
    }

    // XML EDITOR FUNCTIONS
    setSelected(path, next) {
        const { root, selectedPaths, selectedNodes } =
            SNAC.setSelected(this.state.root, this.state.selectedPaths, path)
        this.setState({
            root: root,
            selectedPaths,
            selectedNodes
        }, () => next(root, selectedPaths, selectedNodes))
    }

    clearSelected(next) {
        const { root, selectedPaths, selectedNodes } = SNAC.clearSelected(this.state.root)
        this.setState({
            root: root,
            selectedPaths,
            selectedNodes
        }, () => next())
    }

    // SAVE EVERYTHING
    save(remove, replace) {
        if (this.state.data._ !== null) {
            this.setState({
                root: SNAC.clone(
                    this.state.root,
                    { remove, replace }
                )
            })
        }
    }

    render() {
        return (
            <Sections.MainContainer>

                <Sections.TopRow>
                    <DropDownList
                        values={allXml}
                        value={this.state.page}
                        onChange={this.loadXML}
                    />
                </Sections.TopRow>

                <Sections.VerticalColumns>

                    <Sections.VerticalColumn>
                        <DocumentElement
                            data={this.state.root}
                            setEditor={this.setEditor}
                            clearEditor={this.clearEditor}
                            setSelected={this.setSelected}
                            writeable={this.state.writeable}
                            setPath={this.setPath}
                            editor={this.state.editor}
                        />
                    </Sections.VerticalColumn>

                    {this.state.writeable && (
                        this.state.editor === Editors.NODE_EDITOR ||
                        this.state.editor === Editors.TEXT_EDITOR ||
                        this.state.editor === Editors.CDATA_EDITOR ||
                        this.state.editor === Editors.COMMENT_EDITOR ||
                        this.state.editor === Editors.PI_EDITOR ||
                        this.state.editor === Editors.XML_DISPLAY
                    ) ?
                        <Sections.VerticalColumn>
                            {this.state.editor === Editors.NODE_EDITOR ? (
                                <NodeEditor
                                    data={this.state.data}
                                    root={this.state.root}
                                    path={this.state.path}
                                    saveNode={this.saveNode}
                                    unwrapNode={this.unwrapNode}
                                    clearEditor={this.clearEditor}
                                />
                            ) : this.state.editor === Editors.TEXT_EDITOR ? (
                                <TextEditor
                                    data={this.state.data}
                                    root={this.state.root}
                                    path={this.state.path}
                                    pasteEnable={this.pasteEnable}
                                    pasteNodes={this.pasteNodes}
                                    insertNode={this.insertNode}
                                    insertComment={this.insertComment}
                                    insertCDATA={this.insertCDATA}
                                    insertPI={this.insertPI}
                                    saveText={this.saveText}
                                    clearEditor={this.clearEditor}
                                />
                            ) : this.state.editor === Editors.CDATA_EDITOR ? (
                                <CDATAEditor
                                    data={this.state.data}
                                    root={this.state.root}
                                    path={this.state.path}
                                    saveCDATA={this.saveCDATA}
                                    unwrapNode={this.unwrapNode}
                                    clearEditor={this.clearEditor}
                                />
                            ) : this.state.editor === Editors.COMMENT_EDITOR ? (
                                <CommentEditor
                                    data={this.state.data}
                                    root={this.state.root}
                                    path={this.state.path}
                                    saveComment={this.saveComment}
                                    unwrapNode={this.unwrapNode}
                                    clearEditor={this.clearEditor}
                                />
                            ) : this.state.editor === Editors.PI_EDITOR ? (
                                <PIEditor
                                    data={this.state.data}
                                    root={this.state.root}
                                    path={this.state.path}
                                    savePI={this.savePI}
                                    unwrapNode={this.unwrapNode}
                                    clearEditor={this.clearEditor}
                                />
                            ) : this.state.editor === Editors.XML_DISPLAY ? (

                                <XMLDisplay
                                    data={this.state.data}
                                    root={this.state.root}
                                    path={this.state.path}
                                    prefix={this.state.prefix}
                                    selectedPaths={this.state.selectedPaths}
                                    selectedNodes={this.state.selectedNodes}
                                    cutNodes={this.cutNodes}
                                    copyNodes={this.copyNodes}
                                    deleteNodes={this.deleteNodes}
                                    wrapNodes={this.wrapNodes}
                                    setSelected={this.setSelected}
                                    clearSelected={this.clearSelected}
                                    setPath={this.setPath}
                                    setEditor={this.setEditor}
                                    clearEditor={this.clearEditor}
                                />
                            ) : null
                            }
                        </Sections.VerticalColumn> :
                        null
                    }
                </Sections.VerticalColumns>

                <Sections.PathRow>
                    <Path pathRow={this.state.pathRow} />
                </Sections.PathRow>

            </Sections.MainContainer>
        )
    }
}

export default Main