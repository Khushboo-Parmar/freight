
const pool = require('../../DB/Database');

const profileUpdateController = (req, res) => {
  const { name, lastName, email, mobileNumber, city } = req.body;
  const userId = req.params.id; 
  // const userId = 56; 
  console.log('Received userId:', userId);
  console.log('Received body:', req.body);
  if (!name || !lastName || !email || !mobileNumber || !city) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const updateQuery = `UPDATE registration SET name=?, lastName=?, email=?, mobileNumber=?, city=? WHERE id=?`;

  pool.query(updateQuery, [name, lastName, email, mobileNumber, city, userId], (err, result) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ message: "Error updating profile" });
    }
    res.json({ message: "Profile updated successfully", data: req.body });
    console.log('updated profile', req.body)
  });
};

module.exports = profileUpdateController ;

// const pool = require('../../DB/Database');

// const profileUpdateController = (req, res) => {
//   const { name, lastName, email, mobileNumber, city } = req.body;
//   const userId = req.params.id; 
//   // const userId = 56; 

//   if (!name || !lastName || !email || !mobileNumber || !city) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const updateQuery = `UPDATE registration SET name=?, lastName=?, email=?, mobileNumber=?, city=? WHERE id=?`;

//   console.log('Executing SQL Query:', updateQuery);
//   console.log('With Parameters:', [name, lastName, email, mobileNumber, city, userId]);

//   pool.query(updateQuery, [name, lastName, email, mobileNumber, city, userId], (err, result) => {
//     if (err) {
//       console.error("Error updating profile:", err);
//       return res.status(500).json({ message: "Error updating profile" });
//     }
//     if (result.affectedRows === 0) {
//       console.error("No rows affected. User ID might be incorrect.");
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ message: "Profile updated successfully", data: req.body });
//     console.log('Profile updated:', req.body);
//   });
// };

// module.exports = profileUpdateController;
