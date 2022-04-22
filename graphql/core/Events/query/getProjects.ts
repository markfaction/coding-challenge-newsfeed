import db, {ProjectRow} from '../../../db';

export async function getFounderProjects(): Promise<ProjectRow[]> {
    const projects: Array<ProjectRow> | undefined = await db.getAll(
        `
        SELECT p.* FROM projects p 
        JOIN user_projects up ON up.project_id = p.id
        JOIN users u on u.id = up.user_id
        WHERE u.fellowship = 'founders'`,
        []
    )
    if (!projects) {
        throw new Error(`Writers not found in DB`);
    }
    return projects;
}