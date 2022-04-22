import db, {AnnouncementRow} from '../../../db';

export async function getAnnouncementsForWriters(): Promise<AnnouncementRow[]> {
    const announcements: Array<AnnouncementRow> | undefined = await db.getAll(
        "SELECT * FROM announcements WHERE fellowship IN ('all', 'writers')",
        []
    )
    if (!announcements) {
        throw new Error(`Announcements not found for writers`);
    }
    return announcements;
}
