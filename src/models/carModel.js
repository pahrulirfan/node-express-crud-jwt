const db = require('../config/db');

const getAllCars = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM cars');
        return rows;
    } catch (error) {
        console.error('Error in getAllCars model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const getCarById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM cars WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error in getCarById model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const createCar = async (carData) => {
    try {
        const { brand, model, year, price } = carData;
        const [result] = await db.query(
            'INSERT INTO cars (brand, model, year, price) VALUES (?, ?, ?, ?)',
            [brand, model, year, price]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error in createCar model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const updateCar = async (id, carData) => {
    try {
        const { brand, model, year, price } = carData;
        const [result] = await db.query(
            'UPDATE cars SET brand = ?, model = ?, year = ?, price = ? WHERE id = ?',
            [brand, model, year, price, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error in updateCar model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const deleteCar = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM cars WHERE id = ?', [id]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error in deleteCar model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};