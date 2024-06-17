
const con = require('../../DB/Database');

const register = (req, res) => {
  const { name, lastName, email, mobileNumber, city, password, confirmPassword } = req.body;

  console.log('R req body', req.body);

  if (!name || !lastName || !email || !mobileNumber || !city || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const insertQuery = `INSERT INTO registration (name, lastName, email, mobileNumber, city, password, confirmPassword) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;

  con.query(insertQuery, [name, lastName, email, mobileNumber, city, password, confirmPassword], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "Error inserting data" });
    }
    res.json({ message: "Data inserted successfully", data: req.body});
  });
};

module.exports = { register };
