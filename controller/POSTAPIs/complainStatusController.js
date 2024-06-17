const con = require('../../DB/Database');

const updateComplainStatus = (req, res) => {
  const { complaintId, newStatus } = req.body;
  const allowedStatusValues = ['pending', 'request_sent', 'in_progress', 'completed'];

  if (!complaintId || !allowedStatusValues.includes(newStatus)) {
    return res.status(400).json({ message: "Invalid complaintId or newStatus" });
  }

  const updateQuery = `UPDATE complainform SET status = ? WHERE id = ?`;

  con.query(updateQuery, [newStatus, complaintId], (err, result) => {
    if (err) {
      console.error("Error updating status:", err);
      return res.status(500).json({ message: "Error updating status" });
    }
    res.json({ message: "Status updated successfully" });
  });
};

module.exports = { updateComplainStatus };
