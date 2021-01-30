import {
    saveNode
} from './save'

import {
    attributesLength, attributesOpenClose, updateAttributeValue,
    markAttributeDeleted, insertAttribute, getAttribute, loadAttributes,
    saveAttributes, allClose, attsOpen, removeEmptyObjects
} from './attributes'

import { NSNameTest, attNSNameTest, piLangTest, attNS, attName } from './regex'

import { xml2snac, xml2element, xml2atts, xml2kids } from './xml2snac'
import {
    newElement, newText, newCDATA, newComment, newPI, newIPoint,
    clone, cloneElement, cloneAttributes, cloneChildren, cloneText,
    cloneCDATA, cloneComment, clonePI
} from './clone'

import {
    itemType, has, escapeXML, unEscapeXML, escapeCDATA, escapeComment, escapePI,
    normalize, getNamespaces, getNames, hasAttributes, getNS
} from './helpers'

import {
    find, findTag, findTags, findIDs, findID, findPrevID, findNextID, findParentID
} from './find'

import {
    pathParent, pathDecrement, pathIncrement, firstPath, lastPath, lastChildIndex,
    parentLastChildIndex, currPathItem, prevPathItem, nextPathItem
} from './path'

import {
    insertNode, updateText, insertComment, updateComment,
    insertCDATA, updateCDATA, insertPI, updatePI, concatTextNodes
} from './texts'

import { setSelected, clearSelected, clearAll, getOuterElements } from './selector'

import {
    cutNodes, copyNodes, deleteNodes, pasteNodes, wrapNodes, unwrapNode
} from './clipboard'

import {
    getPrefixItem, getPrefixString, getPrefixArray, getPrefix, makeSpacing
} from './prefix'

import {snac2xml} from './snac2xml'


export {
    xml2snac, clone,
    saveNode, getNS, cutNodes, copyNodes,
    deleteNodes, pasteNodes, wrapNodes, unwrapNode, getNamespaces,
    getNames, hasAttributes, insertNode, updateText, insertComment,
    updateComment, insertCDATA, updateCDATA, insertPI, updatePI,
    makeSpacing, setSelected, clearSelected, clearAll, pathParent,
    pathDecrement, pathIncrement, itemType, snac2xml, findTag,
    findTags, findIDs, findID, findPrevID, findNextID, findParentID,
    find, getPrefixItem, getPrefixString, getPrefixArray, getPrefix,
    has, escapeXML, unEscapeXML, escapeCDATA, escapeComment, escapePI, normalize,

    attributesLength, attributesOpenClose, updateAttributeValue,
    markAttributeDeleted, insertAttribute, getAttribute, loadAttributes,
    saveAttributes, allClose, attsOpen,

    NSNameTest, attNSNameTest, piLangTest, attNS, attName
}