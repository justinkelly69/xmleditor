import { clone, cloneAttributes, cloneChildren } from './clone'
import { pathParent, pathDecrement, pathIncrement } from './path'
import { itemType } from './helpers'

/**
 * Returns an array of snac items corresponding to the path.
 * Function is recursive and result is only calculated on successive steps
 * so result should not be given.
 * @param {snac} snac 
 * @param {array} path 
 * @param {array of snac} result 
 */
export const find = (snac, path, result = []) => {
    const [index, ...newPath] = path
    return snac ? (
        itemType(snac) === 'N' ? find(snac.C[index], newPath,
            [...result, {
                _: snac._,
                S: snac.S,
                N: snac.N,
                A: cloneAttributes(snac.A),
                C: cloneChildren(snac.C, { newID: false })
            }])
            : [...result, clone(snac, { newID: false })]
    ) : result
}

export const findTag = (snac, path) => {
    return find(snac, path)
}

export const findTags = (snac, paths) => {
    let out = []
    paths.forEach((path) => {
        out = [...out, findTag(snac, path)]
    })
    return out
}

/**
 * Find the id the last element in each of the paths and return them in an array.
 * @param {snac} snac 
 * @param {array} paths 
 */
export const findIDs = (snac, paths) => {
    let out = []
    paths.forEach((path) => {
        out = [...out, findID(snac, path)]
    })
    return out
}

/**
 * Find the id of the element at the end of the path
 * @param {snac} snac 
 * @param {array} path 
 */
export const findID = (snac, path) => find(snac, path).slice(-1)[0]._

/**
 * Find the id of the element before the element at the end of the path
 * @param {snac} snac 
 * @param {array} path 
 */
export const findPrevID = (snac, path) => findID(snac, pathDecrement(path))

/**
 * Find the id of the element after the element at the end of the path
 * @param {snac} snac 
 * @param {array} path 
 */
export const findNextID = (snac, path) => findID(snac, pathIncrement(path))

/**
 * Find the id of the parent element of the element at the end of the path
 * @param {snac} snac 
 * @param {array} path 
 */
export const findParentID = (snac, path) => findID(snac, pathParent(path))


