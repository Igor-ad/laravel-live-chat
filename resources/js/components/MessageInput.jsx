import React, {useState} from "react";
import broadcastEvent from "./broadcastEvent.jsx";
import sendRequest from "./sendRequest.jsx";

const MessageInput = ({rootUrl, csrfToken, chatObject}) => {

    const messagesEndPoint = `${rootUrl}/messages`;
    const chat = chatObject.chat;
    const authUser = chatObject.user;
    const channel = chatObject.channels.chatChannel;
    const [message, setMessage] = useState("");

    const createMessageRequest = async () => {
        const data = {
            text: message,
            chat_id: chat.id,
            _token: csrfToken,
        };
        await sendRequest({
            endPoint: messagesEndPoint,
            data
        });
    };

    const createMessage = (e) => {
        // e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }
        createMessageRequest();
        setMessage("");
    };

    const inputHandler = (e) => {
        let text = e.target.value;
        setMessage(text);
        if (text.length % 5) return;
        if (text.length === 0) {
            return broadcastEvent({
                channel,
                event: 'erasing',
                data: authUser
            });
        }
        broadcastEvent({
            channel,
            event: 'typing',
            data: authUser
        });
    };

    return (
        <div className="input-group">
            <input onChange={(e) => inputHandler(e)}
                   autoComplete="off"
                   type="text"
                   className="form-control"
                   placeholder="Message..."
                   value={message}
            />
            <div className="input-group-append">
                <button onClick={(e) => createMessage(e)}
                        className="btn btn-link"
                        type="button">Send
                </button>
            </div>
        </div>
    );
};

export default MessageInput;
