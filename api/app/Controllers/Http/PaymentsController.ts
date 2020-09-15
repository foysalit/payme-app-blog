import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Env from '@ioc:Adonis/Core/Env'
import Payment from "App/Models/Payment";
import Stripe from 'stripe';

const stripeSecretKey = `${Env.get('STRIPE_SECRET_KEY')}`;
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2020-08-27'
});

export default class PaymentsController {
  public async charge ({ request, auth }: HttpContextContract) {
    const payment = new Payment();
    payment.tokenId = request.input('tokenId');
    payment.product = request.input('product');
    payment.price = request.input('price');

    const { id } = await stripe.charges.create({
      amount: payment.price * 100,
      description: payment.product,
      source: payment.tokenId,
      currency: 'usd',
    });
    payment.chargeId = id;

    await auth.user?.related('payments').save(payment);
    return payment;
  }
  public async list ({ auth }: HttpContextContract) {
    const user = auth.user;
    if (!user) return [];
    await user?.preload('payments');
    return user.payments;
  }
}
