# EMMARKET
A web application for supermarkets to manage products and carts, including the ability to handle multiple carts and calculate the total amount for each order. Each cart can be added a description for more details.

---
Table Of Content
- [EMMARKET](#emmarket)
  - [Features](#features)
  - [Installation](#installation)
    - [Run](#run)
    - [Backend \& API](#backend--api)
      - [Backend Installation](#backend-installation)
      - [Backend Run](#backend-run)
  - [Usage](#usage)

---
## Features
> Product Manpluation page
>
> Muli-Cart Manpluation or POS page
> 
> Search & Filteration system
> 
> Category Manpluation page
> 
> Unit of measure Manpluation page
> 
> Dashbaord for Users
> 
> Authentication System
> 
> User Authorization 
>
> Switch Between Themes 

## Installation

The application built in node environment in react.js. To install the project you can clone it or install it as Zip file. After downloading project, You have to install the dependencies by this command:
```bash
npm i
```
### Run
```bash
npm start
```
### Backend & API 
The system are connected with backend that i build **Without the backend the system fail or even you cant use its own features**. Now lets installing and setup the backed to use the API's. Through this Link 
**[POS-BACKEND](https://github.com/AhmadEleiwa/POS-Backend)**.
The backend also built in node environment with express api. To install the backend you should follow the same steps witch we discover before.

> **NOTE:** The system database is MongoDB and the uri of the database connection is hidden in .env file. To Setup mongodb configuration correctly you have add .env file with line below
>
> MONGOPATH = "mongodb+srv://(username):ixrwZDUrxf6qcTei@cluster0.tubw4as.mongodb.net/(collection name)?retryWrites=true&w=majority"
#### Backend Installation 
```bash
npm i
```
#### Backend Run
```bash
npm start
```

## Usage
After installing and configure our app. The main page once we starting the page at localhost at port 3000 the page run this url [https::/localhost:3000](http://localhost:3000/) will shown as the figure below

<img src='assets/loginpage.png' />