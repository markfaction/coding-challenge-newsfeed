import db, {UserRow} from '../../../db';

export async function getWriters(): Promise<UserRow[]> {
    const writers: Array<UserRow> | undefined = await db.getAll(
        "SELECT * FROM users WHERE fellowship = 'writers'",
        []
    )
    if (!writers) {
        throw new Error(`Writers not found in DB`);
    }
    return writers;
}
