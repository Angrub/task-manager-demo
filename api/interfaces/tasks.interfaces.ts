interface TaskStorageInterface {
    list: (session: string) => Promise<ReducedTask[]>;
    findOne: (id: number) => Promise<Task | undefined>;
    create: (data: TaskDto) => Promise<void>;
    edit: (id: number, data: TaskDto) => Promise<void>;
    remove: (id: number, session: string) => Promise<number>;
}

interface TaskDto {
    session_id: string;
    title: string;
    description: string;
    status: 'to-do' | 'in-progress' | 'done' | 'locked';
    deadline: Date;
    comments?: string;
    owner?: string;
    tags?: string;
}

interface Task extends TaskDto {
    id: number
}

interface ReducedTask extends Omit<Task, 'comments' | 'owner' | 'tags'> {}

export {
    TaskStorageInterface,
    TaskDto,
    Task,
    ReducedTask
}