import axios from 'axios';

const sendPushNotification = async (message: any) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
    }
    await axios.post('https://exp.host/--/api/v2/push/send', message, config);
}

export default sendPushNotification