import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono, z } from '@hono/zod-openapi'
import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono'
import { itemApi } from './component/item/controller';

// const app = new Hono<{ Bindings: CloudflareBindings }>()

export type Bindings = {
  DB: D1Database
}

const app = new OpenAPIHono<{Bindings: Bindings}>();


app.get('/swagger', swaggerUI({ url: '/doc' }))

app.route('', itemApi)


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