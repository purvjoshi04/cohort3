import { createClient } from 'redis';


async function main() {
    const client = await createClient({
        url: "redis://localhost:6379"
    })
        .on('error', err => console.log('Redis Client Error', err))
        .connect();

    const res = await client.xAdd("pingbase:website", "*", {
        url: "https://facebook.com",
        id: "1"
    });

    console.log(res);
    client.destroy();
}

main();