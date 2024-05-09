import React from "react";
import SendRequest from "./SendRequest.jsx";

const Message = ({rootUrl, authUser, message, csrfToken}) => {

    const messagesEndPoint = `${rootUrl}/messages/`;

    const ownMessage = () => {
        return (authUser.id === message.user.id);
    };

    const deleteMessageRequest = (message) => {
        const deleteMessageEndpoint = messagesEndPoint + message.id;
        const data = {
            _token: csrfToken,
            _method: 'delete'
        };
        SendRequest(deleteMessageEndpoint, data);
    }

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
                    <div className="row">
                        <div className="col-md-10">
                            {message.text}
                        </div>
                        {ownMessage() ?
                            <div className="col-md-1">
                                <button onClick={
                                    (e) => {
                                        deleteMessageRequest(message);
                                    }
                                }
                                        className="btn btn-link btn-sm"
                                        type="button">
                                    <span className="badge text-bg-secondary align-content-lg-end">x</span>
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
