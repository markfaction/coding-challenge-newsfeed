import IEventsLoadingStrategy from "./interfaces/IEventsLoadingStrategy";
import { FeedItem } from "common/types";
import { getAnnouncementsForFellowship } from './query/getAnnouncements';
import { getFoundersAndAngels } from './query/getUsers';
import { getFounderProjects } from './query/getProjects';
import { AnnouncementRow, UserRow, ProjectRow } from "graphql/db";
import getUniqueUniversalId from './../../utils/UUIDGenerator';
import { FELLOWSHIP } from "common/constants/fellowship";

export default class FounderEventsLoadingStrategy implements IEventsLoadingStrategy {
    public async execute(): Promise<Array<FeedItem>> {

        // Founders are interested in announcements targeting founders and all users
        const announcements: AnnouncementRow[] = await getAnnouncementsForFellowship(FELLOWSHIP.FOUNDERS);
        const announcementFeedItems: FeedItem[] = announcements.map((announcement) => {
            return {
                id: getUniqueUniversalId(),
                created: new Date(announcement.created_ts),
                type: "announcement",
                value: {
                    id: announcement.id,
                    fellowship: announcement.fellowship,
                    title: announcement.title,
                    body: announcement.body,
                }
            }
        });

        // Founders are interested in new founder projects
        const founderProjects: ProjectRow[] = await getFounderProjects();
        const projectFeedItems: FeedItem[] = founderProjects.map((project) => {
            return {
                id: getUniqueUniversalId(),
                created: new Date(project.created_ts),
                type: "project",
                value: {
                    id: project.id,
                    name: project.name,
                    description: project.description,
                    icon_url: project.icon_url,
                    users: [],
                }
            }
        });

        // Founders are interested in connecting to angels and other founders
        const founderAndAngels: UserRow[] = await getFoundersAndAngels();
        const userFeedItems: FeedItem[] = founderAndAngels.map((user) => {
            return {
                id: getUniqueUniversalId(),
                created: new Date(user.created_ts),
                type: "user",
                value: {
                    id: user.id,
                    name: user.name,
                    bio: user.bio || "No Bio Provided...",
                    fellowship: user.fellowship,
                    avatar_url: user.avatar_url,
                    projects: [],
                }
            }
        });

        return [...announcementFeedItems, ...projectFeedItems, ...userFeedItems];
    }
}