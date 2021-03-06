const pool = require("./ConnectionPool");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const checkUser = (email, cb) => {
  pool.getConnection(function(err, con) {
    if (err) console.log("CheckUser connection err", err);
    console.log("dddd", email);
    con.query(`SELECT * FROM users Where email= ("${email}")`, function(
      err,
      results
    ) {
      if (err) console.log("CheckUser query error", err);
      //results is the returned array of objects
      cb(results);
      con.release();
    });
  });
};

const addUser = (name, email, password, cb) => {
  hashPassword(password, function(err, hashedPassword) {
    if (err) console.log("HashPassword Error", err);
    pool.getConnection(function(err, con) {
      if (err) console.log("connection err", err);
      console.log("Connected!");
      var sql = `INSERT INTO users (name, password,email) VALUES ("${name}","${hashedPassword}","${email}")`;
      con.query(sql, function(err, result) {
        if (err) console.log("query error", err);
        console.log("1 record inserted");
        cb(err, result);
        con.release(); //releasing the connection back to the pool
      });
    });
  });
};
//generating hash password using bcrypt
const hashPassword = function(password, cb) {
  bcrypt.hash(password, SALT_WORK_FACTOR, function(err, hash) {
    if (err) return cb(err, null);
    cb(null, hash);
  });
};
//checking login password with database
const checkPassword = (email, password, cb) => {
  pool.getConnection(function(err, con) {
    if (err) console.log("CheckUser connection err", err);
    con.query(`SELECT * FROM users Where email = "${email}"`, function(
      err,
      results
    ) {
      if (err) console.log("CheckUser query error", err);
      //results is the returned array of objects
      if (results.length > 0) {
        console.log("sds", results);
        bcrypt.compare(password, results[0].password, function(err, isMatch) {
          if (err) return cb(null, err);
          cb(isMatch, err);
        });
      } else {
        cb(false, null);
      }
      con.release();
    });
  });
};
module.exports.checkUser = checkUser;
module.exports.checkPassword = checkPassword;
module.exports.addUser = addUser;
