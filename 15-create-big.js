const {writeFileSync } = require('fs');


for (let index = 0; index < 10000; index++) {
    writeFileSync(
    './content/big.txt', 
    `hello world ${index}\n`,
    {flag: 'a'}); // ! flag a is to append it to the txt
}