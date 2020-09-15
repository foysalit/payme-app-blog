import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthPage } from "./AuthPage";
import { ProductPage } from "./ProductPage";
import { Auth } from "./auth";
import { Payment } from "./payment";

const auth = new Auth();
const payment = new Payment(auth);
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(true);

    useEffect(() => {
        auth.getToken().then((token) => {
            setIsLoggingIn(false);
            if (!!token) setIsLoggedIn(true);
        });
    });

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
                <StatusBar style="auto" />
                { isLoggedIn
                    ? <ProductPage {...{payment}} />
                    : <AuthPage {...{auth, setIsLoggedIn, setIsLoggingIn, isLoggingIn}} />
                }
            </ApplicationProvider>
        </>
    );
}