
require('dotenv').config();
const twilio = require('twilio');
const pool = require('../../DB/Database');


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);


async function sendOTP(req, res) {
    try {
        const { code, number } = req.body;
        const otp = Math.floor(10000 + Math.random() * 90000);
        console.log(number);
        console.log(code);
        if (!number) {
            return res.status(400).json({ status: 400, message: 'Please Enter The Number' });
        }

        pool.query('INSERT INTO user (phone_no, otp) VALUES (?, ?)', [Number(number), otp], (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            client.messages.create({
                body: `Your Verification Code for Registration is ${otp}`,
                from: '+14124471922',
                to: `${code}${number}`,
            }).then((message) => {
                console.log('OTP sent:', message.sid);
                res.status(200).json({ status: 200, message: 'OTP sent successfully', otp });
            }).catch((error) => {
                console.error('Error sending SMS:', error);
                res.status(500).json({ error: 'Error sending OTP via SMS' });
            });
        });

    } catch (error) {
        console.error(`Error in sendOTP function: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = sendOTP;
