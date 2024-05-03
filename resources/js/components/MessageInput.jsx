import React, {useState} from "react";
import BroadcastEvent from "./BroadcastEvent.jsx";

const MessageInput = ({rootUrl, csrfToken, chatObject}) => {

    const chat = chatObject.chat;
    const authUser = chatObject.user;
    const channel = chatObject.channels.chatChannel;
    const [message, setMessage] = useState("");

    const createMessageRequest = async (text) => {
        try {
            await axios.post(`${rootUrl}/messages`, {
                text,
                chat_id: chat.id,
                _token: csrfToken,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const createMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }
        createMessageRequest(message);
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
