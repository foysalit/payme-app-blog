import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import {Auth} from "./auth";
import {getDataFromApi, postDataToApi} from "./api";

type PaymentData = {
    id: number,
    price: number,
    product: string,
};

export class Payment {
    auth: Auth;
    history: PaymentData[] = [];

    constructor(auth: Auth) {
        this.auth = auth;
    }

    async init() {
        await Stripe.setOptionsAsync({
            androidPayMode: 'test',
            publishableKey: 'pk_test_<rest_or_ur_key>',
        });
        await this.getHistory();
        return true;
    }

    async getHistory() {
        const response = await getDataFromApi({endpoint: 'payment', headers: await this.auth.getApiHeader()});
        if (response.errors) {
            this.history = [];
            return false;
        }

        if (response.length > 0) {
            this.history = response;
            return true;
        }
    }

    async request(price: number, product: string) {
        try {
            const { tokenId } = await Stripe.paymentRequestWithCardFormAsync();
            const payment: PaymentData = await postDataToApi({
                endpoint: 'payment',
                data: {price, token: tokenId, product},
                headers: await this.auth.getApiHeader()
            });

            if (payment.id)
                this.history.push(payment);

            return payment;
        } catch(err) {
            console.log(err);
            return null;
        }
    }
}