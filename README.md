---
Table Of Content
- [EMMARKET](#emmarket)
  - [Features](#features)
  - [Installation](#installation)
    - [Run](#run)
    - [Backend \& API](#backend--api)
  - [Usage](#usage)
    - [POS Page (home page)](#pos-page-home-page)
    - [Products Filteration and Searching](#products-filteration-and-searching)
    - [Change the display way](#change-the-display-way)
      - [Display as Cards](#display-as-cards)
      - [Display as List](#display-as-list)
    - [Carts \& Filterations \& Sorting](#carts--filterations--sorting)
    - [Single Cart Manpluation](#single-cart-manpluation)
    - [Category Page](#category-page)
    - [Unit of Measure Page](#unit-of-measure-page)
    - [Product Page](#product-page)
    - [Dashboard Page](#dashboard-page)
  - [Configuration](#configuration)

---

# EMMARKET
The web application is specifically designed for supermarkets to effectively manage their products and customer carts. It offers a range of features tailored to streamline supermarket operations. Key functionalities of the application include:

1. Product Management: The application allows supermarkets to easily manage their product .inventory, including adding new products, updating product details, and removing products when necessary.

2. Cart Management: Supermarkets can handle multiple customer carts concurrently, enabling efficient management of checkout processes for multiple customers at the same time.

3. Total Amount Calculation: The application provides the ability to calculate the total amount for each customer's cart, considering factors such as product prices, quantities, and any applicable discounts or taxes.

4. Cart Descriptions: Supermarkets can add descriptions to each cart, allowing cashiers or customers to provide additional details or notes for better organization and reference.

By utilizing this web application, supermarkets can streamline their product and cart management processes, enhance customer service, and ensure accurate calculation of order totals for a seamless shopping experience.

## Features
> Product Management
>
> Multi-Cart Management
> 
> Search & Filteration system
> 
> Category Manpluation page
> 
> Unit of measure Management
> 
> Dashbaord for Users
> 
> Authentication System
> 
> User Authorization 
>
> Switch Between Themes 

## Installation

The application is developed using the Node environment with React.js. To install the project, you have two options: cloning the repository or downloading it as a ZIP file.

Cloning the repository:

Open your terminal or command prompt.
Run the following command:
```bash
git clone [repository_url]
```
1. Navigate to the project directory:
```bash
cd [project_directory]
```
2. Install the project dependencies by running:
```bash
npm install
``` 

Downloading as a ZIP file:

1. Download the ZIP file from the repository.
2. Extract the contents of the ZIP file to a desired location on your computer.
3. Open your terminal or command prompt.
4. Navigate to the extracted project directory:
cd [project_directory]
```bash
cd [project_directory]
```
2. Install the project dependencies by running:
```bash
npm install
``` 
After completing the installation process, you can proceed with running and using the application

### Run

```bash
npm start
``` 
### Backend & API 
The system is tightly integrated with a backend that I have built. Without the backend, the system will not function properly, and its features will not be accessible. To install and set up the backend, please follow these steps:

1. Access the POS-BACKEND repository through this link: [POS-BACKEND](https://github.com/AhmadEleiwa/POS-Backend).
2. Clone the repository or download it as a ZIP file.
3. Open your terminal or command prompt.
4. Navigate to the backend directory.
5. Install the necessary dependencies by running the command:
```bash
npm install
```
1. Configure the backend by setting up the required environment variables, database connections, and any other necessary configurations.
2. Run the backend server using the command:
```bash
npm start
```
The backend will now be up and running, providing the APIs required for the system's functionality.

> **NOTE:** The system database is MongoDB and the uri of the database connection is hidden in .env file. To Setup mongodb configuration correctly you have add .env file with line below
>
> MONGOPATH = "mongodb+srv://(username):ixrwZDUrxf6qcTei@cluster0.tubw4as.mongodb.net/(collection name)?retryWrites=true&w=majority"

## Usage
After installing and configure our app. The main page once we starting the page at localhost at port 3000 the page run this url [https::/localhost:3000](http://localhost:3000/) will shown as the figure below

<img src='assets/loginpage.png' />

Noway to navigate to any page without login to the page.There's no users yet. excpt only the admin. 
> Note: That once you configure MongoDB the system will not create the admin user. you have to Create one manually.
```ts
interface User{
    username:string;
    password:string;
    admin:boolean;
}
```
### POS Page (home page)
<img src='assets/pospage.png' />
A page for the cashier to manage customer's carts. This includes the ability to create and manage multiple carts and add descriptions to them for additional information. This page can handle these functionlites:

### Products Filteration and Searching 
The search bar and select inputs are utilized to apply filters to the list of products. You can enter search terms in the search bar to find specific products based on their names or other relevant information. The select inputs allow you to choose specific criteria for filtering the products, such as category or unit of measure. By selecting the desired options, you can refine the list and view only the products that meet the specified filter criteria.

<img src='assets/filterproducts.png' />

### Change the display way
Also You can change the display way of products list from Cards to list as shown


#### Display as Cards
<img src='assets/cardshow.png' />

#### Display as List
<img src='assets/listshow.png' />


### Carts & Filterations & Sorting
By clicking on the headers of the tables, you can sort the entire list based on the selected column. The sorting will be applied to organize the data in ascending or descending order. Additionally, you can utilize the search functionality to quickly find specific carts based on their descriptions. Enter relevant keywords in the search field to filter the list and narrow down the results.

<img src='assets/carttabel.png' width='100%' />

### Single Cart Manpluation
After selecting a cart from the list, you will be directed to the following view. In this view, you have the option to modify the description or quantity of individual products within the cart. You can also delete products from the list or add new products by selecting from the available product list. Additionally, each cart has taxes and discounts associated with it. Similar to the cart table, you can apply sorting and filtering options to refine the displayed data.
```ts
interface Cart {
  cartId: string;
  description: string;
  tax: number;
  discount: number;
  products: Product[];
}
```

<img src='assets/singelcart.png' />

### Category Page

The Category page is designed to provide users with the ability to manage categories effectively. It offers a range of functionalities, including adding, editing, and deleting categories.

### Unit of Measure Page
The Unit of Measure page is designed to provide users with the ability to manage Unit of Measures effectively. It offers a range of functionalities, including adding, editing, and deleting Unit of Measure.

### Product Page
The Product page is a versatile tool that puts users in control of managing their products effectively. With this page, users have the ability to add new products, make changes to product categories, and modify the unit of measure for each product. Additionally, the page offers powerful filtering and searching capabilities to help users navigate through their product inventory effortlessly.

### Dashboard Page
The Dashboard is a central hub provided to all users, offering essential functionalities for efficient navigation and personalization. With the Dashboard, users gain access to valuable features such as viewing checked carts and switching themes. Additionally, the administrative role holds exclusive privileges to add or delete users.

## Configuration
In this application, the primary configuration option available is related to theming. All users within the system have the ability to customize the color theme according to their preferences. This can be done by navigating to the dashboard and accessing the theme settings.

The application offers four pre-defined themes for users to choose from:

Dark Theme: This theme provides a visually appealing and modern dark color scheme, which is ideal for users who prefer a sleek and immersive interface.

White Theme: The white theme offers a clean and minimalist look, utilizing light colors to create a bright and refreshing user experience.

Material Theme: Inspired by the Material Design principles, this theme incorporates vibrant colors and subtle shadows to provide a visually rich and interactive interface.

Green Theme: The green theme embraces a color palette centered around shades of green, delivering a nature-inspired and visually calming experience.

Users can select their desired theme from the available options within the dashboard, enabling them to personalize the application's appearance to match their preferences. This flexibility in theming enhances the overall user experience, making the application more engaging and enjoyable to use.