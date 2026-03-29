const fs = require('fs');

const filePath = './test.txt';

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const cleaned = data.replace(/\s+/g, ' ').trim();
  fs.writeFile(filePath, cleaned, 'utf-8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('File cleaned successfully!');
  });
});