const jwt = require("jsonwebtoken");

/**
 * Middleware untuk autentikasi JWT Token
 * Digunakan untuk melindungi route yang memerlukan login
 * 
 * Header format: Authorization: Bearer <token>
 */
const authenticateToken = (req, res, next) => {
    // Ambil header Authorization dari request
    const authHeader = req.headers["authorization"];

    // Extract token dari header "Bearer <token>"
    // authHeader.split(" ")[1] mengambil bagian setelah "Bearer "
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied, token required"
        });
    }

    // Verifikasi token menggunakan JWT secret
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // Jika token tidak valid atau expired
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        // Jika token valid, simpan data user ke req.user
        // Data ini bisa diakses di controller selanjutnya
        req.user = user;

        // Lanjutkan ke middleware/controller berikutnya
        next();
    });
};

module.exports = authenticateToken;
