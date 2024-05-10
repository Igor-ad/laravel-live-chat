import React, {useEffect, useState} from "react";
import Online from "./Online.jsx";
import CustomAction from "./CustomAction.jsx";

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

    const updateStatusBar = (action, data) => {
        let text = CustomAction({action, data});
        setStatusBar(text);
        console.log(text);
        setTimeout(() => {
            setStatusBar(""); // erase status bar after timeout
        }, 10000);
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

    const connectPrivateSystemChannel = () => {
        window.Echo.private(systemChannel)
            .listen('.ChatCreated', (e) => {
                const chatCreateSB = () => (updateStatusBar('chatCreate', e.model));
                setTimeout(chatCreateSB, 2000);
            })
            .listen('.ChatDeleted', (e) => {
                updateStatusBar('chatDelete', e.model);
            })
            .error((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        connectSystemChannel();
        connectPrivateChatChannel();
        connectChatChannel()
        connectPrivateSystemChannel();
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
                    {chatUsersCount} User{chatUsersCount - 1 ? 's' : ''} in the chat {statusBar}
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
