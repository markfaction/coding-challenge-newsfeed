import IEventsLoadingStrategy from "./interfaces/IEventsLoadingStrategy";
import { FeedItem } from "common/types";
import {getAnnouncementsForWriters} from './query/getAnnouncements';
import { AnnouncementRow } from "graphql/db";
import getUniqueUniversalId from './../../utils/UUIDGenerator';

export default class WriterEventsLoadingStrategy implements IEventsLoadingStrategy {

    public async execute(): Promise<Array<FeedItem>> {
        const announcements: AnnouncementRow[] = await getAnnouncementsForWriters();

        const writerFeedItems: FeedItem[] = announcements.map((announcement) => {
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

        return writerFeedItems;
    }
}