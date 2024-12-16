import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi'
import { Hono } from 'hono'

// const app = new Hono<{ Bindings: CloudflareBindings }>()

const app = new OpenAPIHono()


app.get('/swagger', swaggerUI({ url: '/doc' }))





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