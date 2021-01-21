import React, { useState } from 'react'
import { TextAreas, Panels, PIHeader } from '.'

const PIEditor = props => {
    const [lang, setLang] = useState(props.data.L)
    const [body, setBody] = useState(props.data.B)

    return (
        <Panels.Panel>

            <PIHeader
                canEdit={true}
                path={props.path}
                root={props.root}
                data={props.data}
                lang={lang}
                body={body}
                setLang={setLang}
                unwrapNode={props.unwrapNode}
                clearEditor={props.clearEditor}
                savePI={props.savePI} />

            <Panels.PanelBody>
                <TextAreas.PIBodyInput
                    onChange={(event) => setBody(event.target.value)}
                    value={body}
                />
            </Panels.PanelBody>

        </Panels.Panel>
    )
}
export default PIEditor