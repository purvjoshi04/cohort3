import { PrismaClient } from './generated/prisma'

const client = new PrismaClient()

async function main() {
    const user = await client.user.create({
        data: {
            username: 'john_doe',
            password: 'securepassword123',
            age: 25,
            todos: {
                create: [
                    {
                        title: 'Learn Prisma',
                        description: 'Complete the Prisma tutorial',
                        done: false
                    },
                    {
                        title: 'Build an API',
                        description: 'Create a REST API with Prisma',
                        done: false
                    }
                ]
            }
        },
        include: {
            todos: true
        }
    })

    console.log('User with todos:', JSON.stringify(user, null, 2))
}

main()
    .catch(console.error)
    .finally(async () => {
        await client.$disconnect()
    })