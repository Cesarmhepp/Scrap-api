const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

export const formatDate = (date) => {
    return [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
    ].join('-');
}