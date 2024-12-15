import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/note/:userName/:userId', (c) => {
  const userName = c.req.param('userName');
  const userId = c.req.param('userId');

  return c.text(`Hello ${userName} and ${userId}`)
})

export default app