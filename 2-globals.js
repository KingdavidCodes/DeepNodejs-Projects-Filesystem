//  GLOBALS - NO WINDOWS !!

// __dirname - path to current directory
//  __filename - file name
//  require - function to use modules (commonJS)
//  module - info about current module (file)
//  process - info about env where the program is being executed

console.log(__dirname);

setInterval(() => {
    console.log("Hello world");
}, 1000);
