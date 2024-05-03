import React from "react";

const Message = ({rootUrl, authUser, message, csrfToken}) => {

    const ownMessage = () => {
        return (authUser.id === message.user.id);
    };

    const deleteMessageRequest = async (e, message) => {
        try {
            await axios.post(`${rootUrl}/messages/${message.id}`, {
                _token: csrfToken,
                _method: 'delete'
            });
        } catch (error) {
            console.log(error.message);
        }
    };

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
            <div className="col-md-6">
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
                                        deleteMessageRequest(e, message);
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
