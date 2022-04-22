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

export async function getAnnouncementsForFounders(): Promise<AnnouncementRow[]> {
    const announcements: Array<AnnouncementRow> | undefined = await db.getAll(
        "SELECT * FROM announcements WHERE fellowship IN ('all', 'founders')",
        []
    )
    if (!announcements) {
        throw new Error(`Announcements not found for founders`);
    }
    return announcements;
}

export async function getAnnouncementsForAngels(): Promise<AnnouncementRow[]> {
    const announcements: Array<AnnouncementRow> | undefined = await db.getAll(
        "SELECT * FROM announcements WHERE fellowship IN ('all', 'angels')",
        []
    )
    if (!announcements) {
        throw new Error(`Announcements not found for angels`);
    }
    return announcements;
}
