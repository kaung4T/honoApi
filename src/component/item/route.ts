import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";


export const itemRoute = createRoute({
    path: '/items/{userId}',
    method: 'get',
    request: {
        params: z.object({
            userId: z.string().openapi({
                param: {
                    name: 'userId',
                    in: 'path'
                }
            })
        })
    },
    responses: {
        200: {
            description: ''
        }
    }
})

export const itemRouteCreate = createRoute({
    path: 'items/create',
    method: 'post',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        name: z.string()
                    })
                }
            }
        }
    },
    responses: {
        201: {
            description: ''
        }
    }
})

export const itemRouteUpdate = createRoute({
    path: 'items/update/{taskId}',
    method: 'patch',
    request: {
        params: z.object({
            taskId: z.string().openapi({
                param: {
                    name: 'taskId',
                    in: 'path'
                }
            })
        }),
        body: {
            required: true,
            content: {
                'application/json': {
                    schema: z.object({
                        name: z.string()
                    })
                }
            }
        }
    },
    responses: {
        200: {
            description: ''
        }
    }
})

export const itemRouteDelete = createRoute({
    path: 'items/delete/{taskId}',
    method: 'delete',
    request: {
        params: z.object({
            taskId: z.string().openapi({
                param: {
                    name: 'taskId',
                    in: 'path'
                }
            })
        })
    },
    responses: {
        200: {
            description: ''
        }
    }
})



