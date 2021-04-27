const fs = require('fs');
const path = require('path');

/**
 * showRoutes by Maicon F. Santos
 * v1.01
 */
module.exports.showRoutes = async (cli = false, inputFile = 'input-file.txt', departure, arrival) => {

    const dataFile = path.join('./', inputFile);
    let data;
    try {
        data = fs.readFileSync(dataFile, 'utf8');
    } catch(err) {
        return cli ? err.message + '\n' : {success: false, message: err.message};
    }

    let routes = [];
    data.split(/\r?\n/).map((line) => {
        const route = line.split(',');
        routes.push(route);
    });

    // Get possible departures (1st flight leg)
    const matrix = routes.filter(rt => rt[0] === departure).map(row => [{[row[0]]: 0}, {[row[1]]: parseInt(row[2])}]);

    let end =   false;
    let step = 0;
    while (!end) {
        end = true;
        for (const r of matrix) {
            const from = Object.keys(r[r.length - 1]).toString();
            if  (from !== arrival) {
                const next = routes.find(v => v[0] === from);
                if (next) {
                    matrix[step].push({[next[1]]: parseInt(next[2])});
                    end = false;
                }
            }
            step ++;
        }
        step = 0;
    }
    // removes broken routes
    let newMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        if (Object.keys(matrix[i][matrix[i].length - 1]).toString() === arrival) {
            newMatrix.push(matrix[i])
        }
    }

    // searches for the lowest price
    let low = Infinity;
    let curr_sum, response;
    for (let row of newMatrix) {
        curr_sum = 0;
        for (let value of row) {
            curr_sum += parseInt(Object.values(value));
        }
        if (curr_sum < low) {
            low = curr_sum;
            response = row;
        }
    }

    let msg;
    if (response) {
        const bestRoute = response.map((n) => {
            return Object.keys(n);
        });
        msg = 'best route: ' + bestRoute.join(' - ') + ' > $' + low.toString();
    } else {
        msg = 'route not found';
    }
    return cli ? msg + '\n' : {success: true, message: msg};

}

module.exports.saveRoute = async (inputFile = 'input-file.txt', departure, arrival, price) => {

    try {
        fs.appendFileSync(path.join('./', inputFile), `\n${departure},${arrival},${price}`);
        return({success: true, message: 'Route successfully saved'});
    } catch (error) {
        return({success: false, message: 'Error saving route'});
    }

}