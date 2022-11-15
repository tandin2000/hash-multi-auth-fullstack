const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const { mongo } = require("mongoose");
const express = require("express");
const {authenticateToken} = require("./jwtHandler");
const router = express.Router();
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

let gfs;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "images",
    })
})

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: {useUnifiedTopology: true},
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: "images",
                }
                resolve(fileInfo);
            });
        });
    },
});
// Define the storage.
const store = multer({
    storage,
    limits: {fileSize: 20000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})

// Checking the file type, restrict other files from being uploaded.
function checkFileType(file, cb) {
    const filetype = /jpeg|jpg|png|gif/;
    console.log(file.originalname)
    console.log(file.mimetype)
    const extname = filetype.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetype.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb('filetype');
}

// Defining the middleware
const uploadMiddleware = (req, res, next) => {
    const upload = store.single('image');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send("File too large " + err.message);
        } else if (err) {
            if (err === 'filetype') return res.status(400).send("Image file only " + err.message);
            return res.sendStatus(500);
        }
        next();
    })
}

// Post route to handle the In coming file
router.post('/upload/', uploadMiddleware, async (req, res) => {
    authenticateToken(res, req)
    const {file} = req;
    const {id} = file;
    if (file.size > 5000000) {
        deleteImage(id);
        return res.status(400).send("file may not exceed 5MB");
    }
    console.log('uploaded file: ', file);
    return res.send(file.id);
})

// Delete images when the file are larger than 5MB
const deleteImage = id => {
    if (!id || id === 'undefine') return res.status(400).send('no image id');
    const _id = new mongoose.Type.ObjectId(id);
    gfs.delete(_id, err => {
        if (err) return res.status(500).send('Image deletion error');
    })
}

module.exports = router;