const mongoose = require('mongoose')


try {
    mongoose.createConnection(
    "mongodb://localhost:3456/the_database",
    {
        "auth": {
        "authSource": "admin"
        },
        "user": "root",
        "pass": "example"
    }
    );
}
catch (e) {
console.log("e", e)
}
console.log(mongoose.coonection)
