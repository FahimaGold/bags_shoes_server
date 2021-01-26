
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { Router, Request, Response } from 'express';

const router: Router = Router();

router.post('/create-payment-intent',async(req: Request, res: Response)=>  {
    // See keys here: https://dashboard.stripe.com/account/apikeys
    
    const publishedKey = process.env.STRIPE_PUBLISHABLE_KEY;

    const { currency, amount, ids } = req.body;
    console.log("ITEMS ======> " + ids);
   // Create a PaymentIntent with the order amount, the products ids, and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency
});

// Send publishable key and PaymentIntent details to client
res.send({
  publishableKey: publishedKey,
  clientSecret: paymentIntent.client_secret
});

   

});

export const PaymentIntentRouter: Router = router;
