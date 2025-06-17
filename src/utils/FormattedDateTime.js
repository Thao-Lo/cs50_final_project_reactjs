import dayjs from "dayjs";

export const getFormattedTime = () => {
    //with seconds [14:43:34]
    const time = new Date().toISOString().split('T')[1].split('.')[0];
    //return with seconds is 00 
    //join(':') 14:43 + ':00' 
    return time.split(':').slice(0, 2).join(':') + ':00';
}

export const getNext30Days = () => {
    const dates = [];
    //Tue Dec 24 2024 02:33:29 GMT+1100 (Australian Eastern Daylight Time)
    const today = new Date();
    for (let i = 0; i < 30; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        //2024-12-24
        dates.push(nextDate.toISOString().split('T')[0])
    }
    return dates;
}
export const formatCountdownTime = (TTL) => {
    const minutes = Math.floor(TTL / 60);
    const seconds = TTL % 60;
    const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formatSeconds}`
}

export const calculateDateAndTime = (date, time) => {
    const rowDate = dayjs(date).valueOf();
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const rowTime = (hours * 3600 + minutes * 60) * 1000;
    return rowDate + rowTime;
}

//2025-6-17 -> Tuesday, June 17
export const formatDateDisplay = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',  //short: Tue vs Tuesday
        month: 'long', // short: Jun, numeric: 06
        day: 'numeric' 
    }).format(date);
}