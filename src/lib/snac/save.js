import { NSNameTest } from './regex'
import { saveAttributes} from './attributes'

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