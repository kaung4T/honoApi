import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi'
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
  path: 'items',
  method: 'get',
  request: {

  },
  responses: {
    200: {
      description: ''
    }
  }
}, async (c) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });
  try {
    const resposne = await prisma.item.findMany();
    return c.json(resposne)
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