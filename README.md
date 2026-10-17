# About This Project
The objective of this project is to demonstrate the integration of Stripe Payment Element to a simple eCommerce web application. 
A successful outcome incorporates the following:
* Select a book to purchase.
* Checkout and purchase the item using Stripe Elements.
* Display a confirmation of purchase to the user with the total amount of the charge and Stripe Payment Intent ID (beginning with pi_).

### Assumptions
Working assumptions include:
* This project is a proof-of-concept (POC) to demonstrate the possibility of Stripe Payment Element integration on a eCommerce web application
* The full end-to-end experience of the checkout process will not be demonstrated in this submission (i.e. Shipping address, discounts, promotion).
* Future use cases are explored in the [Stripe Project_Joan Document](https://docs.google.com/document/d/1NKDtZG88WykOXua74mANaXGv8BU_JA0LB7Mn6zMtGsw/edit?usp=sharing)

### Approach
As this is a proof-of-concept, the objectives for the design of this project are:

* Retain as much of the existing web architecture as possible
* Configure the key sections, files, or pages for a successful integration and responses.
* Integration is done with a Stripe Sandbox
* Adapt (as much as possible) of the sample code that were documented in [Stripe's Document - Quickstart Payment Intent](https://docs.stripe.com/payments/quickstart-payment-intents)

To achieve the above outcomes:
* General configuration sequence was made from server js > frontend html > frontend js, sticking close to Stripe Document's guide
* Details on the thought process and actions taken to achieve the above objectives are documented in [Stripe Project_Joan Document](https://docs.google.com/document/d/1NKDtZG88WykOXua74mANaXGv8BU_JA0LB7Mn6zMtGsw/edit?usp=sharing)


# Installation

To get started, instructions on the ORIGINAL_README.md were followed:

#### Step 1: 
Clone Original Author's repository

```
git clone https://github.com/mattmitchell6/sa-takehome-project-node && cd sa-takehome-project-node
npm install
```

#### Step 2: 
Rename `sample.env` to `.env` and populate with your Stripe account's test API keys

#### Step 3: 
Then run the application locally

```
npm start
```

#### Step 4: 
Navigate to [http://localhost:3000](http://localhost:3000) to view the index page.


# Configuration

<details open>
<summary>
  
### Set up the Server
</summary>

#### Install the Stripe library

```
npm install --save stripe
```

#### Stripe Secret API
Added Stripe Secret API key for integration

```
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
```

#### Calculate Order

To display the order amount in the checkout page for the customer to validate the amount before continuing with payment using Stripe Element. 

Define Book Selection Library
> This code was adapted from the original switch statement in app.js
```
const calculateOrderAmount = (item) => {
  switch (item) {
    case '1':
      return 2300;
    case '2':
      return 2500;
    case '3':
      return 2800;
    default:
      return undefined;
```

Listen & Post Calculate Order Amount
> Code was adapted from Stripe Documentation
```
app.post("/calculate-order", async (req, res) => {
  try {
  const item = req.query.item;
  const amount = calculateOrderAmount(item);
    res.send({ amount, currency: "sgd" });
  } catch {
    res.status(500).send({ error: "Unable to calculate the order." });
  }
});
```

#### Create Payment Intent
Payment Intent to be created in stripe after customer submits form

Listen & Create Payment Intent
> Code was adapted from Stripe Documentation
```
app.post("/create-payment-intent", async (req, res) => {
  try {
    // Use the same server-owned order as /calculate-order.
    const item = req.query.item;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(item),
      currency: "sgd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch {
    res.status(500).send({ error: "Unable to start the payment." });
  }
});
```

#### Success Route
Defining the page to be displayed if payment is successful
> No changes were made since this came with the original repo

</details>

<details open>
<summary>
  
### Checkout Page
</summary>

#### Load Stripe.js
Stripe.js needs to be added to main.hbs to remain PCI compliant
> Added to the head section of main.hbs

```
<script src="https://js.stripe.com/endive/stripe.js"></script>
```

#### Define payment form
Added the "payment-element" id as part of the form to load Stripe Payment Element

```
 <form id='payment-form'name="payment-form">
          <div>
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="you@email.com">
          </div>
          <div class="mt-20 text-center text-secondary border-placeholder">
            <div id="payment-element">
          </div>
```

</details>



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
