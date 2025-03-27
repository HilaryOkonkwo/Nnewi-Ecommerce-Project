import express from 'express';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { User, Product } from '../src/config.js'; // Import your models
import { connectDB } from '../config/db.js';
import router from '../models/models.js';
import { fileURLToPath } from 'url';

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('Frontend', path.join('../../Frontend'));

// Serve static files from the frontend folder
console.log(__dirname);
app.use(express.static(path.join('../../Frontend')));

app.use(express.static(path.join(__dirname, '../../Frontend')));

console.log("Views Directory:", app.get('Frontend'));


// Middleware
// app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: '_secret_key',
    resave: false,
    saveUninitialized: true,
}));




// Set up static directory for public files

// Use the router
// app.use('/', router);


// first method || tutor
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     connectDB();
//     console.log(`Server is running on port http://localhost:${PORT}`);
// });

// second method || me

app.use('/', router)

async function startServer() {
    try {
        if (!process.env.PORT) {
            console.error('PORT environment variable is not defined.');
            process.exit(1);
        }
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit if database connection fails
    }
}

startServer();