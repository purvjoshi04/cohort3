const fs = require('fs');

async function writeInFile(filePath, data) {
    try {
        await fs.writeFile(filePath, data, 'utf-8');
        console.log('File written successfully');
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

writeInFile('week-2_js_advance/week-2-assignments/week-2-async-js/easy/output.txt', 'This is a new line of text.')