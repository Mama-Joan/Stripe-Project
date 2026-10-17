// Stripe.js instance
const stripe = Stripe("pk_test_51UPk2DIGGq3bzbrKaAed8thmRFGxkeUFtJ0Ik3koh4nTki1NStxj4IYNJA55TtqO4sqfKuFYFcCY4XrIUoZ1ikGo00IWad4iyH");
console.log("complete.js is running!");
checkStatus();

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    setErrorState();
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  setPaymentDetails(paymentIntent);
}

// Print the payment details on the success page
 function setPaymentDetails(paymentIntent) {
  document.querySelector("#payment-id").textContent = paymentIntent.id;
  document.querySelector("#payment-status").textContent = paymentIntent.status;
}
