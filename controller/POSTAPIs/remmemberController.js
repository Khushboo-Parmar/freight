const express = require('express');
const router = express.Router();
const db = require('../../DB/Database'); 



router.get('/credentials', async (req, res) => {
    const { email } = req.query;

    try {
        const query = 'SELECT email, password FROM registration WHERE email = ?';
        const result = await db.query(query, [email]); // Assuming db.query is your method to execute MySQL queries

        if (result.length > 0) {
            const { email, password } = result[0];
            res.status(200).json({ email, password });
        } else {
            res.status(404).json({ message: 'Stored credentials not found' });
        }
    } catch (error) {
        console.error('Error fetching stored credentials:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST endpoint to store credentials
router.post('/credentials', async (req, res) => {
    const { email, password } = req.body;

    try {
        // You should hash and salt the password before storing it in production
        const query = 'INSERT INTO registration (email, password) VALUES (?, ?)';
        await db.query(query, [email, password]); // Assuming db.query is your method to execute MySQL queries

        res.status(200).json({ message: 'Stored credentials successfully' });
    } catch (error) {
        console.error('Error storing credentials:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
