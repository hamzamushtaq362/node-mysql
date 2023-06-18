const express = require('express');
const mysql=require('mysql');
const mysqlfunc = require('./api/helper/db-connect-sql');

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "nodemysql"
// });

// db.connect(function (err) {
//     if (err) {
//         throw err;
//     }
//     console.log("Mysql Connected!");
// });

var db = mysqlfunc()

const app = express();
const port = 3000;

app.get('/createdb', (req, res) => { 
    let sql = 'CREATE DATABASE nodemysql'; 
    db.query(sql, (err, result) => { 
        if(err) throw err; 
        console.log(result); 
        res.send('Database created...'); 
    }); 
});

app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts (id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id) )';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
}); 

app.get('/addpost1', (req, res) => { 
    let post = {title : 'Post One', body : 'This is post number one'}; 
    let sql = 'INSERT INTO posts SET ?'; 
    let query = db.query(sql, post, (err, result) => { 
        if(err) throw err; 
        console.log(result); 
        res.send('Posts table Insert...'); 
    }); 
});

app.get('/getposts', (req, res) => { 
    let sql = 'SELECT * FROM posts'; 
    let query = db.query(sql, (err, results) => { 
        if(err) throw err; 
        console.log(results); 
        res.send('Posts fetched...'); 
    }); 
});

app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts fetched...');
    });
}); 

app.get('/updatepost/:id', (req, res) => { 
    let newTitle = 'Updated Title'; 
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`; 
    let query = db.query(sql, (err, result) => { 
        if(err) throw err; 
        console.log(result); 
        res.send('Post updated...'); 
    }); 
});

app.get('/deletepost/:id', (req, res) => { 
    let newTitle = 'Updated Title'; 
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`; 
    let query = db.query(sql, (err, result) => { 
        if(err) throw err; 
        console.log(result); 
        res.send('Post deleted...'); 
    }); 
});

app.get('/',(req,res)=>{
    return res.status(200).json({
        message:'I am working'
    })
});

app.listen(port,()=>{
    console.log('working------')
})