const mysql=require('mysql');

module.exports = function () {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "nodemysql"
    });
    
    const sqldb = db.connect(function (err) {
        if (err) {
            throw err;
        }
        console.log("Mysql Connected!");
    });
    return db;
};