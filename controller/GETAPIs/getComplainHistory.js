
// const pool = require('../../DB/Database');

// const getclaimHistory = (req, res) => {
//     const userId = req.query.userId;

//     if (!userId) {
//         return res.status(400).json({ message: "User ID is required" });
//     }

//     const selectQuery = `SELECT * FROM claim WHERE createdBy = ?`;

//     pool.query(selectQuery, [userId], (err, results) => {
//         if (err) {
//             console.error("Error fetching complaints:", err);
//             return res.status(500).json({ message: "Error fetching complaints" });
//         }
//         res.json({ complaints: results });
//     });
// };

// module.exports = {
//     getclaimHistory,
// };


const pool = require('../../DB/Database');

const getClaimHistory = (req, res) => {

    const userId = 11;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const selectQuery = `SELECT * FROM claim WHERE generatedBy = ?`;

    pool.query(selectQuery, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching claim history:", err);
            return res.status(500).json({ message: "Error fetching claim history" });
        }
        res.json({ complaints: results });
    });
};

module.exports = {
    getClaimHistory,
};
