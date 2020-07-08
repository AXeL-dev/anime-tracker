let fs = require('fs');

function changeFile(file, currLine, newLine) {
  if (!fs.existsSync(file)) return;
  let data = fs.readFileSync(file, 'utf8');
  let result = data.replace(currLine, newLine);

  fs.writeFile(file, result, err => {
    if (err) console.log(err);
  });
}

// Fix postcss compile warnings
let files = [
  './node_modules/@material/toolbar/mdc-toolbar.scss',
  './node_modules/@material/toolbar/_mixins.scss'
];
let searchFileForString = 'align-items: start;';
let replaceFileWithString = 'align-items: flex-start;';

for (let file of files) {
  changeFile(file, searchFileForString, replaceFileWithString);
}

// Fix blox mdcList nonInteractive console error: this._items is undefined
let file = './node_modules/@blox/material/__ivy_ngcc__/dist/material.es5.js';
searchFileForString = 'this._items.forEach(function (item) {';
replaceFileWithString = 'this._items && this._items.forEach(function (item) {';
changeFile(file, searchFileForString, replaceFileWithString);
