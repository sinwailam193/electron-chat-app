import moment from 'moment-timezone';

// convert Date object to time string
// eg. 6:41 AM
export function getTimeStr(date) {
    const timeStr = moment(date).format('hh:mm A').toString();

    for (let i = 0; i < timeStr.length; i++) {
        const curr = timeStr[i];
        if (curr !== '0') {
            return timeStr.slice(i);
        }
    }
    return timeStr;
}


// generate random id
export function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
