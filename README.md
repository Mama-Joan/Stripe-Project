# About This Project
This project is meant to document how Stripe Payment Element is integrated to an existing ecommerce bookstore. The objective is to get a working eCommerce application that is able to faciliate payments using Stripe Payment Element. 

# Assumptions
Assumptions

This application demonstrates the checkout and payment experience for an online bookstore, with a focus on integrating Stripe's Payment Element.

For simplicity, the checkout flow assumes that the customer is already authenticated and that relevant customer information, including their shipping address, has been collected and stored by the merchant's existing application.

Customer authentication, address management, order fulfilment and inventory management are outside the scope of this demonstration.


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

main.hbs (frontend)
Step 1: Add Form ID
Step 2: Injgect the div id="payment-element" under the add stripe payment enlement area
step 3: Added     <script src="checkout.js" defer></script> to main.hbs, to ensure that this logic loads across all pages to reference the checkout.js logic when required
Step 4: add <script src="https://js.stripe.com/endive/stripe.js"></script> the JS script to be PCI compliant to main.hbs 

Checkout.js
Step 1: Copy sample code from Stripe doc
Step 2: Update Stripe publishable API Key
Step 3: change success return url to point to success.hbs
Step 4: Check /calculate-order is referncing correctly so that stripe elements will load when user selects it.
step 5: Check /create-payment-intent to ensure it is referencing correctly to create payment intent
Step 6: Need to add id = submit in checkout.hbs, otherwise the js won't be able to load 

Troubleshooting updates:
1. JS script was in the wrong folder in checkout.hbs
2. In Checkout.js, we need to define the const item that is referencing from the url and make changes in the respond to have the parameter of the item that we have selected, otherwise the code doesn't know

complete.js
1. to grab the payment status and intent id after a payment submission
2. add the script src for complete.js to the main.hbs
3. 

success.hbs
1. added a a section to display the confirmation payment status and ID to reflect the information returned by stripe in success.hbs
2. added a function for defining the id and status to print

Remidner:
script src to be added to the bottom of each page
