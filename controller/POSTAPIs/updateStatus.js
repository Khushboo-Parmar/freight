const pool = require('../../DB/Database');
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

const submitComplain = (req, res) => {
  const { name, lastName, mobileNumber, email, productname, productdetail, complain, productWeight, deliverCharges, invoice_no, city, total_charge } = req.body;
  const documents = req.file ? req.file.filename : '';
  const insertQuery = `INSERT INTO complainform (name, lastName, mobileNumber, email, productname, productdetail, complain, productWeight, deliverCharges, invoice_no, city, total_charge, documents, status) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`;
                       pool.query(insertQuery, [name, lastName, mobileNumber, email, productname, productdetail, complain, productWeight, deliverCharges, invoice_no, city, total_charge, documents], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "Error inserting data" });
    }
    res.json({ message: "Data inserted successfully" });
  });
};

const updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const statusMapping = {
    0: 'pending',
    1: 'request sent to distributor',
    2: 'in progress',
    3: 'success'
  };

  const updateQuery = `UPDATE complainform SET status = ? WHERE id = ?`;
  pool.query(updateQuery, [statusMapping[status], id], (err, result) => {
    if (err) {
      console.error("Error updating status:", err);
      return res.status(500).json({ message: "Error updating status" });
    }
    res.json({ message: "Status updated successfully" });
  });
};

module.exports = { submitComplain, updateStatus };
