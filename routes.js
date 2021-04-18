const args = process.argv;
const routesController = require('./src/flights/flight.controller');
const readline = require('readline');
const fs = require('fs');

if (args.length < 3) {
    console.log('Wrong parameter.');
    console.log('Usage: node routes name-of-input-file.txt');
    return;
}
const file = args[2];

if (!fs.existsSync(file)) {
    console.log(`File <${args[2]}> does not exist.`);
    return;
}

const rline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rline.question("Please enter the route (format: ORG-DST): ", async function(answer) {
    const [departure, arrival] = answer.toUpperCase().split('-');
    console.log(await routesController.showRoutes(true, file, departure, arrival));
    rline.close();
});
