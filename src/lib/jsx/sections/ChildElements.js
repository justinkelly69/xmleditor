import React from 'react'
import { ChildElement } from '..'
import * as SNAC from '../../snac/snac'

const ChildElements = props => {

    return (
        <>
            {props.elements.map((element, index) =>
                <ChildElement
                    type={SNAC.itemType(element)}
                    key={element._}
                    data={element}
                    index={index}
                    root={props.root}
                    path={[...props.path, index]}
                    prefix={props.prefix}
                    spacing={props.spacing}
                    prefixArray={props.prefixArray}
                    clipboard={props.clipboard}
                    setEditor={props.setEditor}
                    clearEditor={props.clearEditor}
                    setSelected={props.setSelected}
                    prefixEnabled={props.prefixEnabled}
                    setPath={props.setPath}
                    writeable={props.writeable}
                    showSwitches={props.showSwitches}
                    showClosingTag={props.showClosingTag} />
            )}
        </>
    )
}
export default ChildElements