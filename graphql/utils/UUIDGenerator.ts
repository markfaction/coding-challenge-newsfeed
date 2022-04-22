import {v4 as uuidv4} from 'uuid';

export default function getUniqueUniversalId() {
    const uuid = uuidv4();
    return uuid;
}
