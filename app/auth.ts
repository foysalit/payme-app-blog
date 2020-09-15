import AsyncStorage from '@react-native-community/async-storage';
import { postDataToApi } from "./api";

interface AuthData {
    email: string | undefined;
    password: string | undefined;
}

export class Auth {
    tokenKey: string = '@authKey';

    async request(endpoint = 'login', data: AuthData) {
        const { token, errors } = await postDataToApi({ endpoint, data });
        if (token) {
            await AsyncStorage.setItem(this.tokenKey, token);
            return { success: true, errors: [] };
        }

        const errorMapper: (params: { message: string }) => string = ({ message }) => message;
        return { success: false, errors: errors.map(errorMapper) };
    }

    async getToken() {
        return AsyncStorage.getItem(this.tokenKey);
    }

    async getApiHeader() {
        const token = await this.getToken();
        return { 'Authorization': `Bearer ${token}` };
    }
}