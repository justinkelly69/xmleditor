import React from 'react'
import { EditAttribute, Panels } from '..'
import * as SNAC from '../../snac'

const EditAttributes = props => {
    let onOff = true;
    return (
        <Panels.EditAttributes>
            {Object.keys(props.atts).sort().map(ns => {
                return (Object.keys(props.atts[ns]).sort().map(a => {
                    onOff = !onOff
                    return (
                        <EditAttribute key={`${ns}-${a}`}
                            oddEven={onOff}
                            open={props.isOpen}
                            data={props.data}
                            length={SNAC.attributesLength(props.atts)}
                            saveNode={props.saveNode}
                            closeAll={props.closeAll}
                            atts={props.atts}
                            index={props.atts[ns][a]['index']}
                            isOpen={props.atts[ns][a]['open']}
                            value={props.atts[ns][a]['value']}
                            isDeleted={props.atts[ns][a]['deleted']}
                            newAttr={props.newAttr}
                            attributesOpenClose={props.attributesOpenClose}
                            updateAttributeValue={props.updateAttributeValue}
                            markAttributeDeleted={props.markAttributeDeleted}
                            ns={ns}
                            name={a} />
                    )
                }))
            })}
        </Panels.EditAttributes>
    )
}

export default EditAttributes