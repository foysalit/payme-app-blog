import {Layout, Icon, Button} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import React, {useEffect, useState} from "react";
import { Payment } from "./payment";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: 2
    }
});

const products = [{
    status: 'primary',
    text: 'Buy Video',
    product: 'video',
    icon: 'film',
    price: 50,
}, {
    price: 30,
    status: 'info',
    product: 'audio',
    text: 'Buy Audio',
    icon: 'headphones',
}];

type ProductPageProps = {
    payment: Payment,
};

export const ProductPage = ({ payment }: ProductPageProps) => {
    const [paymentReady, setPaymentReady] = useState(false);

    // Initialize the payment module, on android, this MUST be inside the useEffect hook
    // on iOS, the initialization can happen anywhere
    useEffect(() => {
        payment.init().then(() => {
            setPaymentReady(true);
        });
    });

    const handlePayment = async (price: number, product: string) => {
        const paymentComplete = await payment.request(price, product);
    }

    return (
        <Layout style={styles.container}>
            {products.map(({product, status, icon, text, price}) => (
                <Button
                    status={status}
                    style={styles.button}
                    disabled={!paymentReady}
                    onPress={() => handlePayment(price, product)}
                    key={`${status}_${icon}_${text}`}
                    accessoryLeft={props => <Icon {...props} name={icon}/>}>
                    {`${text} $${price}`}
                </Button>
            ))}
        </Layout>
    );
};