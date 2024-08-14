export const generateTransactionId = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 100000);
    return `${timestamp}-${randomNumber}`;
}