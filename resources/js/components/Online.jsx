import React from "react";
import Invite from "./Invite.jsx";

const Online = ({rootUrl, user, chatId}) => {

    return (
        <div className="container align-content-lg-end">
            <li>
                <div className="row">
                    <div className="col-md-4">
                        {user.name}
                    </div>
                    <div className="col-md-6">
                        ({user.email})
                    </div>
                    <div className="col mb-2">
                        <Invite rootUrl={rootUrl}
                                userId={user.id}
                                chatId={chatId}
                        />
                    </div>
                </div>
            </li>
        </div>
    );
};

export default Online;
