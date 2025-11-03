// ambil plugin dotenv
require('dotenv').config();
const express = require('express');
const app = express();
// gunakan port dari file .env atau 5000
const PORT = process.env.PORT || 5000;

// agar bisa menerima request body (harus di awal sebelum routes)
app.use(express.json());

const log = require("./middleware/log");
app.use(log);

app.get('/', (req, res) => {
    res.send('Express JS CRUD MySQL');
});

app.get('/link-lain', (req, res) => {
    res.send('endpoint ke halaman lain');
});

// contoh endpoint POST dengan request body
app.post('/tambah_barang', (req, res) => {
    const namaBarang = req.body.nama_barang
    console.log("Menambahkan Barang: " + namaBarang)
    res.json("Berhasil menambahkan Barang: " + namaBarang)
})

const carRouter = require('./routers/carRouter');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

app.use('/cars', carRouter);

const authRouter = require('./routers/authRouter');
app.use('/auth', authRouter);

// Error handling middleware (taruh di akhir, setelah semua routes ditulis)
app.use(notFoundHandler); // 404 handler
app.use(errorHandler);    // 500 handler

app.listen(PORT, () => {
    console.log(`App port http://localhost:${PORT}`);
});