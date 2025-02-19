# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



Note:

1. Create a user profile page.
2. Make the admin dashboard for editing.
3. Create and design a cart page.
4. Design the pages for the other nav items.



How Paystack Redirects the User After Payment
When a user makes a payment on Paystack, Paystack provides a callback URL where the user is redirected after payment. The callback URL will contain a payment reference as a URL parameter.

1. How the Redirect Works
Step 1: Initialize Payment in Backend (process-payment.js)
When you send a request to Paystack’s /transaction/initialize endpoint, you must include a callback_url. This is the URL where Paystack will redirect the user after payment.

Example request:

javascript
Copy
Edit
const response = await fetch("https://api.paystack.co/transaction/initialize", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    amount, // Amount in kobo (e.g., 5000 kobo = 50 NGN)
    currency: "NGN",
    callback_url: "https://yourwebsite.com/order-confirmation",
  }),
});
Paystack will return an authorization URL where the user must go to make the payment.
The frontend redirects the user to this URL.
Step 2: User Makes Payment on Paystack
The user enters their card details and completes the payment.
If the payment is successful, Paystack redirects them to the callback_url with a payment reference in the URL.
If the payment fails, they will also be redirected, but the verification step will determine the payment status.
2. What Happens After Redirect?
When Paystack redirects the user, they arrive at your confirmation page with a URL like this:

arduino
Copy
Edit
https://yourwebsite.com/order-confirmation?reference=ABC123XYZ
The reference parameter (ABC123XYZ) is Paystack's unique transaction ID for that payment.
Your frontend extracts this reference and sends it to the backend to verify the payment.
3. How the Frontend Extracts the Reference
Inside your OrderConfirmation.js component:

javascript
Copy
Edit
const [searchParams] = useSearchParams();
const reference = searchParams.get("reference"); // Get reference from URL
This code extracts the reference value from the URL.
4. Payment Verification Using Paystack API
Once the frontend extracts the reference, it sends a request to the backend to verify the payment.

The backend calls Paystack’s /transaction/verify/:reference API:

javascript
Copy
Edit
const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});
If the API response contains { status: "success" }, the payment is confirmed.
If not, the payment failed or is still pending.
5. Handling Payment Verification Results
✅ If Payment is Successful
Show a success message:
json
Copy
Edit
{ "success": true, "message": "Payment verified successfully" }
Update the UI to show "Payment Successful!"
Save order details to a database.
❌ If Payment Failed
Show an error message:
json
Copy
Edit
{ "success": false, "message": "Payment verification failed" }
Ask the user to retry payment.
6. Summary of the Payment Flow
Frontend sends payment details to /api/process-payment.
Backend initializes payment and provides a Paystack payment link.
Frontend redirects the user to Paystack to make the payment.
User completes payment, and Paystack redirects them to /order-confirmation?reference=PAYMENT_REF.
Frontend extracts the reference from the URL and sends it to /api/verify-payment.
Backend verifies payment with Paystack API.
If payment is successful, show confirmation and process the order.
If payment fails, show an error and allow retrying.
