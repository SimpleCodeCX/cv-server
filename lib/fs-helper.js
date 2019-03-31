const fs = require('fs');
const path = require('path');
function mkdirp(dir) {
  const parent_dir = path.dirname(dir);
  if (!fs.existsSync(parent_dir)) {
    mkdirp(parent_dir);
  }
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

exports.mkdirp = mkdirp;