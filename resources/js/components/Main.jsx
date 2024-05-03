import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../css/app.css';
import ChatBox from "./ChatBox.jsx";
import InviteModal from "./InviteModal.jsx";

const csrfToken = document.getElementsByTagName('meta')
    .namedItem('csrf-token').getAttribute('content');
const root_Url = import.meta.env.VITE_APP_URL;

if (document.getElementById('invite')) {
    ReactDOM.createRoot(document.getElementById('invite')).render(
        <React.StrictMode>
            <InviteModal rootUrl={root_Url}
                         csrfToken={csrfToken}
            />
        </React.StrictMode>
    );
}

if (document.getElementById('main')) {
    ReactDOM.createRoot(document.getElementById('main')).render(
        <React.StrictMode>
            <ChatBox rootUrl={root_Url}
                     csrfToken={csrfToken}
            />
        </React.StrictMode>
    );
}
