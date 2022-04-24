import db, {AnnouncementRow} from '../../../db';
import { FELLOWSHIP } from 'common/constants/fellowship';

export async function getAnnouncementsForFellowship(argVal: String): Promise<AnnouncementRow[]> {
    const announcements: Array<AnnouncementRow> | undefined = await db.getAll(
        "SELECT * FROM announcements WHERE fellowship IN (?, ?)",
        [FELLOWSHIP.ALL, argVal]
    )
    if (!announcements) {
        throw new Error(`Announcements not found`);
    }
    return announcements;
}
