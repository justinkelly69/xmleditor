import { A, C } from './datatypes'
import  SNAC  from '../lib/snac'
import { cd, waffle, waffle_flat, waffles } from './xmldata'

export const initialData = {
    [A.ROOT]: SNAC.xml2snac(waffle),
    [A.CLIPBOARD]: []
}