// const pool = require('../../DB/Database');

// const getClaimHistory = (req, res) => {
//     const userId = req.params.userId;

// console.log('userId in getClaimHistory', userId)
//     if (!userId) {
//         return res.status(400).json({ message: "User ID is required" });
//     }

//     const selectQuery = `SELECT * FROM claim WHERE generatedBy = ?`;

//     pool.query(selectQuery, [userId], (err, results) => {
//         if (err) {
//             console.error("Error fetching claim history:", err);
//             return res.status(500).json({ message: "Error fetching claim history" });
//         }
      
//         // res.json({ claimHistory: results });
//         res.json({ complaints: results });
//         console.log(results)
//     });
// };

// module.exports = {
//     getClaimHistory,
// };
const pool = require('../../DB/Database');

const getClaimHistory = (req, res) => {
    const userId = req.params.userId;
    console.log('userId in getClaimHistory:', userId);

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
        console.log('Fetched results:', results);
    });
};

module.exports = {
    getClaimHistory,
};
