import React from "react";

const BroadcastEvent = function ({channel, event, data}) {
    window.Echo.join(channel)
        .whisper(event, data)
        .error((error) => {
            console.error(error);
        });
};

export default BroadcastEvent;
