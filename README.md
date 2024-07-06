## Digital Art Gallery - A Web App for Buying and Selling Digital Art

This repository contains the source code for a web application called "Digital Art Gallery," a platform for artists and art enthusiasts to buy and sell digital artwork.

### Project Overview

This project aims to create a user-friendly online marketplace for digital art. Here's what it offers:

* **Artists:** Upload and showcase their digital artwork in various formats (JPG, PNG, etc.).
* **Buyers:** Browse a curated collection of digital art, filter by genre, artist, or price.
* **Purchase System:** Securely purchase artwork using integrated payment gateways.
* **User Management:** Artists and buyers can create accounts to manage their profiles and transactions.

### Technologies Used

* Frontend:  HTML, CSS, Javascript, and Bootstrap Framework
* Backend:  Node.js, Express.js
* Database:  MongoDB
* Payment Gateway: Integration with a secure payment processing service PayPal

### Installation and Setup

1. **Prerequisites:**
    * Node.js and npm
    * A database management system

2. **Clone the Repository:**
    ```bash
    git clone https://github.com/abhiramdvs/Digital-Art-Gallery.git
    ```

3. **Install Dependencies:**
    * Navigate to the project directory:
        ```bash
        cd Digital-Art-Gallery
        ```
    * Install frontend dependencies:
        ```bash
        npm install
        ```

4. **Database Configuration:**
    * Update the configuration files (e.g., mongoDB.js) with your database credentials.

5. **Run the Application:**
       ```bash
        nodemon src/index.js
        ```

### Usage

1. **Access the Application:**
    * Open your web browser and navigate to `http://localhost:3000`

2. **User Accounts:**
    * Users can create accounts as artists or buyers to access full functionalities.

3. **Artists:**
    * Upload digital artwork with descriptions, titles, and pricing.
    * Manage their artwork listings and sales history.

4. **Buyers:**
    * Browse the art gallery by category, artist, or price range.
    * View detailed information about each artwork.
    * Securely purchase artwork using the integrated payment gateway.


### License

This project is licensed under the MIT License. See the `LICENSE` file for details.

### Disclaimer

This is a basic outline. The specific implementation details will vary depending on your chosen technologies and functionalities. 
