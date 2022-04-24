import db, {ProjectRow} from '../../../db';
import { FELLOWSHIP } from 'common/constants/fellowship';

export async function getFounderProjects(): Promise<ProjectRow[]> {
    const projects: Array<ProjectRow> | undefined = await db.getAll(
        `
        SELECT DISTINCT p.* FROM projects p 
        JOIN user_projects up ON up.project_id = p.id
        JOIN users u on u.id = up.user_id
        WHERE u.fellowship = ?`,
        [FELLOWSHIP.FOUNDERS]
    )
    if (!projects) {
        throw new Error(`Projects not found`);
    }
    return projects;
}