import React from 'react'
import { NodeElement, Settings } from '.'

const DocumentElement = props =>
    <NodeElement
        prefixEnabled={true}
        path={[]}
        prefix={[]}
        spacing={0}
        prefixArray={[]}
        showSwitches={true}
        showClosingTag={Settings.SHOW_CLOSING_TAG}
        {...props}
    />
export default DocumentElement