const carModel = require('../models/carModel');

const getAllCars = async (req, res) => {
    try {
        const cars = await carModel.getAllCars();
        res.json({
            success: true,
            data: cars
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting cars',
            error: error.message
        });
    }
};

const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await carModel.getCarById(id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: 'Car not found'
            });
        }

        res.json({
            success: true,
            data: car
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting car',
            error: error.message
        });
    }
};

const createCar = async (req, res) => {
    try {
        const { brand, model, year, price } = req.body;

        // Simple validation
        // if (!brand || !model || !year || !price) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Brand, model, year, and price are required'
        //     });
        // }

        const carId = await carModel.createCar({ brand, model, year, price });

        res.status(201).json({
            success: true,
            message: 'Car created successfully',
            data: { id: carId, brand, model, year, price }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating car',
            error: error.message
        });
    }
};

const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { brand, model, year, price } = req.body;

        // Simple validation
        // if (!brand || !model || !year || !price) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Brand, model, year, and price are required'
        //     });
        // }

        const affectedRows = await carModel.updateCar(id, { brand, model, year, price });

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Car not found'
            });
        }

        res.json({
            success: true,
            message: 'Car updated successfully',
            data: { id, brand, model, year, price }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating car',
            error: error.message
        });
    }
};

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await carModel.deleteCar(id);

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Car not found'
            });
        }

        res.json({
            success: true,
            message: 'Car deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting car',
            error: error.message
        });
    }
};

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};