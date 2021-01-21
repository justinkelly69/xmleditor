import {A,C} from './datatypes'
import initialState from './initialstate'

export const readSnac = () => ({
    type: C.READ
})

export const updateSnac = (remove, replace) => ({
    type: C.UPDATE,
    remove: remove,
    replace: replace,
})

