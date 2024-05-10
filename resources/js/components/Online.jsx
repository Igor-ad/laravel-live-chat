import React from "react";
import BroadcastEvent from "./BroadcastEvent.jsx";

const Online = ({user, chatObject}) => {

    const chat = chatObject.chat;
    const authUser = chatObject.user;
    const systemChannel = chatObject.channels.systemChannel;
    const eventData = {
        id: user.id,
        name: user.name,
        email: user.email,
        chat: chat,
        from: authUser
    };

    /**
     *  Block sending invite to yourself
     */
    const dontInviteYourself = () => {
        if (user.id !== authUser.id) {
            return (
                <div className="col-md-2">
                    <div className="input-group-append">
                        <button onClick={
                            (e) => {
                                BroadcastEvent({
                                    channel: systemChannel,
                                    event: 'invite',
                                    data: eventData
                                });
                            }
                        }
                                className="btn btn-link btn-sm"
                                type="button">Invite
                        </button>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="container align-content-lg-end">
            <div className="row">
                <div className="col-md-2">
                    {user.name}
                </div>
                <div className="col-md-6">
                    ({user.email})
                </div>
                {dontInviteYourself()}
            </div>
        </div>
    );
};

export default Online;
