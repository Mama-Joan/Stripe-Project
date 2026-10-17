# About This Project
This project is meant to document how Stripe Payment Element is integrated to an existing ecommerce bookstore. The objective is to get a working eCommerce application that is able to faciliate payments using Stripe Payment Element. 

# Initial Setup
This project kept the fundamental architecture of the eCommerce application and followed the Original_Readme.md instructions to install dependancies and add the required Stripe's Publishable and Secret API Keys. 

# Audit
To determine the files and sections that will require configurations, run through the existing repository to understand how the different areas of this eCommerce web application is connected with each other. 

Frontend:
- /views/layouts: pubclic facing front-end html templates that customers see when visiting the website 
    /layout/main.hbs: The main definition for headers of the templates are; the rest of the pages in checkout, index, and success would adopt the headers from main.hbs
- /public/js: where the client that power the functionalities of the browser reside

Backend:
- app.js: backend server that manages the overall functionalities and how this application interact with the Stripe Dashboaard.

How the Frontend and Backend Files are connected:

The main.hbs runs the functions defined in the js files here:
<script type="text/javascript" src="/js/custom.js"></script>

The app.js file right now only has "Get" functions from the browser; In the current setup, the definitions determine which layout app.js should return to display in the browser. There are no post commands to create a payment intent with Stripe or to return any information from Stripe just yet. 

Potential Congurations that I ned to make:
app.js 
- Need to be 

# Configuration
app.js (Backend Server)
//Step 1: Install Stripe Library
Following the instructions: https://docs.stripe.com/payments/quickstart-payment-intents 
Run npm install --save stripe to install Stripe Library

//Step 2: Configure Stripe Secret API Key
Add (process.env.STRIPE_SECRET_KEY) to const stripe = require('stripe')
 Included Calculated order amount in server side to avoid tampering with the amount on client side
 /// Calculate Order: Add Calculate the order to send to front end, the reference the above sentence
///Create payment intent: THen then create payemnt intent once the customer pays 