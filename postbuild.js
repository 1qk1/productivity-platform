const fs = require("fs");

// take webclient/build folder
// and move it to backend/client
// used this instead of a normal terminal command
// to not throw an error in different OSes
fs.renameSync("webclient/build", "backend/webclient");
