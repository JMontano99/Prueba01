const fs = require('fs');

var methods = {
    readFileSync: function(file, encoding) {
        return fs.readFileSync(file, encoding);
    }
}

exports.data = methods;
