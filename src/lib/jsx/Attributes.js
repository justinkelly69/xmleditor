import React from 'react'
import { Attribute, OpenTagEnd, Panels } from '.'
import * as SNAC from '../snac'

const Attributes = (props) => {
    const namespaces = SNAC.getNamespaces(props.data.A)

    return namespaces.length > 0 && SNAC.hasAttributes(props.data.A) ?
        <Panels.Attributes>
            {namespaces.sort().map((ns, idx1) => {
                const names = SNAC.getNames(props.data.A, ns)
                return (
                    names.sort().map((name, idx2) => {
                        return (
                            <Panels.Attribute key={`${idx1}-${idx2}`} aOpen={props.aOpen}>
                                {!props.prefixEnabled || props.aOpen ?
                                    <Attribute
                                        ns={ns}
                                        name={name}
                                        {...props}
                                    /> :
                                    null
                                }
                                {(idx1 === namespaces.length - 1 && idx2 === names.length - 1) ?
                                    <>
                                        <OpenTagEnd
                                            canOpen={true}
                                            {...props}
                                        />
                                    </> :
                                    null
                                }
                            </Panels.Attribute>
                        )
                    })
                )
            })}
        </Panels.Attributes> :
        <Panels.Attributes>
            <OpenTagEnd
                canOpen={false}
                {...props}
            />
        </Panels.Attributes>
}

export default Attributes