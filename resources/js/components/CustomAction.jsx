const customAction = ({action, data}) => {

    switch (action) {
        case 'leaving' :
            return `: ${data.name} left the system.`;
        case 'joining' :
            return `: ${data.name} has joined the system.`;
        case 'chatLeaving' :
            return `: ${data.name} left the chat.`;
        case 'chatJoining' :
            return `: ${data.name} has joined the chat.`;
        case 'typing' :
            return `: ${data.name} typing...`;
        case 'erasing' :
            return `: ${data.name} erases text.`;
        case 'delete' :
            return `: ${data.user.name} deleted message "${data.text}".`;
        case 'chatCreate' :
            return `: ${data.user.name} created ${data.status} chat "${data.name}".`;
        case 'chatDelete' :
            return `: ${data.user.name} deleted ${data.status} chat "${data.name}".`;

        default:
            return `: ${data.name} is doing something.`;
    }
};

export default customAction;
