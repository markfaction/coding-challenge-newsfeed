import IEventsLoadingStrategy from "./interfaces/IEventsLoadingStrategy";
import { FeedItem } from "common/types";
import {getAnnouncementsForWriters} from './query/getAnnouncements';
import {getWriters} from './query/getUsers';
import { AnnouncementRow, UserRow } from "graphql/db";
import getUniqueUniversalId from './../../utils/UUIDGenerator';

export default class WriterEventsLoadingStrategy implements IEventsLoadingStrategy {

    public async execute(): Promise<Array<FeedItem>> {

        // Writers are interested in announcements targeting writers and all users
        const announcements: AnnouncementRow[] = await getAnnouncementsForWriters();

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

        // Writers are interested in users who are other writers
        const writers: UserRow[] = await getWriters();
        const userFeedItems: FeedItem[] = writers.map((writer) => {
            return {
                id: getUniqueUniversalId(),
                created: new Date(writer.created_ts),
                type: "user",
                value: {
                    id: writer.id,
                    name: writer.name,
                    bio: writer.bio || "No Bio Provided...",
                    fellowship: writer.fellowship,
                    avatar_url: writer.avatar_url,
                    projects: [],
                }
            }
        });

        return [...announcementFeedItems, ...userFeedItems];
    }
}