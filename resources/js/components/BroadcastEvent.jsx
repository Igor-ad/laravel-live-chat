import React from "react";

const BroadcastEvent = function (e, channel, eventName, data) {
    window.Echo.join(channel)
        .whisper(eventName, data)
        .error((error) => {
            console.error(error);
        });
};

export default BroadcastEvent;
