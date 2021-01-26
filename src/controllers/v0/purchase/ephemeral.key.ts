import Stripe from 'stripe';

import { Router, Request, Response } from 'express';

const router: Router = Router();

router.post('/ephemeral_keys',async(req: Request, res: Response)=>  {
    const stripe = new Stripe('sk_test_...', {
        apiVersion: '2020-08-27',
      });
    let key = await stripe.ephemeralKeys.create(
        {customer: '{{CUSTOMER_ID}}'},
        {stripe_version: '{{API_VERSION}}'}
      );
      res.json(key);
   

});

