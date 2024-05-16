import React, {useEffect} from 'react';
import sendRequest from "./sendRequest.jsx";

const InviteModal = ({rootUrl, csrfToken}) => {

    const invitesEndPoint = `${rootUrl}/invites`;
    const chatsEndPoint = `${rootUrl}/chats/`;

    const connectSystemChannel = (system) => {
        window.Echo.join(system.systemChannel)
            .listenForWhisper('invite', (e) => {
                axios.defaults.headers.common['X-Socket-Id'] = Echo.socketId();
                getInvite(e, system);
            })
            .error((error) => {
                console.error(error);
            });
    };

    const getInvite = (e, system) => {
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
        const data = {
            user_id: e.id,
            chat_id: e.chat.id,
            _token: csrfToken,
        };
        await sendRequest({
            endPoint: invitesEndPoint,
            data
        });
    };

    const toChat = (e) => {
        setTimeout(() =>
                window.location.href = chatsEndPoint + e.chat.id
            , 100);
    };

    useEffect(() => {
        const systemData = document.getElementById('invite')
            .getAttribute('data-system');
        const system = JSON.parse(systemData);
        connectSystemChannel(system);

        return () => {
            window.Echo.leave(system.systemChannel);
        }
    }, []);
};

export default InviteModal;
