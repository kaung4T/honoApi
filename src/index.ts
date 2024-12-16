import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono, z } from '@hono/zod-openapi'
import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

import { Hono } from 'hono'

// const app = new Hono<{ Bindings: CloudflareBindings }>()

type Bindings = {
  DB: D1Database
}

const app = new OpenAPIHono<{Bindings: Bindings}>();


app.get('/swagger', swaggerUI({ url: '/doc' }))

app.openapi({
  path: 'items/:userId',
  method: 'get',
  request: {
    params: z.object({
      userId: z.string().openapi({
        param: {
          name: "userId",
          in: "path"
        }
      })
    })
  },
  responses: {
    200: {
      description: ''
    }
  }
}, async (c) => {
  const {userId} = c.req.valid("param")
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });
  try {
    const resposne = await prisma.task.findMany();
    const context = {
      data: resposne,
      param: userId
    }
    return c.json(context)
  }
  catch (e) {
    return c.json({ error: e })
  }
})


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/note/:userName/:userId', (c) => {
  const userName = c.req.param('userName');
  const userId = c.req.param('userId');

  return c.text(`Hello ${userName} and ${userId}`)
})

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
})

export default app