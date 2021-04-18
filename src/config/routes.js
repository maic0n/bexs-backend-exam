const fs = require('fs');
const path = require('path');

module.exports = app => {
    const list = fs.readdirSync('src/');
    for (let l of list) {
        if (l.indexOf('.') === -1) {
            const dirName = 'src/' + l;
            const file = fs.readdirSync(dirName).find(file => ((file.indexOf('.routes.js')) !== -1));
            file && require(path.resolve(dirName, file))(app);
        }
    }
};