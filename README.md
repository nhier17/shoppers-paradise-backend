# NAME: SHOPPERS PARADISE
https://shoppers-paradise17.onrender.com

## Project Description
A NodeJs restful API for an e-commerce web application

## Dependecies
  express
  mongoose
  jsonwebtoken
  bcryptjs
  dotenv
  cors
  

## Setup Instructions
  Express setup
  
      -import express and assign it to a variable
      -set up start port variable i.e. 3000, 5000, basically your prefered port and start function
Connect to database(mongoDB)

    -get the connection string provided from mongoDb
    -setup .env with MONGO_URI variable and assign value which is your connection string
    -import 'dotenv' and setup the package
    -import your connect database folder and invoke it in the starter
    -restart the server ctrl + c you can console log for confirmation
    
Routes and Middleware    

    -set up /Get Route basically your homepage
    -set up express.json middleware
    -setup 404 and error handler middleware
    -import 'express-async-errors' package

User Model

     -create models folder and User.js file
     -create your user schema with name, email and password all type: String
     -export your mongoose model

Authentification routes

    -create a controllers and auth.js file 
    -export (regisetr, login ,logout) functions
    -create routes folder and auth.js file for the imported functions
    -set up the routes for the functions and export router
    -import the authRouter in app.js and set it up

 Product Model

        -create products.js file and create a schema for your products
        -export Product mongoose model
        
Product Controllers

      -create products.js file in controllers folder
      -set up the functions for getting, updating and deleting product and export the functions
      -set up the products routes to handle post,get, patch and delete methods
      -export the router and set it up in app.js
      
TEST ALL THE ROUTES IN POSTMAN        



