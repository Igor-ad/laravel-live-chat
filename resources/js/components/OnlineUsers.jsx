import React, {useEffect, useState} from "react";
import Online from "./Online.jsx";

const OnlineUsers = ({chatObject}) => {

    const channel = chatObject.channels.chatChannel;
    const systemChannel = chatObject.channels.systemChannel;
    const [statusBar, setStatusBar] = useState("");
    const [usersOnline, setUsersOnline] = useState([]);
    const [chatUsersCount, setChatUsersCount] = useState(1);

    const addUser = (user) => {
        setUsersOnline(prevState => [...prevState, user]);
    };

    const deleteUser = (user) => {
        setUsersOnline(prevState => [
            ...prevState.filter(value => value.id !== user.id)
        ]);
    };

    const updateStatusBar = (event, data) => {
        let text = customAction(event, data);
        setStatusBar(text);
        setTimeout(() => {
            setStatusBar(""); // erase status bar
        }, 5000);
    };

    const customAction = (action, data) => {
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
                return `: ${data.user.name} deleted message: "${data.text}".`;

            default:
                return `: ${data.name} is doing something.`;
        }
    };

    const connectSystemChannel = () => {
        window.Echo.join(systemChannel)
            .here((users) => {
                setUsersOnline(users);
            })
            .joining((user) => {
                addUser(user);
                updateStatusBar('joining', user);
            })
            .leaving((user) => {
                deleteUser(user);
                updateStatusBar('leaving', user);
            })
            .error((error) => {
                console.error(error);
            });
    };

    const connectPrivateChatChannel = () => {
        window.Echo.private(channel)
            .listen('.MessageDeleted', (e) => {
                updateStatusBar('delete', e.model);
            })
            .error((error) => {
                console.error(error);
            });
    };

    const connectChatChannel = () => {
        window.Echo.join(channel)
            .here((e) => {
                setChatUsersCount(e.length)
            })
            .joining((user) => {
                setChatUsersCount(prevState => ++prevState);
                updateStatusBar('chatJoining', user);
            })
            .leaving((user) => {
                setChatUsersCount(prevState => --prevState);
                updateStatusBar('chatLeaving', user);
            })
            .listenForWhisper('typing', (e) => {
                updateStatusBar('typing', e);
            })
            .listenForWhisper('erasing', (e) => {
                updateStatusBar('erasing', e);
            })
            .error((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        connectSystemChannel();
        connectPrivateChatChannel();
        connectChatChannel()
        return () => {
            window.Echo.leave(channel);
            window.Echo.leave(systemChannel);
        }
    }, []);

    return (
        <div className="accordion" id="usersOnline">
            <div className="accordion-item">
                <button className="accordion-button collapsed pb-2 pt-2 bg-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseUsers"
                        aria-expanded="false"
                        aria-controls="collapseUsers">
                    {chatUsersCount} Users in the chat {statusBar}
                </button>
                <div id="collapseUsers" className="accordion-collapse collapse show" data-bs-parent="#usersOnline">
                    <div className="accordion-body"
                         style={{height: "auto", overflowY: "auto"}}>
                        {
                            usersOnline?.map((user) => (
                                <Online key={user.id}
                                        user={user}
                                        chatObject={chatObject}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineUsers;
