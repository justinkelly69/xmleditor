import React from 'react'
import { Prefix, AttributeNSName, AttributeValue, Brackets, Symbols, Fields, Panels } from '..'

const Attribute = (props) => {
    return (
        <Fields.TextBody>
            {!props.prefixEnabled &&
                <Panels.NewLine />
            }
            <Prefix
                path={props.path}
                data={props.data}
                prefix={props.prefix}
                spacing={props.spacing}
                prefixArray={props.prefixArray}
                active={false}
                prefixEnabled={props.prefixEnabled}
                twoLines={false}
                setEditor={props.setEditor}
                writeable={props.writeable} />

            {!props.prefixEnabled ?
                Symbols.AttributePrefixOff :
                props.prefixArray.length > 1 ?
                    Symbols.AttributePrefixOn :
                    Symbols.AttributePrefixOff
            }

            <AttributeNSName
                data={props.data}
                ns={props.ns}
                name={props.name}
                path={props.path}
                setPath={props.setPath} />

            <Brackets.AttributeEquals />

            <Brackets.AttributeQuote />
            <AttributeValue
                writeable={props.writeable}
                data={props.data}
                ns={props.ns}
                name={props.name}
                path={props.path}
                setPath={props.setPath} />
            <Brackets.AttributeQuote />

        </Fields.TextBody>
    )
}
export default Attribute