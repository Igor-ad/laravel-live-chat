import React, {useEffect, useRef, useState} from "react";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";
import Online from "./Online.jsx";

const ChatBox = ({rootUrl}) => {
    const userData = document.getElementById('main')
        .getAttribute('data-user');
    const user = JSON.parse(userData);
    const chatData = document.getElementById('main')
        .getAttribute('data-chat');
    const chat = JSON.parse(chatData);
    const webSocketChannel = `App.Models.Chat.${chat.id}`;
    const [messages, setMessages] = useState([]);
    const [usersOnline, setUsers] = useState([]);
    const scroll = useRef();

    const scrollToBottom = () => {
        scroll.current.scrollIntoView({behavior: "smooth"});
    };

    const connectWebSocket = () => {
        window.Echo.private(webSocketChannel)
            .listen('GotMessage', async (e) => {
                await getMessages();
                await getUsersOnline();
            })
            .listen('GotInvite', async (e) => {
                await getMessages();
                await getUsersOnline();
            });
    }

    const getMessages = async () => {
        try {
            const m = await axios.get(`${rootUrl}/messages/${chat.id}`);
            setMessages(m.data);
            setTimeout(scrollToBottom, 0);
        } catch (err) {
            console.log(err.message);
        }
    };

    const getUsersOnline = async () => {
        try {
            const n = await axios.get(`${rootUrl}/users_online`);
            setUsers(n.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getMessages();
        getUsersOnline();
        connectWebSocket();

        return () => {
            window.Echo.leave(webSocketChannel);
        }
    }, []);

    return (
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-header">Users online</div>
                    <div className="card-body"
                         style={{height: "auto", overflowY: "auto"}}>
                        <ul>
                            {
                                usersOnline?.map((user) => (
                                    <Online rootUrl={rootUrl}
                                            key={user.id}
                                            user={user}
                                            chatId={chat.id}
                                    />
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Chat Box</div>
                    <div className="card-body"
                         style={{height: "400px", overflowY: "auto"}}>
                        {
                            messages?.map((message) => (
                                <Message key={message.id}
                                         rootUrl={rootUrl}
                                         userId={user.id}
                                         message={message}
                                />
                            ))
                        }
                        <span ref={scroll}></span>
                    </div>
                    <div className="card-footer">
                        <MessageInput rootUrl={rootUrl}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
