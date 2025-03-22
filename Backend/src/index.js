import express from 'express';
import session from 'express-session';
import path from 'path';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import router from '../models/models.js';

dotenv.config();


const app = express();
app.set('Frontend', path.join('../../Frontend'));

// const router = express.Router();


// Serve static files from the frontend folder
app.use(express.static(path.join('../../Frontend')));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: '_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// static files
app.use(express.static(path.join('../../Frontend')));

// Set up static directory for public files
console.log("Views Directory:", app.get('Frontend'));

// Use the router
app.use('/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});