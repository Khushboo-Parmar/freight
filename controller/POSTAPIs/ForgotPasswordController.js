require('dotenv').config();
const pool = require('../../DB/Database');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');


// Function to handle forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const [user] = await pool.query('SELECT * FROM signup WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');

        await pool.query('INSERT INTO password_reset (email, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))', [email, token]);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset your password',
            text: `To reset your password, click on this link: https://freight.onrender.com/api/reset-password/${token}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending reset password email', error });
            }

            console.log('Email sent:', info.response);
            res.json({ message: 'Reset password instructions sent to your email' });
        });
    } catch (error) {
        console.error('Error in forgot password:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Function to handle reset password
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required' });
    }

    try {
        const [result] = await pool.query('SELECT * FROM password_reset WHERE token = ? AND expires_at > NOW()', [token]);

        if (result.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const email = result[0].email;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query('UPDATE signup SET password = ? WHERE email = ?', [hashedPassword, email]);
        await pool.query('DELETE FROM password_reset WHERE token = ?', [token]);

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error in reset password:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { forgotPassword, resetPassword };
