import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.3",
    info: {
        title: "Task manager",
        description: "Sistema de gestion de tareas",
        version: "1.0.0" 
    },
    servers: [
        {
            url: "http://localhost:3000",
        }
    ],
    components: {
        schemas: {
            Task: {
                type: "object",
                required: [
                    "session_id",
                    "title",
                    "description",
                    "status",
                    "deadline"
                ],
                properties: {
                    session_id: {
                        type: "string",
                        example: "123e4567-e89b-12d3-a456-426655440000"
                    },
                    title: {
                        type: "string",
                        example: "Titulo interesante"
                    },
                    description: {
                        type: "string",
                        example: "lorem ipsu"
                    },
                    status: {
                        type: "string",
                        description: "Estatus de la tarea",
                        example: "done",
                        enum: ['to-do', 'in-progress', 'done', 'locked']
                    },
                    deadline: {
                        type: "string",
                        format: "date-time",
                        example: "2023-02-17T23:59:35.279Z"
                    },
                    comments: {
                        type: "string",
                        example: "Lorem ipsu"
                    },
                    owner: {
                        type: "string",
                        example: "Damián"
                    },
                    tags: {
                        type: "string",
                        example: "Trabajo, Escuela, Salud"
                    }
                }
            },
            ReducedTask: {
                type: "object",
                properties: {
                    session_id: {
                        type: "string",
                        example: "123e4567-e89b-12d3-a456-426655440000"
                    },
                    title: {
                        type: "string",
                        example: "Titulo interesante"
                    },
                    description: {
                        type: "string",
                        example: "lorem ipsu"
                    },
                    status: {
                        type: "string",
                        description: "Estatus de la tarea",
                        example: "done",
                        enum: ['to-do', 'in-progress', 'done', 'locked']
                    },
                    deadline: {
                        type: "string",
                        format: "date-time",
                        example: "2023-02-17T23:59:35.279Z"
                    }
                }
            },
            Session: {
                type: "object",
                properties: {
                    session_id: {
                        type: "string",
                        example: "123e4567-e89b-12d3-a456-426655440000"
                    }
                }
            },
            ApiResponse: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "Created"
                    }
                }
            },
            DeleteResponse: {
                type: "object",
                properties: {
                    task_id: {
                        type: "integer",
                        format: "int64",
                        example: 2
                    },
                    message: {
                        type: "string",
                        example: "eleted"
                    }
                }
            }
        }
    }
}

const options: OAS3Options = {
    swaggerDefinition,
    apis: [
        './api/modules/tasks/tasks.routes.ts',
        './api/modules/sessions/sessions.routes.ts'
    ]
}

const swaggerSetup = swaggerJSDoc(options)
export { swaggerSetup }