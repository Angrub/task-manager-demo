import { ReducedTask, Task, TaskDto, TaskStorageInterface } from "../../interfaces/tasks.interfaces";
import { query } from "../../database";

class TaskStorage implements TaskStorageInterface {
    constructor(){} 

    async list(session: string) {
        const sql = 'SELECT id, title, description, status, deadline FROM tasks WHERE session_id = ?';
        const tasks = await query<ReducedTask[]>(sql, [session]);

        return tasks;
    }

    async findOne(id: number) {
        const sql = 'SELECT * FROM tasks WHERE ? = id';
        const tasks = await query<Task[]>(sql, [id]);

        return tasks.length === 0 ? undefined : tasks[0];
    }

    async create(data: TaskDto) {
        const sql = 'INSERT INTO tasks SET ?';
        await query(sql, data);
    }

    async edit(id: number, data: TaskDto) {
        const sql = `UPDATE tasks SET ? WHERE id = ${id}`;
        await query(sql, data);
    }

    async remove(id: number) {
        const sql = 'DELETE FROM tasks WHERE id = ?';
        await query(sql, [id]);
        return id;
    }
}

export { TaskStorage }