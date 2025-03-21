import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import router from '../models/models.js';

dotenv.config();

// Simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Defining the express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set to true if using HTTPS
}));

// Use ejs as a view engine
app.set('views', path.join(__dirname, '../views')); // Corrected path
app.set('view engine', 'ejs');

// static files
app.use(express.static('../public'));

// Set up static directory for public files

console.log("Views Directory:", app.get('views'));

// Use the router
app.use('/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});