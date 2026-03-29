const fs = require("fs");

function readFileData(err, data) {
    console.log(data)
}

fs.readFile("test.txt", "utf-8", readFileData);
fs.readFile("test2.txt", "utf-8", readFileData);



