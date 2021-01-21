import { initialData } from './initialstate'
import { A, C } from './datatypes'
import { clone } from '../lib/snac/snac'

const reducer = (storeData, action) => {
    switch (action.type) {
        case C.UPDATE:
            return ({
                [A.ROOT]: clone(storeData[A.ROOT], action.remove, action.replace),
                [A.CLIPBOARD]: clone(storeData[A.CLIPBOARD])
            })
        default:
            return storeData || initialData

    }
}

export default reducer