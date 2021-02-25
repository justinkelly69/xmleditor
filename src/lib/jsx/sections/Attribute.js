import React from 'react'
import { Prefix, AttributeNSName, AttributeValue, Brackets, Symbols, Fields, Panels } from '..'

const Attribute = (props) => {
    return (
        <Fields.TextBody>
            {!props.prefixEnabled &&
                <Panels.NewLine />
            }
            <Prefix
                active={false}
                twoLines={false}
                {...props} />
            {!props.prefixEnabled ?
                Symbols.AttributePrefixOff :
                props.prefixArray.length > 1 ?
                    Symbols.AttributePrefixOn :
                    Symbols.AttributePrefixOff
            }
            <AttributeNSName {...props} />
            <Brackets.AttributeEquals />
            <Brackets.AttributeQuote />
            <AttributeValue {...props} />
            <Brackets.AttributeQuote />
        </Fields.TextBody>
    )
}
export default Attribute