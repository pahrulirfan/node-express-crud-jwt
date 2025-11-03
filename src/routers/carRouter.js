const express = require('express');
const router = express.Router();

const carController = require('../controllers/carController');

const validateCar = require("../middleware/carValidate");

// tamabahkan middleware auth
const authenticateToken = require("../middleware/authMiddleware");

// GET all cars
router.get('/', authenticateToken, carController.getAllCars);

// GET car by ID
router.get('/:id', authenticateToken, carController.getCarById);

// POST create new car

router.post("/", authenticateToken, validateCar, carController.createCar);
// router.post("/", validateCar, carController.createCar);
// router.post('/', carController.createCar);

// PUT update car by ID
router.put('/:id', authenticateToken, validateCar, carController.updateCar);
// router.put('/:id', validateCar, carController.updateCar);
// router.put('/:id', carController.updateCar);

// DELETE car by ID
router.delete('/:id', authenticateToken, carController.deleteCar);
// router.delete('/:id', carController.deleteCar);

module.exports = router;