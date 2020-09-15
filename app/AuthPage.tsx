import { Layout, Card, Button, Input, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import { Auth } from "./auth";

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
      alignSelf: 'stretch',
    },
    formInput: {
        marginTop: 16,
    },
    footer: {
        marginTop: 10,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statusContainer: {
        alignSelf: 'center',
    },
    actionsContainer: {
        flexDirection: 'row-reverse',
    },
    button: {
        marginLeft: 10,
    }
});

type AuthPageProps = {
    auth: Auth,
    isLoggingIn: boolean,
    setIsLoggedIn: (isLoggedIn: boolean) => any,
    setIsLoggingIn: (isLoggedIn: boolean) => any,
};

export const AuthPage = ({ auth, isLoggingIn, setIsLoggedIn, setIsLoggingIn }: AuthPageProps) => {
    const [password, setPassword] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [errors, setErrors] = useState<string[]>([]);

    const handlePrimaryButtonPress = async (action = 'signup') => {
        setIsLoggingIn(true);
        // when signing up, we want to use the signup method from auth class, otherwise, use the login method
        try {
            const { success, errors } = await auth.request(action, {email, password});
            setIsLoggedIn(success);
            setErrors(errors);
        } catch (err) {
            console.log(err);
        }

        setIsLoggingIn(false);
    };

    return (
        <Layout style={styles.page}>
            <Card style={styles.card} status='primary'>
                <Input
                    style={styles.formInput}
                    label='EMAIL'
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    style={styles.formInput}
                    label='PASSWORD'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                {errors.length > 0 && errors.map(message =>
                    <Text key={`auth_error_${message}`} status='danger'>{message}</Text>
                )}
            </Card>
            <View style={styles.footer}>
                <View style={styles.statusContainer}>
                    <Text>{isLoggingIn ? 'Authenticating...' : ''}</Text>
                </View>
                <View style={styles.actionsContainer}>
                    <Button
                        size="small"
                        style={styles.button}
                        disabled={isLoggingIn}
                        onPress={() => handlePrimaryButtonPress('signup')}>
                        Sign Up
                    </Button>
                    <Button
                        size="small"
                        status="info"
                        appearance="outline"
                        disabled={isLoggingIn}
                        onPress={() => handlePrimaryButtonPress('login')}>
                        Log In
                    </Button>
                </View>
            </View>
        </Layout>
    );
}