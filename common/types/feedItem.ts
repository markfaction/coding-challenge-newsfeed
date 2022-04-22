import {User} from './user';
import {Project} from './project';
import { Announcement } from './announcement';


export type FeedItem = {
    id: string,
    created: Date,
    type: "user" | "project" | "announcement",
    value: User | Project | Announcement,
}