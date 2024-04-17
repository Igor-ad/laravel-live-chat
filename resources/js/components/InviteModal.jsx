import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';

const InviteModal = ({rootUrl}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [inviteMessage, setInviteMessage] = useState("");
    const userData = document.getElementById('invite')
        .getAttribute('data-user');
    const user = JSON.parse(userData);
    const webSocketChannel = `App.Models.User.${user.id}`;

    const connectWebSocket = () => {
        window.Echo.private(webSocketChannel)
            .listen('GotInvite', async (e) => {
                const {text: messageText} = e.message;
                const {id: messageId} = e.message;
                const {chat_id: messageChatId} = e.message;
                const invitedChatUrl = <a className="link-primary"
                                          href={`${rootUrl}/chats/${messageChatId}`}>{`${messageText}`}</a>;
                setInviteMessage(invitedChatUrl);
                setModalIsOpen(!!messageId);
            });
    }

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        connectWebSocket();

        return () => {
            window.Echo.leave(webSocketChannel);
        }
    }, []);

    const modalContent = (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Invite to chat</div>
                        <div className="card-body">
                            <p>
                                {inviteMessage}
                            </p>
                        </div>
                        <div className="card-footer">
                            <button onClick={closeModal} type="button" className="btn btn-link">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            {modalContent}
        </Modal>
    );
};

export default InviteModal;
