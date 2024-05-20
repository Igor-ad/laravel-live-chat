const sendRequest = async ({endPoint, data}) => {

    let response;

    try {
        response = await axios.post(endPoint, data);
        console.log(response.data.message);
    } catch (error) {
        console.log(error.message);
    }

    return (response);
};

export default sendRequest;
