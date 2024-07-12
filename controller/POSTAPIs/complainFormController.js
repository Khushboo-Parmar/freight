
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

const uploadMultiple = upload.fields([
  { name: 'invoiceImage', maxCount: 1 },
  { name: 'transportR', maxCount: 1 }
]);

const generateSearchId = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const submitComplain = async (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  console.log('Received phoneNumber claim form:', phoneNumber);

  uploadMultiple(req, res, async function (err) {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ message: "Error uploading file" });
    }

    const { purchasedate, distributorName, invoiceNo, totalAmount, freightAmount, claimDetails } = req.body;
    const invoiceImage = req.files['invoiceImage'] ? req.files['invoiceImage'][0].filename : '';
    const transportR = req.files['transportR'] ? req.files['transportR'][0].filename : '';
    const searchId = generateSearchId(6);
    console.log('req body=', req.body); 

    pool.query('SELECT id FROM user WHERE phone_no = ?', [phoneNumber], (err, userResult) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ message: "Database query error", error: err });
      }
      console.log('User Result in claim :', userResult);

      if (userResult && userResult.length > 0) {
        const userId = userResult[0].id;

        const insertQuery = `INSERT INTO claim (purchasedate, distributorName, invoiceNo, totalAmount, freightAmount, invoiceImage, transportR, claimDetails, generatedBy, searchId, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`;

        pool.query(insertQuery, [purchasedate, distributorName, invoiceNo, totalAmount, freightAmount, invoiceImage, transportR, claimDetails, userId, searchId], (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
            return res.status(200).json({ message: "Error inserting data" });
          }
          res.json({ message: "Data inserted successfully", searchId: searchId });
        });
      } else {
        res.status(404).json({ message: "User not found" });;
      }
    });
  });
};

const getComplaintStatus = (req, res) => {
  const { searchId } = req.params;

  const selectQuery = `SELECT status FROM claim WHERE searchId = ?`;

  pool.query(selectQuery, [searchId], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ message: "Error fetching data" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json({ status: result[0].status });
  });
};

module.exports = { submitComplain, getComplaintStatus };