import { find } from './find'

/**
 * Returns the parent path of the current path.
 * If the path is [2,3,5,7] returns [2,3,5]
 * @param {array} path 
 */
export const pathParent = path => [...path.slice(0, -1)]

/**
 * Returns the path with the last element decremented by 1
 * If the path was [2,3,5,7] returns [2,3,5,6]
 * @param {array} path 
 */
export const pathDecrement = path => [...path.slice(0, -1), path.slice(-1)[0] - 1]

/**
 * Returns the path with the last element incremented by 1
 * If the path was [2,3,5,7] returns [2,3,5,8]
 * @param {array} path 
 */
export const pathIncrement = path => [...path.slice(0, -1), path.slice(-1)[0] + 1]

/**
 * Returns the first path in an array of paths
 * If the paths were 
 * [
 *      [2,3,5,3], // <-- First Path
 *      [2,3,5,4],
 *      [2,3,5,5],
 *      [2,3,5,6]
 * ]
 * returns [2,3,5,3]
 * @param {array} paths 
 */
export const firstPath = paths => paths.slice(0, 1)[0]

/**
 * Returns the last path in an array of paths
 * If the paths were 
 * [
 *      [2,3,5,3],
 *      [2,3,5,4],
 *      [2,3,5,5],
 *      [2,3,5,6]   // <-- Last Path
 * ]
 * returns [2,3,5,6]
 * @param {array} paths 
 */
export const lastPath = paths => paths.slice(-1)[0]

/**
 * Returns the index of the last child of an element node which will be length - 1
 * @param {snac} root 
 * @param {array} path 
 */
export const lastChildIndex = (root, path) => find(root, path).slice(-1)[0].C.length - 1

/**
 * Returns the index of the last child of the parent node of an element.
 * @param {snac} root 
 * @param {array} path 
 */
export const parentLastChildIndex = (root, path) => lastChildIndex(root, pathParent(path))

/**
 * Uses find to get the path to an item. Then returns the last item in the path
 * path = [2,3,4,2]
 * items = [
 *      {...},
 *      {...},
 *      {...},
 *      {...}   // <- returns this
 * ]
 * @param {snac} root 
 * @param {array} path 
 */
export const currPathItem = (root, path) => lastPath(find(root, path))

/**
 * Decrement the path. Then use find to find the last item in the decremented path
 * path = [2,3,4,2] becomes [2,3,4,1]
 * items = [
 *      {...},
 *      {...},
 *      {...},
 *      {...}   // <- returns this
 * ] 
 * @param {snac} root 
 * @param {array} path 
 */
export const prevPathItem = (root, path) =>
    lastPath(path) > 0 ?
        lastPath(find(root, pathDecrement(path))) :
        null

/**
 * Increment the path. Then use find to find the last item in the incremented path
 * path = [2,3,4,2] becomes [2,3,4,3]
 * items = [
 *      {...},
 *      {...},
 *      {...},
 *      {...}   // <- returns this
 * ] 
 * @param {snac} root 
 * @param {array} path 
 */
export const nextPathItem = (root, path) =>
    lastPath(path) < parentLastChildIndex(root, path) ?
        lastPath(find(root, pathIncrement(path))) :
        null

