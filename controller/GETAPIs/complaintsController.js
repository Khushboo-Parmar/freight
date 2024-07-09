
// const con = require('../../DB/Database');

// const getUserComplaints = (req, res) => {
//   const userId = req.query.userId;
//   console.log('userId=', userId);
  
//   if (!userId) {
//     return res.status(400).json({ message: "User ID is required" });
//   }

//   const selectQuery = `SELECT * FROM complainform WHERE createdBy = ?`;

//   con.query(selectQuery, [userId], (err, results) => {
//     if (err) {
//       console.error("Error fetching complaints:", err);
//       return res.status(500).json({ message: "Error fetching complaints" });
//     }
//     res.json({ complaints: results });
//   });
// };

// module.exports = {
//   getUserComplaints,
// };

const pool = require('../../DB/Database');

const getUserComplaints = (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const selectQuery = `SELECT * FROM claim WHERE generatedBy = ?`;

    pool.query(selectQuery, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching complaints:", err);
            return res.status(500).json({ message: "Error fetching complaints" });
        }
        res.json({ complaints: results });
    });
};

module.exports = {
    getUserComplaints,
};
