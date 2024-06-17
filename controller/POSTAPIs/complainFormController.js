// const con = require('../../DB/Database');
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// const uploadSingle = upload.single('documents');

// const submitComplain = (req, res) => {
//   uploadSingle(req, res, function (err) {
//     if (err) {
//       console.error("Multer error:", err);
//       return res.status(500).json({ message: "Error uploading file" });
//     }

//     const { name, lastName, mobileNumber, email, productname, productdetail, complain, productWeight, deliverCharges, invoice_no, city, total_charge,createdBy } = req.body;
//     const documents = req.file ? req.file.filename : '';

//     const insertQuery = `INSERT INTO complainform (name, lastName, mobileNumber, email, productname, productdetail, complain, productWeight, deliverCharges, invoice_no, city, total_charge, documents, status, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`;

//     con.query(insertQuery, [name, lastName, mobileNumber, email, productname, productdetail, complain, productWeight, deliverCharges, invoice_no, city, total_charge, documents, createdBy], (err, result) => {
//       if (err) {
//         console.error("Error inserting data:", err);
//         return res.status(500).json({ message: "Error inserting data" });
//       }
//       res.json({ message: "Data inserted successfully" });
//     });

//   });
// };

// module.exports = { submitComplain };
const con = require('../../DB/Database');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const uploadSingle = upload.single('documents');

const generateSearchId = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const submitComplain = (req, res) => {
  uploadSingle(req, res, function (err) {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ message: "Error uploading file" });
    }

    const { name, lastName, mobileNumber, email, productname, productdetail, complain, productWeight, deliverCharges, invoice_no, city, total_charge, createdBy } = req.body;
    const documents = req.file ? req.file.filename : '';
    const searchId = generateSearchId(6); // Generating a 6-character search ID

    console.log('searchId=', searchId)

    const insertQuery = `INSERT INTO complainform (name, lastName, mobileNumber, email, productname, productdetail, complain, productWeight, deliverCharges, invoice_no, city, total_charge, documents, status, createdBy, searchId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`;

    con.query(insertQuery, [name, lastName, mobileNumber, email, productname, productdetail, complain, productWeight, deliverCharges, invoice_no, city, total_charge, documents, createdBy, searchId], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ message: "Error inserting data" });
      }
      res.json({ message: "Data inserted successfully", searchId: searchId });
    });
  });
};

const getComplaintStatus = (req, res) => {
  const { searchId } = req.params;

  const selectQuery = `SELECT status FROM complainform WHERE searchId = ?`;

  con.query(selectQuery, [searchId], (err, result) => {
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
