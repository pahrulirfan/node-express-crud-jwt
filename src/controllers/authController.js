// Import dependencies
const db = require("../config/db");        // Database connection
const jwt = require("jsonwebtoken");       // JWT token generation
const bcrypt = require("bcrypt");          // Password hashing

exports.register = async (req, res) => {
    try {
        // Ambil username dan password dari request body
        const { username, password } = req.body;

        // Validasi input - pastikan username dan password ada
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        // Cek apakah username sudah ada di database
        const [existingUsers] = await db.query("SELECT id FROM users WHERE username = ?", [username]);
        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Username already exists"
            });
        }

        // Hash password dengan bcrypt (salt rounds = 10)
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insert user baru ke database
        const [result] = await db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );

        // Response sukses dengan data user yang baru dibuat
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: { id: result.insertId, username }
        });

    } catch (error) {
        // Handle error database atau server
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        // Ambil username dan password dari request body
        const { username, password } = req.body;

        // Validasi input - pastikan username dan password ada
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        // Cari user berdasarkan username
        const [results] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        const user = results[0];

        // Cek apakah user ada dan password cocok
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT token dengan payload user info
        const token = jwt.sign(
            { id: user.id, username: user.username },  // Payload
            process.env.JWT_SECRET,                    // Secret key
            { expiresIn: "1h" }                       // Token berlaku 1 jam
        );

        // Response sukses dengan token
        res.json({ success: true, token });

    } catch (error) {
        // Handle error database atau server
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
