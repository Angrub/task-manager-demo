const config = {
    port: process.env.API_PORT || 3030,
    session_secret: process.env.SESSION_SECRET || '',
    db: {
        password: process.env.MYSQL_ROOT_PASSWORD || '',
        name: process.env.MYSQL_DB || '',
        host: process.env.MYSQL_HOST || ''
    }
}

export { config }