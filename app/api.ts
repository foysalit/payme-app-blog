const API_URL = 'http://192.168.1.205:3333';

export const postDataToApi = async ({endpoint = '', data = {}, headers = {}}) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(data)
    });
    return response.json();
};

export const getDataFromApi = async ({endpoint = '', headers = {}}) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
    });

    return response.json();
};