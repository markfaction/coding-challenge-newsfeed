import {User, Project, Announcement} from '../../../common/types';


export default async function __resolveType(obj: any, context: any, info: any) {
    if(obj.description) return "Project";

    if(obj.bio) return "User";

    if(obj.title) return "Announcement";

    return null;
}