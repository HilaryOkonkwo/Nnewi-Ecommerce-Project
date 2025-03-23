import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import { User, Product } from '../src/config.js'; // Import your models

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("__dirname:", __dirname)

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/index.html'));
});

// Add login route
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/login.html'));
});

// Add signup route
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/signup.html'));
});

// Add cart route
router.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    res.json({ cart });
});

// Seller page route
router.get('/seller', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

////////////////////////////////////////////////////////////////

// router.post("/signup", async (req, res) => {
//     const data = {
//         firstname: req.body.firstName,
//         lastname: req.body.lastName,
//         email: req.body.email,
//         phone: req.body.phone,
//         password: req.body.password
//     };

//     // checking if user exists
//     const existingUser = await User.findOne({ email: data.email });

//     if (existingUser) {
//         return res.status(400).json({ message: "User with this email already exists. Choose a different email." });
//     } else {
//         // hash the password using bcrypt
//         const saltRounds = 10;
//         const hashPassword = await bcrypt.hash(data.password, saltRounds);

//         data.password = hashPassword;

//         const userdata = await User.create(data);
//         console.log(userdata);
//         return res.status(201).json({ message: "User registered successfully" });
//     }
// });
////////////////////////////////////////////////////////

//Refactoring the signup route
router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        if (!phone) {
            return res.status(400).json({ message: "Phone number is required." });
        }


        //  Checking if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists. Choose a different email." });
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully." })
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Signup Failed.", error: error.message })
    }
})

////////////////////////////////////////////////

// login user
router.post('/login', async (req, res) => {
    try {
        const check = await User.findOne({
            $or: [
                { email: req.body.email },
                { phone: req.body.phone }
            ]
        });

        if (!check) {
            return res.status(400).json({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(req.body.password, check.password);

        if (validPassword) {
            req.session.user = check;
            return res.json({ message: "Logged in successfully" });
        } else {
            return res.status(400).send({ message: "Invalid password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Add to Cart route
router.post('/add-to-cart', (req, res) => {
    const productId = req.body.productId;
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push({ id: productId, name: productName, price: productPrice });
    res.send({ message: 'Product added to cart' });
});

// Add product route
router.post('/add-product', async (req, res) => {
    const { name, price, amount } = req.body;
    const product = new Product({ name, price, amount });
    await product.save();
    res.send({ message: 'Product added successfully' });
});

// Delete product route
router.post('/delete-product', async (req, res) => {
    const { productId } = req.body;
    await Product.findByIdAndDelete(productId);
    res.send({ message: 'Product deleted successfully' });
});

export default router;