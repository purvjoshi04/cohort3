import { createClient } from "redis";

async function main() {
    const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();

    const res = await client.xReadGroup('usa', 'us-1', {
        key: 'pingbase:website',
        id: '>'
    }, {
        COUNT: 2
    });

    console.log(res);

}