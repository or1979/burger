var mysql = require('mysql');

var connection;
if (process.env.PORT) {
    
    connection = mysql.createConnection(process.env.PORT);
} else {
    
    connection = mysql.createConnection({
        port: 3306,
        host: "localhost",
        user: "root",
        password: "",
        database: "burger_db"
    });
}

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;