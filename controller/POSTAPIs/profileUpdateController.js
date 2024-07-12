// const pool = require('../../DB/Database');

// const profileUpdateController = (req, res) => {
//     const { name, email, city, district } = req.body;
//     const userId = req.params.userId;

//     console.log('Received userId:', userId);
//     console.log('Received body:', req.body);

//     // Check for required fields
//     if (!name || !email || !city || !district) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     const updateQuery = 'UPDATE signup SET name=?, email=?, city=?, district=? WHERE userId=?';
//     pool.query(updateQuery, [name, email, city, district, userId], (err, result) => {
//         if (err) {
//             console.error("Error updating profile:", err);
//             return res.status(500).json({ message: "Error updating profile" });
//         }
//         res.json({ message: "Profile updated successfully", data: req.body });
//         console.log('Updated profile:', req.body);
//     });
// };

// module.exports = profileUpdateController;

const pool = require('../../DB/Database');

const profileUpdateController = (req, res) => {
    const { name, email, city, district } = req.body;
    const userId = req.params.userId;

    console.log('Received userId:', userId);
    console.log('Received body:', req.body);

    // Check for required fields
    if (!name || !email || !city || !district) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const updateQuery = 'UPDATE signup SET name=?, email=?, city=?, district=? WHERE userId=?';

    pool.query(updateQuery, [name, email, city, district, userId], (err, result) => {
        if (err) {
            console.error("Error updating profile:", err);
            return res.status(500).json({ message: "Error updating profile" });
        }
        
        // Check if the update was successful
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }

        console.log('Update result:', result);
        res.json({ message: "Profile updated successfully", data: req.body });
        console.log('Updated profile:', req.body);
    });
};

module.exports = profileUpdateController;
