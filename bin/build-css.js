const sass = require('node-sass');
const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'assets/scss/theme.scss';
const OUTPUT_FILE = 'assets/built/theme.css';

const inputPath = path.join(__dirname, '../', INPUT_FILE);
const outputPath = path.join(__dirname, '../', OUTPUT_FILE);

sass.render({
  file: inputPath,
}, (err, result) => {
  if (err) {
    console.error('Error!', err);
    return;
  }
  
  fs.writeFileSync(outputPath, result.css);

  console.log('Built', outputPath);
});