const validateCar = (req, res, next) => {
    // cek apakah req.body ada
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body is required. Please provide brand, model, year, and price"
        });
    }

    // lakukan validasi pada setiap isian
    const { brand, model, year, price } = req.body;
    if (!brand || !model || !year || !price) {
        return res.status(400).json({
            message: "Brand, model, year, and price are required"
        });
    }
    next();
};

module.exports = validateCar;
