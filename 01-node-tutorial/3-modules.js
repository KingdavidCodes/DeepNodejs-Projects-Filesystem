// modules
// commonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

const names = require('./4-name');
const sayHi = require('./5-utils');
const data = require('./6-alternative');
require('./7-mind-grenade');

sayHi('susan')
sayHi(names.john);
sayHi(names.peter);