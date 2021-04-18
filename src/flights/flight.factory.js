const fs = require('fs');

module.exports.createFlights = () => {
    const data = 
    'GRU,BRC,10' + '\n' +
    'BRC,SCL,5' + '\n' +
    'GRU,CDG,75' + '\n' +
    'GRU,SCL,20' + '\n' +
    'GRU,ORL,56' + '\n' +
    'ORL,CDG,5' + '\n' +
    'SCL,ORL,20';

    try {
        fs.writeFileSync('___tmp-test-file___.txt', data);
        return ('___tmp-test-file___.txt');
    } catch (err) {
        return err;
    }
    
}

module.exports.deleteTmlFile = (tmpFile) => {
    try {
        fs.rmSync(tmpFile);
        return 0;
    } catch (err) {
        return err;
    }
}