import { z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'

const app = new OpenAPIHono()

const SignupInput = z.object({
    username: z.string(),
    password: z.string(),
}).openapi({
    description: "User credentials",
    required: ["username", "password"]
});

const SignupOutput = z.object({
    message: z.string()
}).openapi('User signed up message')

const signupRoute = createRoute({
    method: 'post',
    path: '/signup',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: SignupInput,
                },
            },
            required: true,
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: SignupOutput,
                },
            },
            description: 'Retrieve the user',
        },
    },
})

app.openapi(signupRoute, (c) => {
    const { username, password } = c.req.valid('json')
    return c.json({
        message: "You are signed up"
    })
});

app.get('/ui', swaggerUI({ url: '/doc' }))

app.doc('/doc', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'My API',
    },
})

export default app