// todo: capital letter is not necessary here, because this is not a class or component, it's a function
// use broadcastEvent
const BroadcastEvent = function ({channel, event, data}) {
    window.Echo.join(channel)
        .whisper(event, data)
        .error((error) => {
            console.error(error);
        });
};

export default BroadcastEvent;
