// const pool = require('../../DB/Database');
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });
// const uploadMultiple = upload.array('shopImages', 10);
// const signUp = async (req, res) => {
//     const phoneNumber = req.params.phoneNumber;

//     console.log('Received phone number:', phoneNumber);

//     uploadMultiple(req, res, async (err) => {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).json({ message: "File upload error", error: err });
//         } else if (err) {
//             return res.status(500).json({ message: "Unknown error during file upload", error: err });
//         }

//         const { name, email, password, gstNo, address, city, district } = req.body;
//         if (!name || !email || !password || !gstNo || !address || !city || !district) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const shopImages = req.files ? req.files.map(file => path.basename(file.path)).join(',') : null;
//         if (!shopImages) {
//             return res.status(400).json({ message: "Shop images are required" });
//         }

//         try {
//            pool.query('SELECT id FROM user WHERE phone_no = ?', [phoneNumber], (err, userResult)=>{

          
//             console.log('User Result:', userResult);

//             if (userResult && userResult.length > 0) {
//                 const userId = userResult[0].id;

//                 const insertQuery = `
//                     INSERT INTO signup (userId, name, email, password, gstNo, address, city, district, shopImages)
//                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//                 `;
//               pool.query(insertQuery, [userId, name, email, password, gstNo, address, city, district, shopImages]);
//                 res.json({ message: "Data inserted successfully", data: req.body });
//             } else {
//                 return res.status(404).json({ message: "User not found" });
//             }

//         });
//         } catch (dbError) {
//             console.error("Database error:", dbError);
//             res.status(500).json({ message: "Error inserting data", error: dbError });
//         }
//     });
// };



// module.exports = { signUp };


const pool = require('../../DB/Database');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
const uploadMultiple = upload.array('shopImages', 10);

const signUp = async (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    console.log('Received phone number:', phoneNumber);

    uploadMultiple(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: "File upload error", error: err });
        } else if (err) {
            return res.status(500).json({ message: "Unknown error during file upload", error: err });
        }

        const { name, email, password, gstNo, address, city, district } = req.body;
        if (!name || !email || !password || !gstNo || !address || !city || !district) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const shopImages = req.files ? req.files.map(file => path.basename(file.path)).join(',') : null;
        if (!shopImages) {
            return res.status(400).json({ message: "Shop images are required" });
        }

        try {
            pool.query('SELECT id FROM user WHERE phone_no = ?', [phoneNumber], (err, userResult) => {
                if (err) {
                    console.error("Database query error:", err);
                    return res.status(500).json({ message: "Database query error", error: err });
                }
                console.log('User Result:', userResult);

                if (userResult && userResult.length > 0) {

                    const userId = userResult[0].id;

                    const insertQuery = `
                        INSERT INTO signup (userId, name, email, password, gstNo, address, city, district, shopImages)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `;
                    pool.query(insertQuery, [userId, name, email, password, gstNo, address, city, district, shopImages], (err, result) => {
                        if (err) {
                            console.error("Database insert error:", err);
                            return res.status(500).json({ message: "Database insert error", error: err });
                        }
                    
                        res.json({ message: "Data inserted successfully", data: req.body });
                    });
                } else {
                    return res.status(404).json({ message: "User not found" });
                }
            });
        } catch (dbError) {
            console.error("Database error:", dbError);
            res.status(500).json({ message: "Error inserting data", error: dbError });
        }
    });
};
module.exports = { signUp };



