// todo: sendRequest maybe
const SendRequest = async ({endPoint, data}) => {
    try {
        // todo: axios should be imported from the file with all needed configuration
        // not good idea to put it in global object
        await axios.post(endPoint, data);
    } catch (error) {
        console.log(error.message);
    }
};

export default SendRequest;
