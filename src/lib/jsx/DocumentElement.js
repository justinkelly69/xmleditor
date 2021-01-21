import React from 'react'
import { NodeElement, Settings } from '.'

const DocumentElement = (props) =>
    <NodeElement
        writeable={props.writeable}
        aOpen={props.aOpen}
        setEditor={props.setEditor}
        clearEditor={props.clearEditor}
        setSelected={props.setSelected}
        setPath={props.setPath}
        prefixEnabled={true}
        path={[]}
        prefix={[]}
        spacing={0}
        prefixArray={[]}
        clipboard={props.clipboard}
        data={props.data}
        root={props.data}
        showSwitches={true}
        showClosingTag={Settings.SHOW_CLOSING_TAG} />


export default DocumentElement