import React from "react";
import SendRequest from "./SendRequest.jsx";

const Message = ({rootUrl, authUser, message, csrfToken}) => {

    const messagesEndPoint = `${rootUrl}/messages/`;

    // todo: maybe isOwnMessage or
    // const isOwnMessage = authUser.id === message.user.id;
    const ownMessage = () => {
        return (authUser.id === message.user.id);
    };

    const deleteMessageRequest = async (message) => {
        const deleteMessageEndpoint = messagesEndPoint + message.id;
        const data = {
            _token: csrfToken,
            _method: 'delete'
        };

        // todo: sendRequest maybe
        await SendRequest({
            endPoint: deleteMessageEndpoint,
            data
        });
    }

    // todo: method/function's name should represent the action, kinda getAlertType
    const alert = () => {
        switch (true) {
            case authUser.id === message.user_id :
                return 'primary';
            case message.is_invite === 1 :
                return 'info';

            default:
                return 'secondary';
        }
    };

    return (
        <div className={`row ${ownMessage() ? "justify-content-end" : ""}`}>
            <div className="col-md-6" id={message.id}>
                <small className="text-muted">
                    <strong>{message.user.name} </strong>
                </small>
                <small className="text-muted float-right">
                    {message.time}
                </small>
                <div className={
                    `alert alert-${alert()}`
                } role="alert">
                    <div className="row justify-content-between">
                        <div className="col">
                            {message.text}
                        </div>
                        {ownMessage() ?
                            <div className="col-2">
                                <button onClick={
                                    (e) => {
                                        deleteMessageRequest(message);
                                    }
                                }
                                        className="btn-link"
                                        type="button">
                                    <span className="badge text-bg-secondary">x</span>
                                </button>
                            </div>
                            : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
