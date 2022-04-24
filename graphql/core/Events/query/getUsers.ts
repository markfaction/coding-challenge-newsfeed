import db, {UserRow} from '../../../db';
import { FELLOWSHIP } from 'common/constants/fellowship';

export async function getWriters(): Promise<UserRow[]> {
    const writers: Array<UserRow> | undefined = await db.getAll(
        "SELECT * FROM users WHERE fellowship = ?",
        [FELLOWSHIP.WRITERS]
    )
    if (!writers) {
        throw new Error(`Writers not found in DB`);
    }
    return writers;
}

export async function getFoundersAndAngels(): Promise<UserRow[]> {
    const angelsAndOtherFounders: Array<UserRow> | undefined = await db.getAll(
        "SELECT * FROM users WHERE fellowship IN (?, ?)",
        [FELLOWSHIP.ANGELS, FELLOWSHIP.FOUNDERS]
    )
    if (!angelsAndOtherFounders) {
        throw new Error(`Users not found in DB`);
    }
    return angelsAndOtherFounders;
}
