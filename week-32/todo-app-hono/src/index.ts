import { Hono } from 'hono'

const app = new Hono()

app.post('/api/v1/signup', async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("userId"));

  return c.json({
    message: "Signup successfully!"
  })
})

app.post('/api/v1/signin', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/todo', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/todos', (c) => {
  return c.text('Hello Hono!')
})

export default app;