const sendRequest = async ({endPoint, data}) => {
    try {
        await axios.post(endPoint, data);
    } catch (error) {
        console.log(error.message);
    }
};

export default sendRequest;
