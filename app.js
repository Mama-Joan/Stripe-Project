const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
require('dotenv').config();
// Input Stripe Secret API Key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var app = express();

// view engine setup (Handlebars)
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json({}));


/**
 * Home route
 */
app.get('/', function(req, res) {
  res.render('index');
});

/**
 * Checkout route
 */
app.get('/checkout', function(req, res) {
  // Just hardcoding amounts here to avoid using a database
  const item = req.query.item;
  let title, amount, error;

  switch (item) {
    case '1':
      title = "The Art of Doing Science and Engineering"
      amount = 2300      
      break;
    case '2':
      title = "The Making of Prince of Persia: Journals 1985-1993"
      amount = 2500
      break;     
    case '3':
      title = "Working in Public: The Making and Maintenance of Open Source"
      amount = 2800  
      break;     
    default:
      // Included in layout view, feel free to assign error
      error = "No item selected"      
      break;
  }

  res.render('checkout', {
    title: title,
    amount: amount,
    error: error
  });
});

/**
 * Book Selection Reference
 */
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
  }
};

/**
 * Calculate Order Amount to reflect in the front end
 */
app.post("/calculate-order", async (req, res) => {
  try {
  const item = req.query.item;
  const amount = calculateOrderAmount(item);
    res.send({ amount, currency: "sgd" });
  } catch {
    res.status(500).send({ error: "Unable to calculate the order." });
  }
});

/**
 * Create Payment Intent
 */
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


/**
 * Success route
 */

app.get('/success', function(req, res) {
  res.render('success');
});


/**
 * Start server
 */
app.listen(3000, () => {
  console.log('Getting served on port 3000');
});