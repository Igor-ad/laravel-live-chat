import React from "react";

const Message = ({rootUrl, userId, message}) => {
    const alert = () => {
        switch (true) {
            case userId === message.user_id :
                return "primary";
            case message.is_invite === 1 :
                return "info";

            default:
                return "secondary";
        }
    }

    const chatId = message.chat_id;
    const invitedChatUrl = <a className="alert-link-opacity-25-hover"
                              href={`${rootUrl}/chats/${chatId}`}>{`${message.text}`}</a>;
    console.log(invitedChatUrl);

    const textUrl = (message) => {
        switch (true) {
            case message.is_invite === 1 :
                return invitedChatUrl;

            default:
                return message.text;
        }

    }

    return (
        <div className={`row ${
            userId === message.user_id ? "justify-content-end" : ""
        }`}>
            <div className="col-md-6">
                <small className="text-muted">
                    <strong>{message.user.name}  </strong>
                </small>
                <small className="text-muted float-right">
                    {message.time}
                </small>
                <div className={`alert alert-${
                    alert()
                }`} role="alert">
                    {textUrl(message)}
                </div>
            </div>
        </div>
    );
};

export default Message;
