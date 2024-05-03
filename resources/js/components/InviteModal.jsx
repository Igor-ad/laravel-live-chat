import React, {useEffect} from 'react';

const InviteModal = ({rootUrl, csrfToken}) => {

    const systemData = document.getElementById('invite')
        .getAttribute('data-system');
    const system = JSON.parse(systemData);

    const connectSystemChannel = () => {
        window.Echo.join(system.systemChannel)
            .listenForWhisper('invite', (e) => {
                axios.defaults.headers.common['X-Socket-Id'] = Echo.socketId();
                getInvite(e);
            })
            .error((error) => {
                console.error(error);
            });
    };

    const getInvite = (e) => {
        if (e.id === system.authUserId) {
            let proposalText =
                `You are invited by the ${e.from.name} to the chat: "${e.chat.name}"`;
            const answer = confirm(proposalText);
            if (answer) {
                createInviteRequest(e);
                toChat(e);
            }
        }
    };

    const createInviteRequest = async (e) => {
        try {
            await axios.post(`${rootUrl}/invites`, {
                user_id: e.id,
                chat_id: e.chat.id,
                _token: csrfToken,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const toChat = (e) => {
        setTimeout(() =>
                window.location.href = `${rootUrl}/chats/${e.chat.id}`
            , 100);
    };

    useEffect(() => {
        connectSystemChannel();

        return () => {
            window.Echo.leave(system.systemChannel);
        }
    }, []);
};

export default InviteModal;
