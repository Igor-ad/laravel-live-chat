const broadcastEvent = function ({channel, event, data}) {
    window.Echo.join(channel)
        .whisper(event, data)
        .error((error) => {
            console.error(error);
        });
};

export default broadcastEvent;
