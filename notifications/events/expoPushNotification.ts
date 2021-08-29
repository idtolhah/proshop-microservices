import axios from 'axios';

const sendPushNotification = async (message: any) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
    }
    if (message.to === undefined) message.to = 'ExponentPushToken[iII1F3OljzM6anDe0oydYG]'
    console.log('message: ', message)
    await axios.post('https://exp.host/--/api/v2/push/send', message, config)
}

export default sendPushNotification