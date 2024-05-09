import React, {useState} from "react";
import BroadcastEvent from "./BroadcastEvent.jsx";
import SendRequest from "./SendRequest.jsx";

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
        SendRequest(messagesEndPoint, data);
    };

    const createMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }
        createMessageRequest();
        setMessage("");
    };

    const typingText = (e) => {
        let text = e.target.value;
        setMessage(text);
        if (text.length % 5) return;
        if (text.length === 0) {
            return BroadcastEvent(e, channel, 'erasing', authUser);
        }
        BroadcastEvent(e, channel, 'typing', authUser);
    };

    return (
        <div className="input-group">
            <input onChange={(e) => typingText(e)}
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
