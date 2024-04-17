import React, {useState} from "react";

const MessageInput = ({rootUrl}) => {
    const [message, setMessage] = useState("");
    const chatData = document.getElementById('main')
        .getAttribute('data-chat');
    const csrfToken = document.getElementsByTagName('meta')
        .namedItem('csrf-token').getAttribute('content');
    const chat = JSON.parse(chatData);
    const chatId = chat.id;

    const messageRequest = async (text) => {
        try {
            await axios.post(`${rootUrl}/message`, {
                text, chat_id: chatId, _token: csrfToken,
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }

        messageRequest(message);
        setMessage("");
    };

    return (
        <div className="input-group">
            <input onChange={(e) => setMessage(e.target.value)}
                   autoComplete="off"
                   type="text"
                   className="form-control"
                   placeholder="Message..."
                   value={message}
            />
            <div className="input-group-append">
                <button onClick={(e) => sendMessage(e)}
                        className="btn btn-link"
                        type="button">Send
                </button>
            </div>
        </div>
    );
};

export default MessageInput;
