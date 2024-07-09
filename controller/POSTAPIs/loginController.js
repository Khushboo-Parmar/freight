// const pool = require('../../DB/Database');
// const jwt = require('jsonwebtoken');
// const jwtKey ='eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxODcwNTg0NiwiaWF0IjoxNzE4NzA1ODQ2fQ.DB9vtI0kuHg6k-ckDdtiLKROlkNZ9EOq2qnh5G6JD1A';
// const login = (req, res) => {
//   const { email, password } = req.body;
  
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }
  
//   const selectQuery = `SELECT id, name, lastName, email, mobileNumber, city FROM registration WHERE email = ? AND password = ?`;
//   pool.query(selectQuery, [email, password], (err, result) => {
//     if (err) {
//       console.error("Error querying database:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }
    
//     if (result.length === 0) {
//       return res.status(200).json({ message: "Invalid email or password" });
//     }
//     const user = result[0];
//     const token = jwt.sign({ email: email }, jwtKey, { expiresIn: '10h' });
//     // res.status(200).json({ message: "Login successful", token: token });


//     res.status(200).json({ message: "Login successful", user, token });
//     console.log('login data=',user )
//   });
// };

// module.exports = { login };




// const pool = require('../../DB/Database');
// const jwt = require('jsonwebtoken');
// const jwtKey ='eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMDE2MTgzNCwiaWF0IjoxNzIwMTYxODM0fQ.Ddy16gIekDkIYvYWJSYTm7m6ebBj6pKWg_tKlq-zrKI';
// const login = (req, res) => {
//   const { email, password } = req.body;
  
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }
  
//   const selectQuery = `SELECT id, name, email, password, gstNo, address, city, district, shopImages FROM signup WHERE email = ? AND password = ?`;
//   pool.query(selectQuery, [email, password], (err, result) => {
//     if (err) {
//       console.error("Error querying database:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }
    
//     if (result.length === 0) {
//       return res.status(200).json({ message: "Invalid email or password" });
//     }
//     const user = result[0];
//     const token = jwt.sign({ email: email }, jwtKey, { expiresIn: '10h' });
//     // res.status(200).json({ message: "Login successful", token: token });


//     res.status(200).json({ message: "Login successful", user, token });
//     console.log('login data=',user )
//   });
// };

// module.exports = { login };

const pool = require('../../DB/Database');
const jwt = require('jsonwebtoken');
const jwtKey = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMDE2MTgzNCwiaWF0IjoxNzIwMTYxODM0fQ.Ddy16gIekDkIYvYWJSYTm7m6ebBj6pKWg_tKlq-zrKI';

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const selectQuery = `SELECT id, name, email, password, gstNo, address, city, district, shopImages, userId FROM signup WHERE email = ? AND password = ?`;
  pool.query(selectQuery, [email, password], (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // const user = result[0];

const user = {
  ...result[0],
  shopImages: result[0].shopImages.toString('base64')
};

    const token = jwt.sign({ email: email }, jwtKey, { expiresIn: '10h' });
    res.status(200).json({ message: "Login successful", user, token });
    console.log('Login successful:', user);
  });
};

module.exports = { login };
