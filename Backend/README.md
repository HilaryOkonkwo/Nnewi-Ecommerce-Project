
# DemoTwo

DemoTwo is a simple web application built with Node.js, Express, and MongoDB. It allows users to sign up and log in using their credentials. The application uses EJS as the view engine and bcrypt for password hashing.

## Features

- User registration with username and password
- User login with username and password
- Password hashing using bcrypt
- MongoDB for storing user data
- EJS as the view engine

## Prerequisites

- Node.js (v22.13.1 or later)
- MongoDB Atlas account (or a local MongoDB instance)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/DemoTwo.git
    cd DemoTwo/folderOne
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:

    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.o2i0k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    ```

4. Start the application:

    ```sh
    npm start
    ```

## Usage

1. Open your web browser and navigate to `http://localhost:5000`.
2. You will see the login page. If you don't have an account, click on the "Sign Up" link to create a new account.
3. Enter your username and password to sign up.
4. After signing up, you can log in with your credentials.

## Project Structure

DemoTwo/ 
├── folderOne/ 
│ 
├── node_modules/ 
│ 
├── public/ 
│ └── style.css
│  
│ 
├── src/ 
│ │ 
│ ├── config.js  
│ └── index.js 
│ 
├── views/ 
│ │ 
│ ├── login.ejs  
│ └── signup.ejs 
│ 
├── package.json 
│ 
└── package-lock.json 
└── README.md

## Previewing and Testing

1. On your terminal, change directory to folderOne in demoTwo folder
     ```sh
    cd demoTwo/fol
    ```

2. Run the following command
     ```sh
    nodemon src/index.js
    ```

3. It will run on port 5000, please if the port is active already, you can terminate the process on the port or change the port adress eg. `5001`, `5003`, `7000`


## Dependencies

- express: ^4.17.1
- ejs: ^3.1.6
- bcryptjs: ^2.4.3
- mongoose: ^5.12.3
- nodemon: ^2.0.7 (for development)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Mongoose](https://mongoosejs.com/)