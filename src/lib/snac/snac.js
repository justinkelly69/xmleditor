import { DOMParser } from 'xmldom'
import R from './regexes'
import { v4 } from 'uuid'

export const xml2snac = xml => ({
    _: 'N',
    S: '@@@',
    N: '@@@',
    A: {},
    C: [xml2element(new DOMParser().parseFromString(xml, 'text/xml').documentElement)]
})

const xml2element = (doc) => {
    return ({
        _: `N${v4()}`,
        S: doc.prefix,
        N: doc.localName,
        A: xml2atts(doc.attributes),
        C: xml2kids(doc.childNodes),
        q: false
    })
}

const xml2atts = (atts) => {
    const A = {}
    Array(atts.length).fill().map((_, i) => {
        return atts[i].prefix === null ? (
            A.hasOwnProperty('@') || (A['@'] = {}),
            A['@'][atts[i].localName] = atts[i].value
        ) : (
                A.hasOwnProperty(atts[i].prefix) || (A[atts[i].prefix] = {}),
                A[atts[i].prefix][atts[i].localName] = atts[i].value
            )
    })
    return A
}

const xml2kids = kids => {
    let children = [], depth = 0, prev = 'X'
    Array(kids.length).fill().map((_, index) => {
        const kid = kids[index]

        prev !== 'T' && kid.nodeType !== 3 && (
            [children, depth, prev] = [
                [...children, newText('', { index })],
                depth + 1,
                'T'
            ]
        )
        kid.nodeType === 1 && (
            [children, depth, prev] = [
                [...children, xml2element(kid)],
                depth + 1,
                'N'
            ]
        )
        kid.nodeType === 3 && (
            [children, depth, prev] = [
                [...children, newText(kid.data, { index })],
                depth + 1,
                'T'
            ]
        )
        kid.nodeType === 4 && (
            [children, depth, prev] = [
                [...children, newCDATA(kid.nodeValue, { index })],
                depth + 1,
                'D'
            ]
        )
        kid.nodeType === 8 && (
            [children, depth, prev] = [
                [...children, newComment(kid.nodeValue, { index })],
                depth + 1,
                'M'
            ]
        )
        kid.nodeType === 7 && (
            [children, depth, prev] = [
                [...children, newPI(kid.target, kid.data, { index })],
                depth + 1,
                'P'
            ]
        )

    })
    return children
}

//============================================================================

const newIPoint = () => ({
    _: `I${v4()}`,
    q: false,
})

export const newElement = (snac) => {
    const A = has(snac, 'A', {})
    const C = has(snac, 'C', [])
    const q = has(snac, 'q', false)
    return cloneElement({
        S: snac.S === '@' ? '' : snac.S,
        N: snac.N,
        A: cloneAttributes(A),
        C: cloneChildren(C, { newID: true }),
        q: q
    }, { newID: true })
}
export const newText = (txt = '') =>
    cloneText({
        T: txt,
        q: false,
    }, { newID: true })

export const newCDATA = (cdata = '') =>
    cloneCDATA({
        D: cdata,
        q: false
    }, { newID: true })

export const newComment = (comment = '') =>
    cloneComment({
        M: comment,
        q: false,
    }, { newID: true })

export const newPI = (lang = '', body = '') =>
    clonePI({
        L: lang,
        B: body,
        q: false,
    }, { newID: true })

export const clone = (snac, settings = {}, newID = false) => {
    const type = itemType(snac)
    return type === 'N' ? (cloneElement(snac, settings, newID)
    ) : type === 'T' ? (cloneText(snac, settings, newID)
    ) : type === 'D' ? (cloneCDATA(snac, settings, newID)
    ) : type === 'M' ? (cloneComment(snac, settings, newID)
    ) : type === 'P' ? (clonePI(snac, settings, newID)
    ) : null
}

const cloneElement = (snac, settings = {}) => {
    const toggle = has(settings, 'toggle', [])
    const clear = has(settings, 'clear', false)
    const newID = has(settings, 'newID', false)
    return ({
        _: newID ? `N${v4()}` : snac._,
        S: snac.S,
        N: snac.N,
        A: cloneAttributes(snac.A),
        C: cloneChildren(snac.C, settings, newID),
        q: clear ? false : toggle.includes(snac._)
    })
}

const cloneAttributes = (atts = {}) => {
    const newAtts = {}
    Object.keys(atts).forEach(attNS => {
        newAtts[attNS] = {}
        Object.keys(atts[attNS]).forEach(attName => {
            newAtts[attNS][attName] = atts[attNS][attName]
        })
    })
    return newAtts
}

const cloneChildren = (kids = [], settings = {}) => {
    const remove = has(settings, 'remove', [])
    const replace = has(settings, 'replace', [])
    const newID = has(settings, 'newID', false)
    let newKids = []
    let removeIndex = 0

    kids.forEach(kid => {
        return remove.length > 0 && remove[removeIndex] === kid._ ? (
            removeIndex = removeIndex + 1,
            removeIndex === remove.length &&
            replace.forEach(rep => {
                newKids = [...newKids, clone(rep, { newID: newID })]
            })
        ) :
            newKids = [...newKids, clone(kid, settings)]
    })
    return newKids
}

const cloneText = (snac, settings = {}) => {
    const toggle = has(settings, 'toggle', [])
    const clear = has(settings, 'clear', false)
    const newID = has(settings, 'newID', false)
    return ({
        _: newID ? `T${v4()}` : snac._,
        T: snac.T,
        q: clear ? false : toggle.includes(snac._)
    })
}

const cloneCDATA = (snac, settings = {}) => {
    const toggle = has(settings, 'toggle', [])
    const clear = has(settings, 'clear', false)
    const newID = has(settings, 'newID', false)
    return ({
        _: newID ? `D${v4()}` : snac._,
        D: snac.D,
        q: clear ? false : toggle.includes(snac._)
    })
}

const cloneComment = (snac, settings = {}) => {
    const toggle = has(settings, 'toggle', [])
    const clear = has(settings, 'clear', false)
    const newID = has(settings, 'newID', false)
    return ({
        _: newID ? `M${v4()}` : snac._,
        M: snac.M,
        q: clear ? false : toggle.includes(snac._)
    })
}

const clonePI = (snac, settings = {}) => {
    const toggle = has(settings, 'toggle', [])
    const clear = has(settings, 'clear', false)
    const newID = has(settings, 'newID', false)
    return ({
        _: newID ? `P${v4()}` : snac._,
        L: snac.L,
        B: snac.B,
        q: clear ? false : toggle.includes(snac._)
    })
}

/// NODE EDITOR FUNCTIONS

export const saveNode = (data, newNS, newName, atts) => {
    let [remove, replace] = [[], []]
    if (NSNameTest(newNS, newName)) {
        remove = [data._]
        replace = [{
            ...data,
            S: newNS,
            N: newName,
            A: saveAttributes(atts)
        }]
    }
    return { remove, replace }
}

export const getNS = ns => ns === '@' ? '' : ns

export const getAttribute = (ns, name, A) => ({
    _: 'A',
    ns: ns,
    name: name,
    value: A[ns][name]
})

export const loadAttributes = (A) => {
    const newAtts = {}
    Object.keys(A).map(a => {
        newAtts[a] = {}
        Object.keys(A[a]).map((aa) => {
            newAtts[a][aa] = {
                open: false,
                deleted: false,
                value: A[a][aa]
            }
        })
    })
    return newAtts
}

export const updateAttributes = (A, ns, name, func1, func2) => {
    const newAtts = {}

    // If there is no A[ns], create it with a blank [name]
    !A.hasOwnProperty(ns) && (
        newAtts[ns] = {
            [name]: {
                open: false,
                deleted: false,
                value: null
            }
        }
    )

    // Map all this.state.data.A[ns] to atts[a]
    Object.keys(A).sort().map(a => {
        newAtts[a] = {}
        a === ns && !A[a].hasOwnProperty(name) && (
            newAtts[a][name] = {
                open: false,
                deleted: false,
                value: null
            }
        )

        // Map all A[idx1][idx2] to A[a][aa]
        // updating using func1 and func2
        Object.keys(A[a]).sort().map(aa => {
            (a === ns) && aa === name ?
                newAtts[a][aa] = func1(A[a][aa]) :
                newAtts[a][aa] = func2(A[a][aa])
        })
    })

    if (newAtts[ns][name]['value'] === null) {
        newAtts[ns][name] = func1(newAtts[ns][name])
    }

    return newAtts
}

export const attributesLength = (A) => {
    let length = 0;
    Object.keys(A).map(a => {
        Object.keys(A[a]).map(aa => {
            length = length + 1
        })
    })
    return length
}

export const toggleOpenClose = (atts, ns, name) =>
    updateAttributes(
        atts,
        ns,
        name,
        a => ({ ...a, open: !a.open }),
        a => ({ ...a, open: false }))



export const updateAttributeValue = (atts, ns, name, value) =>
    updateAttributes(
        atts,
        ns,
        name,
        a => ({ ...a, value: value }),
        a => ({ ...a }))

// Mark/Unmark attributes as deleted.
export const markAttributeDeleted = (atts, ns, name) =>
    updateAttributes(
        atts,
        ns,
        name,
        a => ({ ...a, deleted: !a.deleted }),
        a => ({ ...a }))

// Update the attributes with tne new attribute.
export const insertAttribute = (atts, newNS, newName, newValue) =>
    updateAttributes(
        atts,
        newNS === '' ? '@' : newNS,
        newName,
        a => ({ ...a, value: newValue }),
        a => ({ ...a }))

export const NSNameTest = (newNS, newName) => R.QNS.test(newNS) && R.QNAME.test(newName)

export const attNSNameTest = (newNS, newName) => R.QNS.test(newNS) && R.QNAME.test(newName)

export const piLangTest = piLang => R.LANG.test(piLang)

export const attNS = newNS => {
    const NS = newNS.trim()
    return NS.length === 0 ? '@' : NS
}

export const attName = newName => newName.trim()

// Map A to atts, removing index, deleted and open, keeping only value
// All attributes marked deleted get removed.
export const saveAttributes = (atts) => {
    const newAtts = {}
    Object.keys(atts).map(a => {
        newAtts[a] = {}
        return Object.keys(atts[a]).map(aa => {
            return (!atts[a][aa].deleted) ?
                newAtts[a][aa] = atts[a][aa].value :
                null
        })
    })
    return removeEmptyObjects(newAtts)
}

export const allClose = atts => {
    const newAtts = {}
    Object.keys(atts).map(a => {
        newAtts[a] = {}
        return Object.keys(atts[a]).map((aa) => {
            newAtts[a][aa] = {
                ...atts[a][aa],
                open: false,
            }
        })
    })
    return newAtts
}

export const attsOpen = atts => {
    let isOpen = false
    Object.keys(atts).map(a => {
        return Object.keys(atts[a]).map((aa) => {
            atts[a][aa].open === true && (
                isOpen = true
            )
        })
    })
    return isOpen
}

const removeEmptyObjects = obj => {
    let newObj = {}
    Object.keys(obj).map(key => {
        Object.keys(obj[key]).length > 0 && (
            newObj[key] = { ...obj[key] }
        )
    })
    return newObj
}


const removeNodes = (root, selectedPaths) => {
    const { prevItem, firstItem, lastItem, nextItem } = getOuterElements(root, selectedPaths)
    let remove = findIDs(root, selectedPaths)
    let replace = []
    if (itemType(prevItem) === 'T' ||
        itemType(firstItem) === 'T' ||
        itemType(lastItem) === 'T' ||
        itemType(nextItem) === 'T') {
        let T = ""
        if (itemType(prevItem) === 'T') {
            remove = [prevItem._, ...remove]
            T = T + prevItem.T
        }
        if (itemType(nextItem) === 'T') {
            remove = remove.concat(nextItem._)
            T = T + nextItem.T
        }
        replace = [newText(T)]
    }
    return { remove, replace }
}

export const cutNodes = (root, selectedPaths, selectedNodes) => {
    const { remove, replace } = removeNodes(root, selectedPaths, selectedNodes)
    const clipboard = cloneChildren(selectedNodes, { newID: true })
    return {
        remove,
        replace,
        clipboard,
        selectedPaths: [],
        selectedNodes: []
    }
}

export const copyNodes = (selectedNodes) => ({
    clipboard: cloneChildren(selectedNodes, { newID: true }),
    selectedNodes: [],
    selectedPaths: [],
})

export const deleteNodes = (root, selectedPaths, selectedNodes) => {
    const { remove, replace } = removeNodes(root, selectedPaths, selectedNodes)
    return {
        remove,
        replace,
        clipboard: [],
        selectedPaths: [],
        selectedNodes: []
    }
}

export const pasteNodes = (root, data, atts, clipboard) => {
    let [remove, replace, cb] = [[], [], []]
    const firstItem = firstPath(clipboard)
    const lastItem = lastPath(clipboard)

    if (clipboard.length === 1) {
        if (itemType(firstItem) === 'T') {
            cb = [newText(atts.before + clipboard.slice(0, 1)[0].T + atts.after)]
        }
        else {
            cb = [
                newText(atts.before),
                clone(clipboard[0], { newID: true }),
                newText(atts.after)
            ]
        }
    }
    else {
        if (itemType(firstItem) === 'T' && itemType(lastItem) !== 'T') {
            cb = [newText(atts.before + firstItem.T)]
                .concat(cloneChildren(clipboard.slice(1), { newID: true }))
                .concat(newText(atts.after))
        }
        else if (itemType(firstItem) !== 'T' && itemType(lastItem) === 'T') {
            cb = [newText(atts.before)]
                .concat(cloneChildren(clipboard.slice(0, -1), { newID: true }))
                .concat(newText(lastItem.T + atts.after))
        }
        else if (itemType(firstItem) !== 'T' && itemType(lastItem) !== 'T') {
            cb = [newText(atts.before)]
                .concat(cloneChildren(clipboard, { newID: true }))
                .concat(newText(atts.after))
        }
        else {
            cb = [newText(atts.before + firstItem.T)]
                .concat(cloneChildren(clipboard.slice(1, -1), { newID: true }))
                .concat(newText(lastItem.T + atts.after))
        }
    }
    remove = [data._]
    replace = cloneChildren(cb, { newID: true })
    return {
        remove,
        replace
    }
}

export const pasteEnable = clipboard => {
    return clipboard && clipboard.length > 0
}

export const wrapNodes = (newNS, newName, root, selectedPaths, selectedNodes) => {
    let [remove, replace, wrapper, newPath, newPaths, path] = [[], [], null, null, null, null]

    if (R.QNS.test(newNS) && R.QNAME.test(newName)) {
        const { prevItem, firstItem, lastItem, nextItem } = getOuterElements(root, selectedPaths)
        let children = cloneChildren(selectedNodes, { newID: true })
        let isText = false
        remove = findIDs(root, selectedPaths)

        if (itemType(prevItem) === 'T' ||
            itemType(firstItem) === 'T' ||
            itemType(lastItem) === 'T' ||
            itemType(nextItem) === 'T') {
            isText = true

            if (itemType(firstItem) !== 'T') {
                children = [newText('')].concat(children)
            }

            if (itemType(lastItem) !== 'T') {
                children = children.concat(newText(''))
            }
        }
        else if (itemType(prevItem) === null && itemType(nextItem) === null) {
            children = [newText('')]
                .concat(firstItem)
                .concat(newText(''))
        }

        wrapper = newElement({
            S: newNS,
            N: newName,
            C: children
        })

        replace = [wrapper]
        wrapper = clone(wrapper, { toggle: [wrapper._], newID: false })

        newPath = [...selectedPaths[0]]
        newPaths = [newPath]
        path = newPath

        if (isText) {

            if (itemType(prevItem) !== 'T') {
                replace = [newText('')].concat(replace)
                newPath = pathIncrement(newPath)
                newPaths = [...newPaths, newPath]
                path = newPath
            }

            if (itemType(nextItem) !== 'T') {
                replace = replace.concat(newText(''))
                newPath = pathIncrement(newPath)
                newPaths = [...newPaths, newPath]
            }
        }
    }
    return ({
        remove,
        replace,
        wrapper,
        path,
        selectedPaths: newPaths,
        selectedNodes: wrapper
    })
}

export const unwrapNode = (root, path = []) => {
    const currItem = find(root, [...path]).slice(-1)[0]
    const { prevItem, nextItem } = getOuterElements(root, [path])
    let remove = []
    let replace = []

    if (prevItem && nextItem) {
        remove = [prevItem._, currItem._, nextItem._]

        if (itemType(currItem) === 'N') {
            const children = cloneChildren(currItem.C, { newID: true })
            const firstItem = firstPath(children)
            const lastItem = lastPath(children)
            replace = cloneChildren(currItem.C, { newID: true })

            if (itemType(prevItem) === 'T' ||
                itemType(firstItem) === 'T' ||
                itemType(lastItem) === 'T' ||
                itemType(nextItem) === 'T') {

                if (children.length === 1 &&
                    itemType(prevItem) === 'T' &&
                    itemType(firstItem) === 'T' &&
                    itemType(nextItem) === 'T') {
                    replace = [concatTextNodes(prevItem, firstItem, nextItem)]
                }

                else if (children.length > 1) {

                    if (itemType(prevItem) === 'T' &&
                        itemType(firstItem) === 'T') {
                        replace = [concatTextNodes(prevItem, firstItem)]
                            .concat(replace.slice(1))
                    }

                    if (itemType(nextItem) === 'T' &&
                        itemType(lastItem) === 'T') {
                        replace = replace.slice(0, -1)
                            .concat(concatTextNodes(lastItem, nextItem))
                    }
                }
            }
        }
        else if (itemType(currItem) === 'D'
            && itemType(prevItem) === 'T'
            && itemType(nextItem) === 'T') {
            replace = [newText(`${prevItem.T}${unEscapeXML(currItem.D)}${nextItem.T}`)]
        }
        else if (itemType(currItem) === 'M'
            && itemType(prevItem) === 'T'
            && itemType(nextItem) === 'T') {
            replace = [newText(`${prevItem.T}${unEscapeXML(currItem.M)}${nextItem.T}`)]
        }
        else if (itemType(currItem) === 'P'
            && itemType(prevItem) === 'T'
            && itemType(nextItem) === 'T') {
            replace = [newText(`${prevItem.T}${unEscapeXML(currItem.B)}${nextItem.T}`)]
        }
    }
    return ({ remove, replace })
}

export const getNamespaces = A => Object.keys(A)

export const getNames = (A, ns) => Object.keys(A[ns])

export const hasAttributes = A => {
    let result = false
    Object.keys(A).forEach(ns => {
        if (Object.keys(A[ns]).length > 0) {
            result = true
        }
    })
    return result
}



/// TEXT EDITOR METHODS

export const insertNode = (data, atts) => {
    let [remove, replace, before, inside, insideText, after] =
        [[], [], '', '', '', '']
    if (R.QNS.test(atts.S) && R.QNAME.test(atts.N)) {
        const S = atts.S || '@'
        inside = newElement({
            S: S,
            N: atts.N,
            A: {},
            C: [newText(atts.inside)]
        })
        before = newText(atts.before)
        after = newText(atts.after)
        remove = [data._]
        replace = [
            before,
            inside,
            after
        ]
        insideText = inside.C[0]
    }
    return ({ remove, replace, before, inside, insideText, after })
}

export const updateText = (data, text) => _update(data, { T: text })

/**
 * Concatenate the texts in 2 or more TextNodes 
 * and return them as a single node
 * @param  {...TextNode} textNodes 
 */
const concatTextNodes = (...textNodes) => {
    let T = ""
    textNodes.forEach(textNode => {
        T = T + textNode.T
    })
    return newText(T)
}

// COMMENT EDITOR METHODS

export const insertComment = (data, atts) => _insert(data, atts, newComment(atts.inside))

export const updateComment = (data, comment) => _update(data, { M: comment })


// CDATA EDITOR METHODS

export const insertCDATA = (data, atts) => _insert(data, atts, newCDATA(atts.inside))

export const updateCDATA = (data, cdata) => _update(data, { D: cdata })

// PI EDITOR METHODS

export const insertPI = (data, atts) =>
    R.LANG.test(atts.lang) ?
        _insert(data, atts, newPI(atts.lang, atts.inside)) :
        { remove: [], replace: null, obj: {} }


export const updatePI = (data, lang, body) => _update(data, { L: lang, B: body })

const _insert = (data, atts, obj) => {
    const before = newText(atts.before)
    const after = newText(atts.after)
    const remove = [data._]
    const replace = [
        before,
        obj,
        after
    ]
    return ({ remove, replace, obj })
}

const _update = (data, obj) => ({
    remove: [data._],
    replace: [{
        ...data,
        ...obj,
        _: data._
    }]
})

/**
 * Return a string of space characters of length length
 * @param {int} length 
 * @param {char} spaceChar 
 */
export const makeSpacing = (length, spaceChar) => {
    let prefix = ''
    length > 0 && Array(length).fill().map((_, i) => {
        prefix += spaceChar
    })
    return prefix
}

// XML EDITOR FUNCTIONS
export const setSelected = (root, _selectedPaths = [], path) => {

    let selectedPaths = updatePaths(_selectedPaths, path)
    let ids = findIDs(root, selectedPaths)
    let nodes = findTags(root, selectedPaths)

    let selectedNodes = []
    nodes.map((node, i) => {
        selectedNodes = [...selectedNodes, node[node.length - 1]]
    })

    return ({
        root: clone(root, { toggle: ids, newID: true }),
        selectedPaths,
        selectedNodes
    })
}

export const clearSelected = root => ({
    root: clone(root, { clear: true, newID: false }),
    selectedPaths: [],
    selectedNodes: []
})

export const clearAll = () => ({
    selectedPaths: [],
    selectedNodes: []
})

const updatePaths = (paths, newPath) => {
    if (newPath === null) {
        return []
    }
    else if (paths.length === 0) {
        return [[...newPath]]
    }
    else {
        const start = comparePaths(paths[0], newPath)
        const end = comparePaths(paths[paths.length - 1], newPath)

        if (start === -1) {
            return [[...newPath], ...paths]
        }
        else if (start === 0) {
            return [...paths.slice(1)]
        }
        else if (end === 1) {
            return [...paths, [...newPath]]
        }
        else if (end === 0) {
            return [...paths.slice(0, -1)]
        }
        else {
            return [[...newPath]]
        }
    }
}

/**
 * Compares 2 paths to see if they are adjacent
 * and if so, which comes first.
 * If path1 === path2, return 0
 * If path1 === path2 + 1, return -1
 * If path1 === path2 - 1, return +1
 * Else return null (Paths are not adjacent)
 * @param {array(int)} path1 
 * @param {array(int)} path2 
 */
const comparePaths = (path1, path2) => {
    if (path1.length === 0 || path2.length === 0 ||
        path1.length !== path2.length) {
        return null
    }
    else {
        let status = true
        path1.slice(0, -1).map((p, i) => {
            if (p !== path2[i]) {
                status = false
            }
        })
        if (status === true) {
            const p1 = path1[path1.length - 1]
            const p2 = path2[path2.length - 1]
            if (p1 === p2 + 1) {
                return -1
            }
            else if (p1 === p2 - 1) {
                return 1
            }
            else if (p1 === p2) {
                return 0
            }
        }
    }
    return null
}

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
const firstPath = paths => paths.slice(0, 1)[0]

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
const lastPath = paths => paths.slice(-1)[0]

/**
 * Returns the index of the last child of an element node which will be length - 1
 * @param {snac} root 
 * @param {array} path 
 */
const lastChildIndex = (root, path) => find(root, path).slice(-1)[0].C.length - 1

/**
 * Returns the index of the last child of the parent node of an element.
 * @param {snac} root 
 * @param {array} path 
 */
const parentLastChildIndex = (root, path) => lastChildIndex(root, pathParent(path))

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
const currPathItem = (root, path) => lastPath(find(root, path))

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
const prevPathItem = (root, path) =>
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
const nextPathItem = (root, path) =>
    lastPath(path) < parentLastChildIndex(root, path) ?
        lastPath(find(root, pathIncrement(path))) :
        null


/**
 * return {
 *      prevItem: previous node,
 *      firstItem: first child node,
 *      lastItem: last child node,
 *      nextItem: next node
 * }
 * @param {snac} root 
 * @param {array(paths)} selectedPaths 
 */
const getOuterElements = (root, selectedPaths) => {
    const fp = firstPath(selectedPaths)
    const lp = lastPath(selectedPaths)
    return {
        prevItem: prevPathItem(root, fp),
        firstItem: currPathItem(root, fp),
        lastItem: currPathItem(root, lp),
        nextItem: nextPathItem(root, lp)
    }
}

/**
 * Return the type of an item as a single letter
 * 'N' = Element node
 * 'T' = Text node
 * 'D' = CDATA eode
 * 'M' = Comment node
 * 'P' = Processing Instruction node
 * @param {string} item 
 */
export const itemType = item =>
    item !== null && item._ ?
        item._.slice(0, 1) :
        null


export const snac2xml = snac => element2xml(snac, 0)

const element2xml = (snac, depth, prefix = "\t") => {
    const prefix1 = makeSpacing(depth, prefix)
    const prefix2 = makeSpacing(depth + 1, prefix)
    let nodeName = snac.S ?
        `${snac.S}:${snac.N}` :
        snac.N
    let xml = `${prefix1}<${nodeName} ${atts2xml(snac.A, depth, prefix)}>\n`
    snac.C.forEach((c, i) => {
        switch (itemType(c)) {
            case 'N':
                xml = xml + element2xml(c, depth + 1, prefix)
                break;
            case 'T':
                xml = xml + `${prefix2}${escapeXML(c.T)}\n`
                break;
            case 'D':
                xml = xml + `${prefix2}<![CDATA[${escapeCDATA(c.D)}]]>`
                break;
            case 'M':
                xml = xml + `${prefix2}<!--${escapeComment(c.M)}-->`
                break;
            case 'P':
                xml = xml + `${prefix2}<?${c.L} ${escapePI(c.B)}?>`
                break;
            default:
        }
    })
    xml = xml + `${prefix1}</${nodeName}>\n`
    return xml
}

const atts2xml = (atts, depth, prefix) => {
    let xml = ""
    const _prefix = makeSpacing(depth, prefix)
    Object.keys(atts).forEach(attNS => {
        Object.keys(atts[attNS]).forEach(attName => {
            xml += attNS === "@" ?
                `\n${_prefix} ${attName}="${escapeXML(atts[attNS][attName])}"` :
                `\n${_prefix} ${attNS}:${attName}="${escapeXML(atts[attNS][attName])}"`
        })
    })
    return xml
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

export const getPrefixItem = (type, index, data) => type === 'N' ? [index, data.C.length] : [index]

export const getPrefixString = (prefixArray, prefixOff, prefixOn) => {
    let out = ""
    prefixArray.forEach(prefixItem => {
        out = out + (prefixItem ? prefixOn : prefixOff)
    })
    return out
}

export const getPrefixArray = (prefixArray, enabled) => {
    let out = []

    prefixArray.forEach((prefixItem, index) => {
        index <= 1 ?
            out = [...out, false] :
            enabled ?
                prefixItem.length === 1 ?
                    out = [...out, true] :
                    prefixArray[index][0] < prefixArray[index - 1][1] - 1 ?
                        out = [...out, true] :
                        out = [...out, false] :
                out = [...out, false]
    })
    return out
}

export const getPrefix = (prefixArray, enabled, twoLine, prefixOn, prefixOff) => {
    let prefixString = ''
    prefixArray.forEach((prefixItem, index) => {
        index <= 1 ?
            prefixString = prefixString + prefixOff :
            enabled ?
                prefixItem.length === 1 ?
                    prefixString = prefixString + prefixOn :
                    prefixArray[index][0] < prefixArray[index - 1][1] - 1 ?
                        prefixString = prefixString + prefixOn :
                        prefixString = prefixString + prefixOff :
                prefixString = prefixString + prefixOff
    })
    return twoLine ?
        prefixString + prefixOn :
        prefixString
}

/**
 * Check if array has a key and return the value at that key
 * Otherwise return alt
 * @param {array} arr Array to be tested
 * @param {integer} key Key to find
 * @param {integer} alt Return this if key not found
 */
export const has = (arr, key, alt) =>
    arr.hasOwnProperty(key) ? arr[key] : alt

/**
 * Escape < > & ' " characters in a string
 * @param {String} str 
 */
export const escapeXML = str =>
    _escape(str, [
        ["&", "&amp;"],
        ["<", "&lt;"],
        [">", "&gt;"],
        ["'", "&apos;"],
        ['"', "&quot;"]
    ])

/**
 * Unescape &lt; &gt; &amp; &apos, &quot escape codes in a string.
 * @param {String} str 
 */
export const unEscapeXML = str =>
    _escape(str, [
        ["&lt;", "<"],
        ["&gt;", ">"],
        ["&amp;", "&"],
        ["&apos;", "'"],
        ["&quot;", '"']
    ])

/**
 * Escape ]]> as ]]&lt; in a CDATA string.
 * @param {String} str 
 */
export const escapeCDATA = str => _escape(str, [["]]>", "]]&gt;"]])

/**
 * Escape --> as --&lt; in a Comment string.
 * @param {String} str 
 */
export const escapeComment = str => _escape(str, [
    ["--", "- - "],
    [/^-/, " -"],
    [/-$/, "- "]
])

/**
 * Escape ?> as ?&lt; in a Processing Instruction string.
 * @param {String} str 
 */
export const escapePI = str => _escape(str, [["?>", "?&gt;"]])

/**
 * Replace each <string> with <replacement> in str and return the result
 * @param {String} str 
 * @param {Arrray of [string, replacement] pairs} subs 
 */
const _escape = (str, subs) => {
    subs.forEach(s => {
        str = str.split(s[0]).join(s[1])
    })
    return str
}

/**
 * Normalize a string. Convert all blocks of one or more space, tab 
 * and newline charcters with single spaces.
 * @param {String} txt 
 */
export const normalize = txt => txt.trim().split(/\s+/).join(' ')
