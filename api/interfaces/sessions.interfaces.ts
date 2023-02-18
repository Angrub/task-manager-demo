interface SessionStorageInterface {
    findOne: (sessionId: string) => Promise<Session | undefined>;
    create: (sessionId: string) => Promise<void>;
}

interface Session {
    id: number;
    session_id: string;
}

export {
    SessionStorageInterface,
    Session
}