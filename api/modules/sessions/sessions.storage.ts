import { SessionStorageInterface, Session } from "../../interfaces/sessions.interfaces";
import { query } from "../../database";

class SessionStorage implements SessionStorageInterface {
    constructor(){}

    async findOne(sessionId: string) {
        const sql = 'SELECT * FROM sessions WHERE session_id = ?';
        const session = await query<Promise<Session[]>>(sql, [sessionId]);
        
        return session.length === 0 ? undefined : session[0];
    }

    async create(sessionId: string) {
        const sql = 'INSERT INTO sessions (session_id) VALUES (?)';
        await query(sql, [sessionId]);
    }
}

export { SessionStorage }