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
                                        data={props.data}
                                        path={props.path}
                                        prefix={props.prefix}
                                        prefixArray={props.prefixArray}
                                        setPath={props.setPath}
                                        ns={ns}
                                        name={name}
                                        prefixEnabled={props.prefixEnabled}
                                        writeable={props.writeable}
                                    /> :
                                    null
                                }
                                {(idx1 === namespaces.length - 1 && idx2 === names.length - 1) ?
                                    <>
                                        <OpenTagEnd
                                            canOpen={true}
                                            aOpen={props.aOpen}
                                            setAOpen={props.setAOpen}
                                            showSwitches={props.showSwitches}
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
                showSwitches={props.showSwitches}
            />
        </Panels.Attributes>
}

export default Attributes