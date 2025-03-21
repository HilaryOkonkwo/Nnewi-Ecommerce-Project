import mongoose from "mongoose";
const { Schema } = mongoose;


// Create a schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a schema for products
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});




const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

export { User, Product };