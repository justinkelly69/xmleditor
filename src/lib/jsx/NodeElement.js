import React, { useState } from 'react'
import { NodeTag, Attributes, ChildElements, Sections } from '.'

const NodeElement = props => {

    const [aOpen, setAOpen] = useState(false)
    const [cOpen, setCOpen] = useState(true)

    return (
        <Sections.NodeSection selected={props.writeable && props.data.q}>
            {props.path.length > 0 || props.data.N !== '@@@' ?
                <>
                    <NodeTag
                        openTag={true}
                        data={props.data}
                        root={props.root}
                        path={props.path}
                        prefix={props.prefix}
                        spacing={props.spacing}
                        prefixArray={props.prefixArray}
                        clipboard={props.clipboard}
                        setEditor={props.setEditor}
                        clearEditor={props.clearEditor}
                        setSelected={props.setSelected}
                        prefixEnabled={props.prefixEnabled}
                        setPath={props.setPath}
                        cOpen={cOpen}
                        setCOpen={setCOpen}
                        showSwitches={props.showSwitches}
                        writeable={props.writeable} />

                    <Attributes
                        data={props.data}
                        root={props.root}
                        path={props.path}
                        prefix={props.prefix}
                        spacing={props.spacing}
                        prefixArray={props.prefixArray}
                        setPath={props.setPath}
                        aOpen={aOpen}
                        setAOpen={setAOpen}
                        prefixEnabled={props.prefixEnabled}
                        showSwitches={props.showSwitches}
                        writeable={props.writeable} />
                </> :
                null
            }

            {props.path.length === 0 || cOpen ?
                <ChildElements
                    elements={props.data.C}
                    data={props.data}
                    root={props.root}
                    path={props.path}
                    prefix={props.prefix}
                    spacing={props.spacing}
                    clipboard={props.clipboard}
                    setEditor={props.setEditor}
                    clearEditor={props.clearEditor}
                    setSelected={props.setSelected}
                    prefixEnabled={props.prefixEnabled}
                    setPath={props.setPath}
                    writeable={props.writeable}
                    showSwitches={props.showSwitches}
                    showClosingTag={props.showClosingTag} /> :
                null
            }

            {props.showClosingTag && (props.path.length > 0 || props.data.N !== '@@@') ? // Closing XML Tag
                <NodeTag
                    openTag={false}
                    data={props.data}
                    root={props.root}
                    path={props.path}
                    prefix={props.prefix}
                    spacing={props.spacing}
                    prefixArray={props.prefixArray}
                    clipboard={props.clipboard}
                    setEditor={props.setEditor}
                    clearEditor={props.clearEditor}
                    setSelected={props.setSelected}
                    prefixEnabled={props.prefixEnabled}
                    setPath={props.setPath}
                    showSwitches={props.showSwitches}
                    writeable={props.writeable} /> :
                null
            }
        </Sections.NodeSection>
    )
}
export default NodeElement