const sql = require("../db/connection");

exports.addUser = (username, pass) => {
    try {
        // const user = {
        //     username: username,
        //     pass: password
        // }
        const user = [pass, username];
        // sql.query("INSERT INTO users SET ?", user) // INSERT INTO users SET username = "", pass = ""; //
        // if password is in a table //
        sql.query("INSERT INTO users SET username = ?", username);
        sql.query("INSERT INTO passwords SET pass = ?, userID = (SELECT id FROM users WHERE username = ?)", user);
    } catch (error) {
        console.log(error);
    }
};

exports.addMovie = (title, actor, category, user) => {
    try {
        const movie = [title, actor, category, user];
        sql.query("INSERT INTO movies SET title = ? , actor = ?, watched = 'false', rating = 0, category = ?, userID = (SELECT id FROM users WHERE username = ?)", movie);
    } catch (error) {
        console.log(error);
        
    }
};

exports.updateMovie = (watched, rating,title, user, pass) => {
    try {
        const update = [watched, rating, title, user, pass];
        sql.query("UPDATE movies SET watched = ?, rating = ? WHERE title = ? AND userID = (SELECT id FROM users INNER JOIN passwords ON users.id = passwords.userID WHERE users.username = ? AND passwords.pass = ?)", update)
    } catch (error) {
        console.log(error);
    }
};

exports.deleteMovie = (title, user, pass) => {
    try {
        const remove = [title, user, pass];
        sql.query("DELETE FROM movies WHERE title = ? AND userID = (SELECT id FROM users INNER JOIN passwords ON users.id = passwords.userID WHERE users.username = ? AND passwords.pass = ?)", remove);
    } catch (error) {
        console.log(error);
    }
};

exports.moviesList = () => {
    try {
        const list = ["Matty"]
        sql.query("SELECT count(*) AS movieList FROM movies WHERE userID = (SELECT id FROM users WHERE username = ?);", list, 
        (err, results, fields) => {
            
           Object.keys(results).forEach((key) => {
               let row = results[key];
               console.log(`${list[0]} has added ${row.movieList} movies`);
           })
        });
        
    } catch (error) {
        console.log(error);
        
    }
};