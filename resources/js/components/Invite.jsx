import React from "react";

const Invite = ({rootUrl, userId, chatId}) => {
    const invitedUserId = userId;
    const invitedChatId = chatId;

    const inviteRequest = async (invitedUserId, invitedChatId) => {
        try {
            await axios.post(`${rootUrl}/invite`, {
                invitedUserId, invitedChatId
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    const sendInvite = (e) => {
        e.preventDefault();

        inviteRequest(invitedUserId, invitedChatId);
    };

    return (
        <div className="input-group">
            <div className="input-group-append">
                <button onClick={(e) => sendInvite(e)}
                        className="btn btn-link btn-sm"
                        type="button">Invite
                </button>
            </div>
        </div>
    );
};

export default Invite;
