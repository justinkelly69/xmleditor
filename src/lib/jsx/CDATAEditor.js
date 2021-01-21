import React, { useState } from 'react'
import { TextAreas, Panels, CDATAHeader } from '.'

const CDATAEditor = props => {
    const [cdata, setCDATA] = useState(props.data.D)
    return (
        <Panels.Panel>

            <CDATAHeader
                canEdit={true}
                path={props.path}
                root={props.root}
                data={props.data}
                cdata={cdata}
                unwrapNode={props.unwrapNode}
                clearEditor={props.clearEditor}
                saveCDATA={props.saveCDATA} />

            <Panels.PanelBody>
                <TextAreas.CDATAInput
                    value={cdata}
                    onChange={(event) => setCDATA(event.target.value)} />
            </Panels.PanelBody>

        </Panels.Panel>
    )
}
export default CDATAEditor