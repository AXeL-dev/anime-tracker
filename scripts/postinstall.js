let fs = require('fs');

function changeFile(file, currLine, newLine) {
  if (!fs.existsSync(file)) return;
  let data = fs.readFileSync(file, 'utf8');
  let result = data.replace(currLine, newLine);

  fs.writeFileSync(file, result, err => {
    if (err) console.log(err);
  });
}

// Fix postcss compile warnings
let files = [
  './node_modules/@material/toolbar/mdc-toolbar.scss',
  './node_modules/@material/toolbar/_mixins.scss',
];
let searchForString = 'align-items: start;';
let replaceWithString = 'align-items: flex-start;';

for (let file of files) {
  changeFile(file, searchForString, replaceWithString);
}

// Remove unused material icons (to reduce bundle size)
let file = './node_modules/material-icons/iconfont/material-icons.scss';
let lines = [
  "@import 'round';",
  "@import 'sharp';",
  "@import 'two-tone';",
];

for (let line of lines) {
  changeFile(file, `${line}\n`, '');
}
