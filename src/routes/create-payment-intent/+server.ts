import type { RequestHandler } from '@sveltejs/kit';
import Stripe from 'stripe';
import { json } from '@sveltejs/kit';


const stripe = new Stripe(process.env.SECRET_STRIPE_KEY as string, {
  apiVersion: '2024-04-10'
});

export const POST: RequestHandler = async ({ request }) => {
  const { amount } = await request.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });

    return json({
      clientSecret: paymentIntent.client_secret
    }, { status: 200 });
  } catch (error) {
    return json({
      error: 'Failed to create PaymentIntent'
    }, { status: 500 });
  }
};
