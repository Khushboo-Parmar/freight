

const pool = require('../../DB/Database');

async function verifyOTP(req, res) {
  try {
    const { otp, number } = req.body;
    console.log('otpverify otp =', otp);
    console.log('otpverify number =', number);

    if (!otp || !number) {
      return res.status(400).json({ success: false, status: 400, message: 'OTP and phone number are required' });
    }

    pool.query('SELECT otp FROM user WHERE phone_no = ?', [number], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ success: false, status: 500, message: 'Internal Server Error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ success: false, status: 404, message: 'Phone number not found' });
      }

      const storedOTP = results[0].otp;

      if (otp.toString() === storedOTP.toString()) {
        return res.status(200).json({ success: true, status: 200, message: 'OTP verification successful' });
      } else {
        return res.status(400).json({ success: false, status: 400, message: 'Invalid OTP' });
      }
    });
  } catch (error) {
    console.error(`Error in verify OTP route handler: ${error}`);
    res.status(500).json({ success: false, status: 500, message: 'Internal Server Error' });
  }
}

module.exports = verifyOTP;
