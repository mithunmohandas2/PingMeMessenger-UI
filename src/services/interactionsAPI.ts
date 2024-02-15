import axios from 'axios';
const baseUrlAPI = import.meta.env.VITE_APP_BASE_URL_API

// -----------------------------------------------------------

const SignupAPI = async (name: string, email: string, password: string) => {
    try {
        const url = baseUrlAPI + '/user/register';    //Signup API endpoint
        const data = { email, name, password }

        const response = await axios.post(url, data)
        if (response.data) {
            // console.log('Response:', response);      // all the user data received
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

// -----------------------------------------------------------

const LoginAPI = async (email: string, password: string) => {
    try {
        const url = baseUrlAPI + '/user/login';    // Verify Login API endpoint
        const data = { email, password };

        const response = await axios.post(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

// -----------------------------------------------------------

const initiateServerAPI = async () => {
    try {
        const url = baseUrlAPI;
        const response = await axios.get(url)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

// -----------------------------------------------------------

const getChatsAPI = async () => {
    try {
        const url = baseUrlAPI + '/chat/';
        const response = await axios.get(url)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

// -----------------------------------------------------------

const getMessagesAPI = async (chatId: string) => {
    try {
        const url = baseUrlAPI + `/message/${chatId}`;
        const response = await axios.get(url)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

// -----------------------------------------------------------

const sendMessageAPI = async (chatId: string, content: string) => {
    try {
        const url = baseUrlAPI + `/message`;
        const data = { chatId, content }
        const response = await axios.post(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}


export {
    SignupAPI,
    LoginAPI,
    initiateServerAPI,
    getChatsAPI,
    getMessagesAPI,
    sendMessageAPI,
}