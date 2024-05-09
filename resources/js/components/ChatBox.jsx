import React, {useEffect, useRef, useState} from "react";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";
import OnlineUsers from "./OnlineUsers.jsx";

const ChatBox = ({rootUrl, csrfToken}) => {

    const chatData = document.getElementById('main')
        .getAttribute('data-chat');
    const chatObject = JSON.parse(chatData);
    const chat = chatObject.chat;
    const messagesEndPoint = `${rootUrl}/messages/${chat.id}`;
    const authUser = chatObject.user;
    const chatChannel = chatObject.channels.chatChannel;
    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    const scrollToBottom = () => {
        scroll.current.scrollIntoView({behavior: "smooth"});
    };

    /**
     *  This is a patch because the dontBroadcastToCurrentUser() method
     * in the App\Models\Invite.php model does not always eliminate duplicate messages
     *  when sending an invitation POST request and going to the chat page.
     */
    const dontBroadcastToCurrentUser = (e) => {
        if (e.model.user_id !== authUser.id) {
            setMessages(prevState => [...prevState, e.model]);
            setTimeout(scrollToBottom, 0);
        }
    }

    const connectPrivateChatChannel = () => {
        window.Echo.private(chatChannel)
            .listen('.MessageCreated', (e) => {
                setMessages(prevState => [...prevState, e.model]);
                setTimeout(scrollToBottom, 0);
            })
            .listen('.InviteCreated', (e) => {
                dontBroadcastToCurrentUser(e);
            })
            .listen('.MessageDeleted', (e) => {
                setMessages(prevState => [
                    ...prevState.filter(value => value.id !== e.model.id)
                ]);
            })
            .error((error) => {
                console.error(error);
            });
    };

    const getMessages = async () => {
        try {
            const n = await axios.get(messagesEndPoint);
            const messageCollection = n.data;
            setMessages(messageCollection.data);
            setTimeout(scrollToBottom, 0);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getMessages();
        connectPrivateChatChannel();

        return () => {
            window.Echo.leave(chatChannel);
        }
    }, []);

    return (
        <div className="row justify-content-center">
            <div className="col-md-10">
                <OnlineUsers
                    chatObject={chatObject}
                />

                <div className="card">
                    <div className="card-header">Chat Box: {chat.name}</div>
                    <div className="card-body"
                         style={{height: "400px", overflowY: "auto"}}>
                        {
                            messages?.map((message) => (
                                <Message key={message.id}
                                         rootUrl={rootUrl}
                                         authUser={authUser}
                                         message={message}
                                         csrfToken={csrfToken}
                                />
                            ))
                        }
                        <span ref={scroll}></span>
                    </div>
                    <div className="card-footer">
                        <MessageInput rootUrl={rootUrl}
                                      csrfToken={csrfToken}
                                      chatObject={chatObject}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
